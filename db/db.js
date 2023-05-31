const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'scrapper';

mongoClient.connect(url, {}, (err, client) => {
    if (err) {
        console.error(err);
        return;
    }

   console.log('Connected successfully to server') 
});