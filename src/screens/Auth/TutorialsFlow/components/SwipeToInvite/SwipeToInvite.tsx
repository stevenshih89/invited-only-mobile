import {Image, Text, View} from 'react-native';
import React, {useContext} from 'react';
import SwipeToInviteImage from 'assets/images/auth/tutorial-start-2.png';
import SwipeToJoinImage from 'assets/images/auth/tutorial-start-2-guest.png';

//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/SwipeToInvite/styles.ts';
import {AuthContext} from 'contexts/AuthContext.tsx';

const SwipeToInvite = () => {
  const {onBoarding} = useContext(AuthContext);
  const accountType = onBoarding[0]?.accountType === 'guest';
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.wrapperImage}>
        <Image resizeMode="contain" style={styles.image} source={accountType ? SwipeToJoinImage : SwipeToInviteImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textSwipeToInvite}>{accountType ? 'Swipe to join' : 'Swipe to Invite'}</Text>
        <Text style={styles.textSwipeRightToInvite}>
          {accountType
            ? "Swipe to send a request to join. Swipe left if you're not interested."
            : "Swipe right to invite someone you like, and swipe left if you're not interested"}
        </Text>
      </View>
    </View>
  );
};

export default SwipeToInvite;
