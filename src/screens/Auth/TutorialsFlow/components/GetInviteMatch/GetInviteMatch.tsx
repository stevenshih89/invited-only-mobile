import {Image, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from 'contexts/AuthContext.tsx';

//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/GetInviteMatch/styles.ts';
import GetInviteMatchImage from 'assets/images/auth/tutorial-start-3.png';
import GetInviteMatchGuestImage from 'assets/images/auth/tutorial-guest-2.png';

const GetInviteMatch = () => {
  const styles = useStyles();
  const {onBoarding} = useContext(AuthContext);
  const accountTypeGuest = onBoarding[0]?.accountType === 'guest';

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image resizeMode="contain" style={styles.image} source={accountTypeGuest ? GetInviteMatchGuestImage : GetInviteMatchImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textGetInviteMatch}>Get Invite Match!</Text>
        <Text style={styles.textExploreAndGetInviteMatch}>Match with guests who want to join you and start chatting</Text>
      </View>
    </View>
  );
};

export default GetInviteMatch;
