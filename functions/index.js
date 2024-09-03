const functionsV2 = require('firebase-functions/v2');
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

exports.processInviteMatch = functionsV2.firestore.onDocumentUpdated('Events/{eventId}', async event => {
  const eventData = event.data.after.data();

  let requestsList = [...eventData.requestsList];
  let usersList = [...eventData.usersList];

  const uidSet = new Set();
  let matchedUser = {};

  requestsList.forEach(request => {
    if (request.status === 'liked') {
      if (uidSet.has(request.uid)) {
        matchedUser = request;
      } else {
        uidSet.add(request.uid);
      }
    }
  });

  usersList.forEach(user => {
    if (user.status === 'liked') {
      if (uidSet.has(user.uid)) {
        matchedUser = user;
      } else {
        uidSet.add(user.uid);
      }
    }
  });

  if (matchedUser?.uid) {
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

    const userFromRequestsList = requestsList.find(request => request.uid === matchedUser.uid);
    const userFromUsersList = usersList.find(user => user.uid === matchedUser.uid);

    if (matchedUser?.fcmToken) {
      await admin.messaging().send({
        token: matchedUser.fcmToken,
        notification: {
          title: 'You have a new match!',
          body: `You have matched with ${eventData.name}`,
        },
        data: {
          type: 'match',
          name: `${matchedUser.name}`,
          imageUri: `${matchedUser.userPhoto}`,
          senderUid: `${eventData.uid}`,
          recipientUid: `${matchedUser.uid}`,
          eventId: `${eventData.id}`,
          userHostImageUri: `${eventData.hostImage}`,
          superInvite: userFromRequestsList?.superInvite ? 'true' : 'false',
        },
      });
    }
    if (eventData?.hostFcmToken) {
      await admin.messaging().send({
        token: eventData.hostFcmToken,
        notification: {
          title: 'You have a new match!',
          body: `You have matched with ${matchedUser.name}`,
        },
        data: {
          type: 'match',
          name: `${eventData.name}`,
          imageUri: `${matchedUser.userPhoto}`,
          senderUid: `${matchedUser.uid}`,
          recipientUid: `${eventData.uid}`,
          eventId: `${eventData.id}`,
          userHostImageUri: `${eventData.hostImage}`,
          superInvite: userFromUsersList?.superInvite ? 'true' : 'false',
        },
      });
    }

    return event.data.after.ref.set(
      {
        requestsList: updatedRequestsList,
        usersList: updatedUsersList,
      },
      {
        merge: true,
      },
    );
  }
});
