const cron = require('node-cron');
const scrapingController = require('../controllers/scrappingController');

const scheduleTimer = '*/1 * * * *'; // Every 5 minutes
//const scheduleTimer = '10 20 * * *';

const scrapeScript = () => {
  console.log('Schedule timer: ', scheduleTimer);
  cron.schedule(scheduleTimer, () => {
    console.log('Running scraping script...');
    scrapingController.scrapeAndSaveData();
  });
};

module.exports = scrapeScript;
