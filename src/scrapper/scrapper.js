const puppeteer = require('puppeteer');
const prompt = require("prompt-sync")({ sigint: true });

const openWebPage = async () => {
    const webUrl = prompt("Enter a URL:  \n");
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(webUrl);
    return page;
}

const scrapWebPage = async (url) => {
    const page = await openWebPage();
    const result = await page.evaluate(() => {
    const title = await page.$$eval('h1', (elements) => elements.map((element) => element.textContent.trim()));
        console.log(title);
        
        return {
            title,
            description
        }
    });
    return result;
}



console.log('Scrapper started...');

scrapWebPage('https://www.google.com').catch(console.error);

