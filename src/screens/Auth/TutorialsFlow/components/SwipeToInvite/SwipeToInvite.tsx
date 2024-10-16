import {Image, Text, View} from 'react-native';
import React, {useContext} from 'react';
import SwipeToInviteImage from 'assets/images/auth/tutorial-host-2.png';
import SwipeToJoinImage from 'assets/images/auth/tutorial-guest-1.png';
//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/SwipeToInvite/styles.ts';
import {AuthContext} from 'contexts/AuthContext.tsx';

const SwipeToInvite = () => {
  const {onBoarding} = useContext(AuthContext);
  const accountTypeGuest = onBoarding[0]?.accountType === 'guest';
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.wrapperImage}>
        <Image resizeMode="contain" style={styles.image} source={accountTypeGuest ? SwipeToJoinImage : SwipeToInviteImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textSwipeToInvite}>{accountTypeGuest ? 'Join VIP Tables and exclusive events' : 'Build your guest list'}</Text>
        <Text style={styles.textSwipeRightToInvite}>{accountTypeGuest? 'Discover premier events and unlock exclusive invitations.':
        'Invite someone you’d love to have at your event! Dismiss anyone you’re not interested in inviting.'
          }</Text>
      </View>
    </View>
  );
};

export default SwipeToInvite;
