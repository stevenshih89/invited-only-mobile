import {Image, Text, View} from 'react-native';
import React from 'react';

//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/GetInviteMatch/styles.ts';
import GetInviteMatchImage from 'assets/images/auth/tutorial-start-3.png';

const GetInviteMatch = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} resizeMode="contain" source={GetInviteMatchImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textGetInviteMatch}>Get Invite Match!</Text>
        <Text style={styles.textExploreAndGetInviteMatch}>
          Swipe right to invite someone you like, and swipe left if you're not interested
        </Text>
      </View>
    </View>
  );
};

export default GetInviteMatch;
