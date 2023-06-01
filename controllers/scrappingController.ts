// scrapingController.js
const scraperService = require('../services/scraperService');

const scrapingController = {
  async scrapeAndSaveData(req, res) {
    try {
      const scrappedData = await scraperService.setProducts();
      // TODO: Save the scrappedData to MongoDB using the appropriate model

     // res.status(200).json({ message: 'Scraped data saved to database' });
    } catch (error) {
      console.error('Error occurred while scraping and saving data:', error);
    //  res.status(500).json({ error: 'Internal server error' });
    }
  }, 
};

module.exports = scrapingController;
