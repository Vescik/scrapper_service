var admin = require("firebase-admin");

var serviceAccount = require("./scrapper-service-firebase-adminsdk-lsswa-450670c580.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});