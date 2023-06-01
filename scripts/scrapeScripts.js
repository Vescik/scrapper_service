const cron = require('node-cron');
const scrapingController = require('../app/controllers/scrapingController');

// Run the scraping and saving script once per day at 12:00 PM
cron.schedule('0 12 * * *', () => {
  console.log('Running scraping script...');
  scrapingController.scrapeAndSaveData();
});