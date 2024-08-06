import {Image, Text, View} from 'react-native';
import React, {useContext} from 'react';

//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/MeetEnjoy/styles.ts';
import MeetEnjoyImage from 'assets/images/auth/tutorial-start-6.png';
import {AuthContext} from 'contexts/AuthContext.tsx';

const MeetEnjoy = () => {
  const {onBoarding} = useContext(AuthContext);
  const accountTypeGuest = onBoarding[0]?.accountType === 'guest';
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} resizeMode="contain" source={MeetEnjoyImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textMeetEnjoy}>Meet and Enjoy!</Text>
        <Text style={styles.textMeetNewPeople}>
          {accountTypeGuest
            ? 'Connect with like-minded individuals at exclusive events. Network, socialize, and create lasting memories. Enjoy every moment!'
            : 'Meet new people, make new connections, and have fun together!'}
        </Text>
      </View>
    </View>
  );
};

export default MeetEnjoy;
