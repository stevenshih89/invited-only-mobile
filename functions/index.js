/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const functions = require('firebase-functions/v2');
const admin = require('firebase-admin');

// Инициализируйте приложение Firebase
const firebaseConfig = {
  // Ваши настройки конфигурации Firebase здесь
};

admin.initializeApp(firebaseConfig);

exports.processDocumentCreated = functions.firestore.onDocumentCreated('CollectionOfMatches', async event => {
  const newData = event.params; // Данные нового документа
  const uid = newData.uid; // Получение UID пользователя из нового документа

  // logger.info(`${newData}: ${uid}`, {structuredData: true});

  try {
    // Поиск пользователя по UID
    const userQuerySnapshot = await admin.firestore().collection('users').where('uid', '==', uid).get();

    if (userQuerySnapshot.empty) {
      console.log('Пользователь с UID', uid, 'не найден');
      return null;
    }

    // Пользователь найден
    userQuerySnapshot.forEach(async userDoc => {
      // Получение ID пользователя
      const userId = userDoc.id;

      // Отправка уведомления пользователю
      await sendNotification(userId);

      console.log('Уведомление отправлено пользователю с ID', userId);
    });

    return null;
  } catch (error) {
    console.error('Ошибка при поиске пользователя:', error);
    return null;
  }
});

const sendNotification = async userId => {
  await admin.messaging().send({
    token: userId, // Токен устройства получателя
    notification: {
      title: 'New message',
      body: 'Description',
    },
  });
};

exports.processCollectionOfMatches = functions.firestore.onDocumentCreated('CollectionOfMatches', async event => {
  const {notificationTokenSender, name, girlsPhoto, recipientUid, senderUid} = event.data;

  await admin.messaging().send({
    token: notificationTokenSender,
    notification: {
      type: 'match',
      name,
      imageUri: girlsPhoto,
      senderUid,
      recipientUid,
    },
  });
});
