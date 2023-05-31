const puppeteer = require('puppeteer');
const prompt = require("prompt-sync")({ sigint: true });

const admin = require('firebase-admin');
const serviceAccount = require('./scrapper-service-firebase-adminsdk-lsswa-450670c580.json');
let reads = 0;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const projectFirestore = db.collection('products');
const timestamp = admin.firestore.FieldValue.serverTimestamp();

async function scrapeTextsAndImages() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://mcdonalds.pl/nasze-menu/');

  const productTexts = await page.$$eval('.product_thumb-text', (elements) =>
    elements.map((element) => element.textContent.trim())
  );

  const imageUrls = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('div.product_thumb > a > img'));
    return images.map((img) => img.src);
  });

  console.log(productTexts.length);
  await browser.close();

  return { productTexts, imageUrls };
}

async function addProductToFirestore(product) {
  const querySnapshot = await projectFirestore.where('name', '==', product.name).get();
  reads++;
  querySnapshot
  console.log(`Reads: ${reads}`);

  // if (!querySnapshot.empty) {
  //   await projectFirestore.add(product);
  //   console.log(`Added ${product.name} to the database.`);
  // } else {
  //   console.log(`Product ${product.name} already exists.`);
  // }
}

async function scrapeMenu() {
  const { productTexts, imageUrls } = await scrapeTextsAndImages();

  const menu = productTexts.map((productText, idx) => ({
    name: productText,
    price: 123,
    size: null,
    type: null,
    timestamp,
    img: imageUrls[idx]
  }));

  for (const product of menu) {
    await addProductToFirestore(product);
  }
}

const action = prompt("What do you want to do? (1. Scrape(Type: scrape), 2. Update firestore(Type: update)  3.Exit(Type: exit) ");
switch (action) {
  case "scrape":
    scrapeTextsAndImages();
    break;
  case "update":
    scrapeMenu();
    break;
  case "exit":
    break;
  default:
    console.log("Invalid action");
    break;
}