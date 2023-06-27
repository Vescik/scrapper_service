const express = require('express');
const scrapeScript = require('./scripts/scrapeScript');

const app = express();

// Connect to the MongoDB database

// Start the scraping script
scrapeScript();

// Additional app configurations and routes can be added here

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
