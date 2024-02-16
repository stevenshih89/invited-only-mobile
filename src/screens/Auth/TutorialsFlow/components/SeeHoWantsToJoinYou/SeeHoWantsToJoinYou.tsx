import {Image, Text, View} from 'react-native';
import React from 'react';

//import components
import SeeHoWantsToJoinYouImage from 'assets/images/auth/tutorial-start-3.png';
import useStyles from 'screens/Auth/TutorialsFlow/components/SeeHoWantsToJoinYou/styles.ts';

const SeeHoWantsToJoinYou = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.wrapperImage}>
        <Image resizeMode="contain" style={styles.image} source={SeeHoWantsToJoinYouImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textSeeWhoWantsToJoinYoy}>See who wants to join you</Text>
        <Text style={styles.textFindOut}>Find out who's interested in joining your table/event</Text>
      </View>
    </View>
  );
};

export default SeeHoWantsToJoinYou;
