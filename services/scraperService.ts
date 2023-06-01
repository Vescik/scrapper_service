const puppeteer = require('puppeteer');
const url = "https://mcdonalds.pl/nasze-menu/"

interface Product {
    name: string;
    image: string;
    price: number;
    type: string;
    size: string;
}

const openWebPage = async (url:string) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);    
    return page;
}



const scrapData = async ()=> {
    const page = await openWebPage(url);
    
    const products = await page.$$eval('.product_thumb-text', (elements) =>{
        return elements.map((el) => el.textContent.trim())
    })
    
    const productsImg = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('div.product_thumb > a > img'));
        return images.map((img:any) => img.src);
      });

      return{ products, productsImg}
    }

const pushToMenu = async () => {
    const menu:Product[] = [];
    const {products, productsImg} = await scrapData();
    products.forEach((productText:string, index) => {
        const product:Product = {
            name: productText,
            image: productsImg[index],
            price: 0,
            type: "",
            size: ""
        }
        menu.push(product)
    })  
}
module.exports = pushToMenu
