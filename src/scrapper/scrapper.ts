const puppeteer = require('puppeteer');
const prompt = require("prompt-sync")({ sigint: true });

const openWebPage = async (url:string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

const scrapWebPage = async (url:string) => {
    const webUrl = prompt("Enter a URL:  \n");
    const page = await openWebPage(webUrl);
    const result = await page.evaluate(() => {
        const title:string = document.querySelector('h1').innerText;
        const description:string = document.querySelector('p').innerText;
        console.log(title, description);
        
        return {
            title,
            description
        }
    });
    return result;
}



console.log('Scrapper started...');

scrapWebPage('https://www.google.com').catch(console.error);

