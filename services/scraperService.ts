const puppeteer = require('puppeteer');
const Product = require('../models/scrapedDataModel');



const url = "https://mcdonalds.pl/nasze-menu/"

interface singleProduct {
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
      page.close();
      return{ products, productsImg}
    }

const setProducts = async () => {    
    const menu:singleProduct[] = [];
    const {products, productsImg} = await scrapData();

    products.forEach(async (productText:string, index) => {

        const product:singleProduct = new Product( {
            name: productText,
            image: productsImg[index],
            price: 0,
            type: "",
            size: ""
        })
        try {
            menu.push(product)
        } catch (error) {
            console.log(error)
        }  
    }) 
    return menu;
}
module.exports = {setProducts}
