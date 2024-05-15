import {Image, Text, View} from 'react-native';
import React, {useContext} from 'react';

//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/MeetEnjoy/styles.ts';
import MeetEnjoyImage from 'assets/images/auth/tutorial-start-5.png';
import MeetEnjoyGuestImage from 'assets/images/auth/tutorial-start-5-guest.png';
import {AuthContext} from 'contexts/AuthContext.tsx';

const MeetEnjoy = () => {
  const {onBoarding} = useContext(AuthContext);
  const accountType = onBoarding[0]?.accountType === 'guest';
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} resizeMode="contain" source={accountType ? MeetEnjoyGuestImage : MeetEnjoyImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textMeetEnjoy}>Meet & Enjoy!</Text>
        <Text style={styles.textMeetNewPeople}>
          {accountType ? 'Have a great time together with new acquaintances!' : 'Meet new people, make new connections, and have fun together!'}
        </Text>
      </View>
    </View>
  );
};

export default MeetEnjoy;
