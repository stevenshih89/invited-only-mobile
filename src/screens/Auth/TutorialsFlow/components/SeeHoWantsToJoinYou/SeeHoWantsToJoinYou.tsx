import {Image, Text, View} from 'react-native';
import React, {useContext} from 'react';

//import components
import SeeHoWantsToJoinYouImage from 'assets/images/auth/tutorial-start-3.png';
import SeeHoWantsToJoinYouImageGuest from 'assets/images/auth/tutorial-start-3-guest.png';
import useStyles from 'screens/Auth/TutorialsFlow/components/SeeHoWantsToJoinYou/styles.ts';
import {AuthContext} from 'contexts/AuthContext.tsx';

const SeeHoWantsToJoinYou = () => {
  const {onBoarding} = useContext(AuthContext);
  const accountType = onBoarding[0]?.accountType === 'guest';
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.wrapperImage}>
        <Image resizeMode="contain" style={styles.image} source={accountType ? SeeHoWantsToJoinYouImageGuest : SeeHoWantsToJoinYouImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textSeeWhoWantsToJoinYoy}>{accountType ? 'See who wants\n' + ' to invite you' : 'See who wants to join you'}</Text>
        <Text style={styles.textFindOut}>
          {accountType ? 'See who wants to invite you to the event.' : "Find out who's interested in joining your table/event"}
        </Text>
      </View>
    </View>
  );
};

export default SeeHoWantsToJoinYou;
