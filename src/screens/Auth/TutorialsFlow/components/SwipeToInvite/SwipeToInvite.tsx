import {Image, Text, View} from 'react-native';
import React from 'react';
import SwipeToInviteImage from 'assets/images/auth/tutorial-start-2.png';

//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/SwipeToInvite/styles.ts';

const SwipeToInvite = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.wrapperImage}>
        <Image style={styles.image} source={SwipeToInviteImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textSwipeToInvite}>Swipe to Invite</Text>
        <Text style={styles.textSwipeRightToInvite}>Swipe right to invite someone you like, and swipe left if you're not interested</Text>
      </View>
    </View>
  );
};

export default SwipeToInvite;
