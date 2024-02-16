import {Image, Text, View} from 'react-native';
import React from 'react';

//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/MeetEnjoy/styles.ts';
import MeetEnjoyImage from 'assets/images/auth/tutorial-start-5.png';

const MeetEnjoy = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={MeetEnjoyImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textMeetEnjoy}>Meet & Enjoy!</Text>
        <Text style={styles.textMeetNewPeople}>Meet new people, make new connections, and have fun together!</Text>
      </View>
    </View>
  );
};

export default MeetEnjoy;
