/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.onPhotoUpload = functions.storage.object().onFinalize(async (object) => {
  // La función se activará cuando alguien suba una foto a Firebase Storage.
  // Puedes realizar acciones aquí, como obtener la URL de la imagen, procesarla, guardar información en Firestore, enviar notificaciones, etc.
  const filePath = object.name; // Ruta de la imagen en Firebase Storage
  const downloadURL = object.mediaLink; // URL de descarga de la imagen

  // Tu lógica de procesamiento aquí
  console.log('Se subió una nueva foto:', filePath, downloadURL);
});
