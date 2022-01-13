const admin = require("firebase-admin");

const serviceAccount = require("./config/proyecto-final-coderhous-6c381-firebase-adminsdk-ikuxv-636b362590.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = {db}