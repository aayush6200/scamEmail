// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

const http = require("http");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
// const functions = require("firebase-functions");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const api = require("./routes/api.js");
const server = http.createServer(app);
const PORT = 1500;
console.log("helloworld server");
app.use("/user/api", api);

// exports.app = functions.https.onRequest(app);
server.listen(1500, '0.0.0.0', () => {
  console.log('Server listening on port 1500 btw');
});

// exports.app = functions.https.onRequest(app);
