import React, {FC, useState, Dispatch, SetStateAction, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import HandIC from 'assets/images/icons/hand.svg';

//import components
import useStyles from 'screens/App/IO/screens/EventCreating/components/InvitedOnly/styles.ts';
import Button from 'components/Button/Button.tsx';
import {screenHeight} from 'constants/common.ts';
import PersonIcon from 'assets/images/icons/person.svg';
import {ScrollView} from 'react-native-gesture-handler';
import analytics from '@react-native-firebase/analytics';
import {useRoute} from '@react-navigation/native';
import {useDemoFlowStore} from '../../../../../../../store/demoFlowStore';
import HintCard from 'components/HintCard';
import {hostHintSteps} from 'constants/hints.ts';
import {demoFlowStackPath, demoIOPath} from 'constants/pathLocations.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import moment from 'moment';
import {useUser} from 'src/store/userStore';
import uuid from 'react-native-uuid';

interface InvitedOnlyProps {
  setTabState: Dispatch<SetStateAction<string>>;
  setIsVisibleSaveModal: Dispatch<SetStateAction<boolean>>;
  setCurrentCreateStap: Dispatch<SetStateAction<number>>;
  isEditing?: boolean;
  prevFemale?: number;
  prevMale?: number;
  prevFemaleFriend?: number;
  prevMaleFriend?: number;
  female?: number;
  setFemale?: () => void;
  male?: number;
  setMale?: () => void;
  femaleFriend?: number;
  setFemaleFriend?: () => void;
  maleFriend?: number;
  setMaleFriend?: () => void;
}

const InvitedOnly: FC<InvitedOnlyProps> = ({
  setTabState,
  setCurrentCreateStap,
  isEditing,
  prevFemale,
  prevMale,
  prevFemaleFriend,
  prevMaleFriend,
  female,
  setFemale,
  male,
  setMale,
  femaleFriend,
  setFemaleFriend,
  maleFriend,
  setMaleFriend,
}) => {
  const route = useRoute();
  const navigation = useAppNavigation();
  const {hintStep, setHintStep, setIsVisibleSwipeGuide, setEvent} = useDemoFlowStore();
  const isDemo = (route?.params as {isDemo?: boolean})?.isDemo;
  const {user} = useUser();

  const iconsArrayMale = Array.from({length: male}, (_, index) => index);
  const iconsArrayFemale = Array.from({length: female}, (_, index) => index);
  useEffect(() => {
    if (isEditing) {
      setFemale(prevFemale ?? 0);
      setMale(prevMale ?? 0);
      setFemaleFriend(prevFemaleFriend ?? 0);
      setMaleFriend(prevMaleFriend ?? 0);
    }
    try {
      analytics().logScreenView({
        screen_name: 'event_creating_invited_screen',
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const styles = useStyles();

  const renderIconsArrayFemale = () => {
    const index = iconsArrayFemale?.length;
    if (index >= 7) {
      return (
        <>
          {Array.from({length: 7}, (_, index) => index)?.map(index => {
            return (
              <View key={index} style={[styles.wrapperPersonIcon, {marginLeft: index === 0 ? 0 : 10}]}>
                <PersonIcon width={18} height={18} />
              </View>
            );
          })}
          <View key={index} style={[styles.wrapperPersonIcon, {marginLeft: index === 0 ? 0 : 10}]}>
            <Text style={styles.textButton}>+{index - 7}</Text>
          </View>
        </>
      );
    } else {
      return iconsArrayFemale?.map(index => {
        return (
          <View key={index} style={[styles.wrapperPersonIcon, {marginLeft: index === 0 ? 0 : 10}]}>
            <PersonIcon width={18} height={18} />
          </View>
        );
      });
    }
  };

  const renderIconsArrayMale = () => {
    const index = iconsArrayMale?.length;
    if (index >= 7) {
      return (
        <>
          {Array.from({length: 7}, (_, index) => index)?.map(index => {
            return (
              <View key={index} style={[styles.wrapperPersonIcon, {marginLeft: index === 0 ? 0 : 10}]}>
                <PersonIcon width={18} height={18} />
              </View>
            );
          })}
          <View key={index} style={[styles.wrapperPersonIcon, {marginLeft: index === 0 ? 0 : 10}]}>
            <Text style={styles.textButton}>+{index - 7}</Text>
          </View>
        </>
      );
    } else {
      return iconsArrayMale?.map(index => {
        return (
          <View key={index} style={[styles.wrapperPersonIcon, {marginLeft: index === 0 ? 0 : 10}]}>
            <PersonIcon width={18} height={18} />
          </View>
        );
      });
    }
  };

  const handleNextStep = () => {
    setTabState('eventDetails');
    setCurrentCreateStap(2);
  };

  const handleSkipHints = () => {
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
    setHintStep(8);
    setIsVisibleSwipeGuide(true);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        position: 'relative',
        zIndex: isDemo && hintStep === 2 ? 111 : 1,
      }}
      scrollEnabled={!isDemo}>
      <View
        style={{
          ...styles.container,
          zIndex: isDemo && hintStep === 2 ? 111 : 1,
        }}>
        {isDemo && hintStep === 2 && <View style={styles.overlayContainer} />}
        <View
          style={{
            ...styles.wrapperSelectYourDesiredCompany,
            zIndex: isDemo && hintStep === 2 ? 111 : 1,
          }}>
          <Text style={styles.textSelectYourDesiredCompany}>How many Guests would you like to invite?</Text>
          <View>
            <View style={styles.rowFemale}>
              <Text style={styles.textPersonGender}>Female</Text>
              <View style={styles.rowButtons}>
                <TouchableOpacity onPress={() => female !== 0 && setFemale(female - 1)} style={styles.buttonPress}>
                  <Text style={styles.textButton}>-</Text>
                </TouchableOpacity>
                <View style={styles.wrapperTextCount}>
                  <Text style={styles.textCount}>{female}</Text>
                </View>
                <TouchableOpacity onPress={() => setFemale(female + 1)} style={styles.buttonPress}>
                  <Text style={styles.textButton}>+</Text>
                  {isDemo && hintStep === 2 && (
                    <View style={styles.handIconContainer}>
                      <HandIC />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {/* {iconsArrayFemale?.length > 0 && <View style={{flexDirection: 'row', marginTop: 20}}>{renderIconsArrayFemale()}</View>} */}
            <View style={styles.rowMale}>
              <Text style={styles.textPersonGender}>Male</Text>
              <View style={styles.rowButtons}>
                <TouchableOpacity onPress={() => male !== 0 && setMale(male - 1)} style={styles.buttonPress}>
                  <Text style={styles.textButton}>-</Text>
                </TouchableOpacity>
                <View style={styles.wrapperTextCount}>
                  <Text style={styles.textCount}>{male}</Text>
                </View>
                <TouchableOpacity onPress={() => setMale(male + 1)} style={styles.buttonPress}>
                  <Text style={styles.textButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.rowMale}>
            <Text style={styles.textPersonGender}>Male</Text>
            <View style={styles.rowButtons}>
              <TouchableOpacity onPress={() => male !== 0 && setMale(male - 1)} style={styles.buttonPress}>
                <Text style={styles.textButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.textCount}>{male}</Text>
              <TouchableOpacity onPress={() => setMale(male + 1)} style={styles.buttonPress}>
                <Text style={styles.textButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View> */}
            {/* {iconsArrayMale?.length > 0 && <View style={{flexDirection: 'row', marginTop: 20}}>{renderIconsArrayMale()}</View>} */}
          </View>
        </View>
        {isDemo && hintStep === 2 && (
          <View style={styles.stepHintContainer}>
            <HintCard
              currentStep={hintStep}
              description={hostHintSteps[hintStep - 1]?.description}
              onSkipAction={handleSkipHints}
              onStepChange={setHintStep}
              onNextAction={handleNextStep}
              isNextBtnDisabled={female === 0 && male === 0}
              totalSteps={hostHintSteps.length}
              title={hostHintSteps[hintStep - 1]?.title}
            />
          </View>
        )}
        <View style={styles.wrapperOtherFriends}>
          <Text style={styles.textOtherFriend}>Do you have any other friends with you?</Text>
          <View style={styles.rowFemale}>
            <Text style={styles.textPersonGender}>Female</Text>
            <View style={styles.rowButtons}>
              <TouchableOpacity onPress={() => femaleFriend !== 0 && setFemaleFriend(femaleFriend - 1)} style={styles.buttonPress}>
                <Text style={styles.textButton}>-</Text>
              </TouchableOpacity>
              <View style={styles.wrapperTextCount}>
                <Text style={styles.textCount}>{femaleFriend}</Text>
              </View>
              <TouchableOpacity onPress={() => setFemaleFriend(femaleFriend + 1)} style={styles.buttonPress}>
                <Text style={styles.textButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowMale}>
            <Text style={styles.textPersonGender}>Male</Text>
            <View style={styles.rowButtons}>
              <TouchableOpacity onPress={() => maleFriend !== 0 && setMaleFriend(maleFriend - 1)} style={styles.buttonPress}>
                <Text style={styles.textButton}>-</Text>
              </TouchableOpacity>
              <View style={styles.wrapperTextCount}>
                <Text style={styles.textCount}>{maleFriend}</Text>
              </View>
              <TouchableOpacity onPress={() => setMaleFriend(maleFriend + 1)} style={styles.buttonPress}>
                <Text style={styles.textButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View>
          <Text style={styles.textPersonGenderFriends}>Male</Text>
          <View style={styles.rowButtonsOtherFriends}>
            <TouchableOpacity onPress={() => maleFriend !== 0 && setMaleFriend(maleFriend - 1)} style={styles.buttonPressOtherFriends}>
              <Text style={styles.textButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.textCountFriends}>{maleFriend}</Text>
            <TouchableOpacity onPress={() => setMaleFriend(maleFriend + 1)} style={styles.buttonPressOtherFriends}>
              <Text style={styles.textButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View> */}
          {/* <View>
          <Text style={[styles.textPersonGenderFriends, {marginTop: screenHeight / 35}]}>Female</Text>
          <View style={styles.rowButtonsOtherFriends}>
            <TouchableOpacity onPress={() => femaleFriend !== 0 && setFemaleFriend(femaleFriend - 1)} style={styles.buttonPressOtherFriends}>
              <Text style={styles.textButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.textCountFriends}>{femaleFriend}</Text>
            <TouchableOpacity onPress={() => setFemaleFriend(femaleFriend + 1)} style={styles.buttonPressOtherFriends}>
              <Text style={styles.textButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        </View>
        <Button
          disabled={!female && !male}
          onPress={() => {
            setTabState('eventDetails');
            setCurrentCreateStap(2);
          }}
          title={'Continue'}
        />
      </View>
    </ScrollView>
  );
};

export default InvitedOnly;
