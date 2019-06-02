'use strict';

const admin = require('firebase-admin');

const serviceAccount = require('./vendors/credentials/recipes-ea165-firebase-adminsdk-s1yqp-4628b3f47b.json');

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://recipes-ea165.firebaseio.com/"
});

console.log("Start firebase database connection");
console.log("databaseURL: https://recipes-ea165.firebaseio.com/");
module.exports = firebase;
