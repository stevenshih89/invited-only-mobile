import {Image, Text, View} from 'react-native';
import React from 'react';

//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/JoinEvents /styles.ts';
import JoinEventsImage from 'assets/images/auth/tutorial-start-7.png';

const JoinEvents = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} resizeMode="contain" source={JoinEventsImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textJoinEvents}>Join events</Text>
        <Text style={styles.textExploreAndJoinEvents}>
          Explore and join events happening around you, and get invited to exciting experiences
        </Text>
      </View>
    </View>
  );
};

export default JoinEvents;
