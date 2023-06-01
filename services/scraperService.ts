const puppeteer = require('puppeteer');
const url = "https://mcdonalds.pl/nasze-menu/"

const openWebPage = async (url:string) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);    
    return page;
}


const scrapProducts = async ()=> {
    const page = await openWebPage(url);
    
    const productTexts = await page.$$eval('.product_thumb-text', (elements) =>{
        return elements.map((el) => el.textContent.trim())
    })
    
    const imageUrls = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('div.product_thumb > a > img'));
        return images.map((img:any) => img.src);
      });

      return{ productTexts, imageUrls}
}


module.exports = scrapProducts