// scrapingController.js
const scraperService = require('../services/scraperService');
const  { collection, addDoc } = require('firebase/firestore');
import { db } from '../config/config'

const scrapingController = {
  async scrapeAndSaveData(req, res) {
    try {
      const scrappedData = await scraperService.setProducts();
      scrappedData.forEach(async (product) => {

        const productData = {
          name: product.name,
          image: product.image,
          price: product.price,
          type: product.type,
          size: product.size,
        };

        const docRef = await addDoc(collection(db, "products"), productData);
        console.log("Document written with ID: ", docRef.id);
      });
      
    } catch (error) {
      console.error('Error occurred while scraping and saving data:', error);
    }
  }, 
};

module.exports = scrapingController;
