const functions = require('firebase-functions/v2');
const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: 'AIzaSyB4lUbkFiqrOGLsfjcvUFmVdmdI21p1J6w',
  projectId: 'invited-only-app',
  authDomain: 'invited-only-app.firebaseapp.com',
  storageBucket: 'invited-only-app.appspot.com',
  messagingSenderId: '996985328099',
  appId: '1:996985328099:ios:403f74a76adfe7897490d6',
};

admin.initializeApp(firebaseConfig);

const sendNotification = async userId => {
  await admin.messaging().send({
    token: userId,
    notification: {
      title: 'New message',
      body: 'Description',
    },
  });
};

exports.processDocumentCreated = functions.firestore.onDocumentCreated('CollectionOfMatches', async event => {
  const newData = event.params;
  const uid = newData.uid;

  try {
    const userQuerySnapshot = await admin.firestore().collection('users').where('uid', '==', uid).get();

    if (userQuerySnapshot.empty) {
      console.warn('Пользователь с UID', uid, 'не найден');
      return null;
    }

    userQuerySnapshot.forEach(async userDoc => {
      const userId = userDoc.id;

      await sendNotification(userId);

      console.warn('Уведомление отправлено пользователю с ID', userId);
    });

    return null;
  } catch (error) {
    console.error('Ошибка при поиске пользователя:', error);
    return null;
  }
});

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
