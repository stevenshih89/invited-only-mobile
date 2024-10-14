import React, {FC, ReactNode, useContext, useState} from 'react';
import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';

//import components
import {gray1Color, whiteColor} from 'constants/colors.ts';
import useStyles from 'screens/Auth/TutorialsFlow/styles.ts';
import Stepper from 'components/Stepper/Stepper.tsx';
import CreateEvent from 'screens/Auth/TutorialsFlow/components/CreateEvent/CreateEvent.tsx';
import SwipeToInvite from 'screens/Auth/TutorialsFlow/components/SwipeToInvite/SwipeToInvite.tsx';
import SeeHoWantsToJoinYou from 'screens/Auth/TutorialsFlow/components/SeeHoWantsToJoinYou/SeeHoWantsToJoinYou.tsx';
import ApproveGuest from 'screens/Auth/TutorialsFlow/components/ApproveGuest/ApproveGuest.tsx';
import MeetEnjoy from 'screens/Auth/TutorialsFlow/components/MeetEnjoy/MeetEnjoy.tsx';
import JoinEvents from 'screens/Auth/TutorialsFlow/components/JoinEvents /JoinEvents.tsx';
import Button from 'components/Button/Button.tsx';
import {useUser} from '../../../store/userStore';
import GetInviteMatch from './components/GetInviteMatch/GetInviteMatch';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import {AuthContext} from 'contexts/AuthContext';
import { screenWidth } from 'constants/common';

const TutorialsFlow: FC = (): JSX.Element => {
  const [active, setActive] = useState<number>(0);

  const {setUser, onBoarding} = useContext(AuthContext);
  const accountTypeGuest = onBoarding[0]?.accountType === 'guest';

  const styles = useStyles();

  const hostContent: ReactNode[] = [
    <CreateEvent />,
    <SwipeToInvite />,
  ];

  const guestContent: ReactNode[] = [<SwipeToInvite />, <GetInviteMatch />, <SeeHoWantsToJoinYou />, <ApproveGuest />, <MeetEnjoy />];

  const content = accountTypeGuest ? guestContent : hostContent;

  const setOnBoarding = useUser((i: any) => i?.setOnBoarding);
  const navigation = useAppNavigation();

  const handleGoBack = () => {
    if (active === 0) {
      navigation.goBack();
    }

    setActive(p => p - 1);
  };

  const handleNext = () => {
    if (active === content.length - 1) {      
      return handleCloseTutorialFlow();
    }
    setActive(p => p + 1);
  };

  const handleCloseTutorialFlow = async () => {
    const user = auth().currentUser;
    setOnBoarding(true);
    setUser([`${user?.uid}`]);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{width: '100%', alignItems: 'flex-end', paddingRight: 20, paddingVertical: 20}}>
        <TouchableOpacity hitSlop={{left: 10, bottom: 10, right: 10, top: 10}} onPress={handleCloseTutorialFlow}>
          <Text style={{fontFamily: Satoshi500, fontSize: RFValue(15, 812), color: whiteColor}}>Skip</Text>
        </TouchableOpacity>
      </View>
      <Stepper active={active} content={content} wrapperStyle={styles.wrapperStyle} />
      <View style={styles.wrapperBar}>
        {[...Array(content.length)].map((_, index) => (
          accountTypeGuest?
          <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />:
          <View key={index} style={[{
            backgroundColor: index === active ? whiteColor : gray1Color,
            width: 37,
            height: 4.5,
            marginHorizontal: screenWidth / 150,
            borderRadius: 57,
          }]} />
        ))}
      </View>
      <View style={styles.wrapperButtons}>
        <Button buttonStyle={styles.buttonSkip} onPress={handleGoBack} title="Back" variant="transparent" />
        <Button buttonStyle={styles.buttonNext} onPress={handleNext} title="Next" />
      </View>
    </SafeAreaView>
  );
};

export default TutorialsFlow;
