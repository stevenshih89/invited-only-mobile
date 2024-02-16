import React, {FC, ReactNode, useState} from 'react';
import {View, SafeAreaView} from 'react-native';

//import components
import {gray1Color, whiteColor} from 'constants/colors.ts';
import useStyles from 'screens/Auth/TutorialsFlow/styles.ts';
import Stepper from 'components/Stepper/Stepper.tsx';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import CreateEvent from 'screens/Auth/TutorialsFlow/components/CreateEvent/CreateEvent.tsx';
import SwipeToInvite from 'screens/Auth/TutorialsFlow/components/SwipeToInvite/SwipeToInvite.tsx';
import SeeHoWantsToJoinYou from 'screens/Auth/TutorialsFlow/components/SeeHoWantsToJoinYou/SeeHoWantsToJoinYou.tsx';
import ApproveGuest from 'screens/Auth/TutorialsFlow/components/ApproveGuest/ApproveGuest.tsx';
import MeetEnjoy from 'screens/Auth/TutorialsFlow/components/MeetEnjoy/MeetEnjoy.tsx';
import JoinEvents from 'screens/Auth/TutorialsFlow/components/JoinEvents /JoinEvents.tsx';
import Button from 'components/Button/Button.tsx';

const TutorialsFlow: FC = (): JSX.Element => {
  const [active, setActive] = useState<number>(0);

  const styles = useStyles();
  const navigation = useAppNavigation();

  const content: ReactNode[] = [<CreateEvent />, <SwipeToInvite />, <SeeHoWantsToJoinYou />, <ApproveGuest />, <MeetEnjoy />, <JoinEvents />]; // all components for stepper

  const handleNext = () => {
    if (active === 5) return;

    setActive(p => p + 1);
  };

  const handleCloseQuestionnaire = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Stepper active={active} content={content} wrapperStyle={styles.wrapperStyle} />
      <View style={styles.wrapperButtons}>
        <Button buttonStyle={styles.buttonSkip} onPress={handleCloseQuestionnaire} title="Skip" variant="transparent" />
        <Button buttonStyle={styles.buttonNext} onPress={handleNext} title="Next" />
      </View>
      <View style={styles.wrapperBar}>
        {[...Array(6)].map((_, index) => (
          <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default TutorialsFlow;
