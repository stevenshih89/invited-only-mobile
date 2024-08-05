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

exports.processInviteMatch = functions.firestore.onDocumentUpdated('Events/{eventId}', async event => {
  const currentUser = admin.auth().currentUser;
  console.log('curr', currentUser);
  const eventData = event.data.after.data();
  const id = event.id;

  let requestsList = [...eventData.requestsList];
  let usersList = [...eventData.usersList];

  const uidSet = new Set();
  let matchedUser = {};

  requestsList.forEach(request => {
    if (uidSet.has(request.uid)) {
      matchedUser = request;
    } else {
      uidSet.add(request.uid);
    }
  });

  usersList.forEach(user => {
    if (uidSet.has(user.uid)) {
      matchedUser = user;
    } else {
      uidSet.add(user.uid);
    }
  });

  if (matchedUser) {
    const updatedRequestsList = requestsList.filter(request => request.uid !== matchedUser.uid);
    const updatedUsersList = usersList.map(user => {
      if (user.uid === matchedUser.uid) {
        return {
          ...user,
          status: 'invite_match',
        };
      }
      return user;
    });

    await admin.firestore().collection('Events').doc(id).update({
      requestsList: updatedRequestsList,
      usersList: updatedUsersList,
    });
    await admin.messaging().send({
      token: matchedUser.fcmToken,
      notification: {
        type: 'match',
        name: matchedUser.name,
        imageUri: matchedUser.photos,
        senderUid: eventData?.uid,
        recipientUid: matchedUser.uid,
        eventId: id,
        superInvite: matchedUser.superInvite,
      },
    });
  }
});

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
