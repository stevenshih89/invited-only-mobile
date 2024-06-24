import React, {FC, ReactNode, useContext, useState} from 'react';
import {View, SafeAreaView, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

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
import {AuthContext} from 'contexts/AuthContext.tsx';
import {showToast} from 'helpers/showToast.ts';
import {useUser} from '../../../store/userStore';

const TutorialsFlow: FC = (): JSX.Element => {
  const [active, setActive] = useState<number>(0);

  const styles = useStyles();

  const content: ReactNode[] = [
    <CreateEvent />,
    <SwipeToInvite />,
    <SeeHoWantsToJoinYou />,
    <ApproveGuest />,
    <MeetEnjoy />,
    <JoinEvents />,
  ]; // all components for stepper
  const {onBoarding} = useContext(AuthContext);
  const accountType = onBoarding[0]?.accountType === 'guest';
  const setOnBoarding = useUser((i: any) => i?.setOnBoarding);

  const handleNext = () => {
    if (active === 5) {
      return handleCloseTutorialFlow();
    }

    setActive(p => p + 1);
  };

  const handleCloseTutorialFlow = async () => {
    setOnBoarding(true);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Stepper active={active} content={content} wrapperStyle={styles.wrapperStyle} />
      <View style={styles.wrapperButtons}>
        <Button buttonStyle={styles.buttonSkip} onPress={handleCloseTutorialFlow} title="Skip" variant="transparent" />
        <Button buttonStyle={styles.buttonNext} onPress={handleNext} title="Next" />
      </View>
      <View style={styles.wrapperBar}>
        {[...Array(accountType ? 5 : 6)].map((_, index) => (
          <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default TutorialsFlow;
