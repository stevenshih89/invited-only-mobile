const functionsV1 = require('firebase-functions');
const functionsV2 = require('firebase-functions/v2');
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

exports.getUsersForEvent = functionsV2.https.onCall(async request => {
  const {excludeUids, limit = 7, lastDoc, male, female, collectionName} = request.data;

  if (!excludeUids || !Array.isArray(excludeUids)) {
    throw new functionsV2.https.HttpsError('invalid-argument', 'Invalid excludeUids array');
  }

  try {
    let query = admin.firestore().collection(collectionName).where('accountType', '==', 'guest').where('accountConfirmed', '==', true);

    if (male > 0 && female === 0) {
      query = query.where('gender', '!=', 'woman');
    }
    if (female > 0 && male === 0) {
      query = query.where('gender', '!=', 'man');
    }

    query = query.orderBy('userBeauty', 'desc').orderBy('uid');

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
    throw new functionsV2.https.HttpsError('internal', 'Unable to get users');
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

exports.devGetUsersForEvent = functionsV2.https.onCall(async request => {
  const {excludeUids, limit = 7, lastDoc, male, female, collectionName} = request.data;

  if (!excludeUids || !Array.isArray(excludeUids)) {
    throw new functionsV2.https.HttpsError('invalid-argument', 'Invalid excludeUids array');
  }

  try {
    let query = admin.firestore().collection(collectionName).where('accountType', '==', 'guest').where('accountConfirmed', '==', true);

    if (male > 0 && female === 0) {
      query = query.where('gender', '!=', 'woman');
    }
    if (female > 0 && male === 0) {
      query = query.where('gender', '!=', 'man');
    }

    query = query.orderBy('userBeauty', 'desc').orderBy('uid');

    if (lastDoc) {
      const parsedLastDoc = JSON.parse(lastDoc);
      query = query.startAfter(parsedLastDoc.uid);
    }

    const startTime = Date.now();

    const snapshot = await query.get();

    const endTime = Date.now();
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
    throw new functionsV2.https.HttpsError('internal', 'Unable to get users');
  }
});
