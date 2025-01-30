const functionsV1 = require('firebase-functions');
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

exports.getUsersForEvent = functionsV1.https.onCall(async data => {
  const {excludeUids, limit = 7, lastDoc, male, female, collectionName} = data;

  if (!excludeUids || !Array.isArray(excludeUids)) {
    throw new functionsV1.https.HttpsError('invalid-argument', 'Invalid excludeUids array');
  }

  try {
    let query = admin
      .firestore()
      .collection(collectionName)
      .orderBy('userBeauty', 'desc')
      .orderBy('uid')
      .where('accountType', '==', 'guest')
      .where('accountConfirmed', '==', true);

    if (male > 0 && female === 0) {
      query = query.where('gender', '!=', 'woman');
    }
    if (female > 0 && male === 0) {
      query = query.where('gender', '!=', 'man');
    }

    if (lastDoc) {
      const parsedLastDoc = JSON.parse(lastDoc);
      query = query.startAfter(parsedLastDoc.uid);
    }

    const snapshot = await query.get();

    const users = snapshot.docs
      .filter(doc => !excludeUids.includes(doc.id))
      .map(doc => ({id: doc.id, ...doc.data()}))
      .slice(0, limit);
    const newLastDoc = users[users.length - 1] || null;

    return {
      users,
      lastDoc: newLastDoc ? JSON.stringify(newLastDoc) : null,
    };
  } catch (error) {
    console.error('Error filtering users:', error);
    throw new functionsV1.https.HttpsError('internal', 'Unable to get users');
  }
});

exports.sendNotification = functionsV1.https.onCall(async data => {
  const {token, notification, data: msgData} = data;
  if (token) {
    const message = {
      token: token,
      notification: notification,
      data: msgData,
    };

    try {
      await admin.messaging().send(message);
      return {success: true, data: message};
    } catch (error) {
      return {success: false, error: error.message};
    }
  } else {
    return {success: false, error: 'FCM token not found'};
  }
});

exports.sendNotificationReq = functionsV1.https.onRequest(async (req, res) => {
  const {token, notification, data: msgData} = req.body;

  if (token) {
    const message = {
      token: token,
      notification: notification,
      data: msgData,
    };

    try {
      await admin.messaging().send(message);
      return res.status(200).send({success: true, data: message});
      // return {success: true, data: message};
    } catch (error) {
      return {success: false, error: error.message};
    }
  } else {
    return {success: false, error: 'FCM token not found'};
  }
});

/////////////////////////////////////////////////////////////// DEV

exports.devGetUsersForEvent = functionsV1.https.onCall(async data => {
  const {excludeUids, limit = 7, lastDoc, male, female, collectionName} = data;

  if (!excludeUids || !Array.isArray(excludeUids)) {
    throw new functionsV1.https.HttpsError('invalid-argument', 'Invalid excludeUids array');
  }

  try {
    let query = admin
      .firestore()
      .collection(collectionName)
      .orderBy('userBeauty', 'desc')
      .orderBy('uid')
      .where('accountType', '==', 'guest')
      .where('accountConfirmed', '==', true);

    if (male > 0 && female === 0) {
      query = query.where('gender', '!=', 'woman');
    }
    if (female > 0 && male === 0) {
      query = query.where('gender', '!=', 'man');
    }

    if (lastDoc) {
      const parsedLastDoc = JSON.parse(lastDoc);
      query = query.startAfter(parsedLastDoc.uid);
    }

    const startTime = Date.now(); // Начало времени выполнения

    const snapshot = await query.get();

    const endTime = Date.now(); // Конец времени выполнения
    console.log(`Query execution time: ${endTime - startTime} ms`);

    const users = snapshot.docs
      .filter(doc => !excludeUids.includes(doc.id))
      .map(doc => ({id: doc.id, ...doc.data()}))
      .slice(0, limit);
    const newLastDoc = users[users.length - 1] || null;

    return {
      users,
      lastDoc: newLastDoc ? JSON.stringify(newLastDoc) : null,
    };
  } catch (error) {
    console.error('Error filtering users:', error);
    throw new functionsV1.https.HttpsError('internal', 'Unable to get users');
  }
});
