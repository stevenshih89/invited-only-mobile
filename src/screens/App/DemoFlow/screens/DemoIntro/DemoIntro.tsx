import {Image, Text, TouchableOpacity, View} from 'react-native';
import DemoIntroBg from 'assets/images/app/demo-intro-bg.png';
import CloseMediumIcon from 'assets/images/icons/close-medium.svg';
import useStyles from 'screens/App/DemoFlow/screens/DemoIntro/styles.ts';
import Button from 'components/Button/Button.tsx';
import React, {FC, useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {bottomTabsStackPath, demoEventCreatingPath, demoFlowStackPath, demoIOPath} from 'constants/pathLocations.ts';
import {useDemoFlowStore} from '../../../../../store/demoFlowStore';
import {screenWidth} from 'constants/common.ts';
import {useUser} from 'src/store/userStore';
import moment from 'moment';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';
import Loading from 'components/Loading/Loading';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';

const DemoIntro: FC = () => {
  const styles = useStyles();
  const {bottom} = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const {setHintStep, setIsVisibleSwipeGuide, setEvent} = useDemoFlowStore();
  const {user} = useUser();

  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

  useEffect(() => {
    setHintStep(1);
  }, []);

  const navigateToCreatingEvent = () => {
    setHintStep(1);
    navigation.navigate(demoEventCreatingPath);
  };

  const handleNextStep = () => {
    const uid: string = uuid.v4() as string;
    const demoEvent = {
      name: 'Red Mirage',
      date: '07.02.2025',
      hour: '21:30',
      address: 'Nad AJ Sheba 1 - Dubai',
      male: 50,
      placeName: 'Irisol Dubai',
      id: uid,
      uid: user?.uid,
      rejectsList: [],
      requestsList: [],
      usersList: [],
      statusEvent: false,
      eventReviewed: false,
      hostImage: user?.photos?.[0]?.image,
      hostName: user?.name,
      photos: [
        {
          id: 0,
          image:
            'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2FImage.png?alt=media&token=14b8e084-7280-4e49-abd4-0aeb3503c133',
        },
      ],
      isCancelled: false,
      createdAt: moment().format('YYYY-MM-DD'),
    };
    setEvent(demoEvent);
    navigation.navigate(demoFlowStackPath, {screen: demoIOPath} as never);
  };

  const navigateToSwipingTutorial = () => {
    handleNextStep();
    setHintStep(8);
    setIsVisibleSwipeGuide(true);
    navigation.navigate(demoFlowStackPath, {screen: demoIOPath} as never);
  };

  const setUserPassedDemo = async () => {
    if (user?.uid) {
      try {
        await firestore().collection(apiUserInfoCollection).doc(user?.uid).update({isPassedDemo: true});
        navigation.reset({
          index: 0,
          routes: [{name: bottomTabsStackPath}],
        });
      } catch (error) {
        console.error(error);
        logErrorToSentry(error)
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image resizeMode="contain" source={DemoIntroBg} />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={setUserPassedDemo}>
            <CloseMediumIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          ...styles.contentContainer,
          paddingBottom: bottom,
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{'Let’s Show You\nHow It Works'}</Text>
          <Text style={styles.description}>
            Let us walk you through the demo event flow and show how easy it is to share, invite, and have others join you at your tables
            and events!
          </Text>
        </View>
        <View style={styles.btnsContainer}>
          <Button
            onPress={navigateToCreatingEvent}
            title={'Share Table or Event (Demo)'}
            buttonStyle={{width: screenWidth - 48, height: 64, marginHorizontal: 24}}
          />
          <TouchableOpacity onPress={navigateToSwipingTutorial}>
            <Text style={styles.skipText}>Skip and Start Swiping Guests</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DemoIntro;
