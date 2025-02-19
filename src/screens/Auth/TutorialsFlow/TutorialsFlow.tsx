import React, {FC, ReactNode, useContext, useState} from 'react';
import {View, SafeAreaView, TouchableOpacity, Text, InteractionManager} from 'react-native';

//import components
import {gray1Color, whiteColor} from 'constants/colors.ts';
import useStyles from 'screens/Auth/TutorialsFlow/styles.ts';
import CreateEvent from 'screens/Auth/TutorialsFlow/components/CreateEvent/CreateEvent.tsx';
import SwipeToInvite from 'screens/Auth/TutorialsFlow/components/SwipeToInvite/SwipeToInvite.tsx';
import Button from 'components/Button/Button.tsx';
import {useUser} from '../../../store/userStore';
import GetInviteMatch from './components/GetInviteMatch/GetInviteMatch';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import {AuthContext} from 'contexts/AuthContext';
import {screenWidth} from 'constants/common';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import firestore from '@react-native-firebase/firestore';
import {UserInfo} from 'src/types/userInfo';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
const TutorialsFlow: FC = (): JSX.Element => {
  const [active, setActive] = useState<number>(0);

  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

  const {setUser, onBoarding} = useContext(AuthContext);
  const accountType = onBoarding.find((item: {accountType: string}) => item?.accountType);
  const accountTypeGuest = accountType?.accountType === 'guest';

  const styles = useStyles();

  const hostContent: ReactNode[] = [<CreateEvent />, <SwipeToInvite />];

  const guestContent: ReactNode[] = [<SwipeToInvite />, <GetInviteMatch />];

  const content = accountTypeGuest ? guestContent : hostContent;

  const {setOnBoarding, setUser: setUserData} = useUser();
  const navigation = useAppNavigation();
  const currentUser = auth().currentUser;
  const handleGoBack = () => {
    if (active === 0) {
      navigation.goBack();

      try {
        analytics().logEvent('tutorials_back_button_pressed', {
          userId: currentUser?.uid,
          name: onBoarding.find((item: any) => item.name)?.name,
          screen: 'tutorials-flow',
          action: 'back',
        });
      } catch (e) {
        console.error(e);
      }
      return;
    }

    setActive(p => p - 1);
  };

  const handleNext = () => {
    if (active === content.length - 1) {
      handleCloseTutorialFlow();

      try {
        analytics().logEvent('tutorials_continue_completed', {
          userId: currentUser?.uid,
          name: onBoarding.find((item: any) => item.name)?.name,
          screen: 'tutorials-flow',
          action: 'continue',
        });
      } catch (e) {
        console.error(e);
      }
      return;
    }
    setActive(p => p + 1);
  };

  const handleCloseTutorialFlow = async () => {
    setOnBoarding(true);
    setUser([`${currentUser?.uid}`]);

    try {
      const userQuery = await firestore().collection(apiUserInfoCollection).doc(currentUser?.uid).get();
      if (userQuery.exists) {
        const userData = userQuery.data() as UserInfo;
        setUserData(userData);
      }
    } catch (err) {
      console.error(err);
      logErrorToSentry(err);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{width: '100%', alignItems: 'flex-end', paddingRight: 20, paddingVertical: 20}}>
        <TouchableOpacity hitSlop={{left: 10, bottom: 10, right: 10, top: 10}} onPress={handleCloseTutorialFlow}>
          <Text style={{fontFamily: Satoshi500, fontSize: RFValue(15, 812), color: whiteColor}}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperStyle}>{content[active]}</View>
      <View style={styles.wrapperBar}>
        {[...Array(content.length)].map((_, index) => (
          <View
            key={index}
            style={[
              {
                backgroundColor: index === active ? whiteColor : gray1Color,
                width: 37,
                height: 4.5,
                marginHorizontal: screenWidth / 150,
                borderRadius: 57,
              },
            ]}
          />
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
