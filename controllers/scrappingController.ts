const scraperService = require('../services/scraperService');

const scrapingController = {
    async saveScrapData(req,res){
        try{
            const scrappedData = await scraperService.setProducts();

            res.status(200).json({message: "Scraped data saved to database"})
        }catch{
            console.error('Error occurred while scraping and saving data:');
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}