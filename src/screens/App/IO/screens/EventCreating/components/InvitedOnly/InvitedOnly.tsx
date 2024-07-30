import React, {FC, useState, Dispatch, SetStateAction, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//import components
import useStyles from 'screens/App/IO/screens/EventCreating/components/InvitedOnly/styles.ts';
import Button from 'components/Button/Button.tsx';
import {screenHeight} from 'constants/common.ts';
import PersonIcon from 'assets/images/icons/person.svg';
import { ScrollView } from 'react-native-gesture-handler';

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
  setIsVisibleSaveModal,
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
  const iconsArrayMale = Array.from({length: male}, (_, index) => index);
  const iconsArrayFemale = Array.from({length: female}, (_, index) => index);
  useEffect(() => {
    if (isEditing) {
      setFemale(prevFemale ?? 0);
      setMale(prevMale ?? 0);
      setFemaleFriend(prevFemaleFriend ?? 0);
      setMaleFriend(prevMaleFriend ?? 0);
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

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.wrapperSelectYourDesiredCompany}>
        <Text style={styles.textSelectYourDesiredCompany}>How many Guests would you like to invite</Text>
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
                </TouchableOpacity>
              </View>
          </View>
          {iconsArrayFemale?.length > 0 && <View style={{flexDirection: 'row', marginTop: 20}}>{renderIconsArrayFemale()}</View>}
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
          {iconsArrayMale?.length > 0 && <View style={{flexDirection: 'row', marginTop: 20}}>{renderIconsArrayMale()}</View>}
        </View>
      </View>
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
          setTabState('eventDetails')
          setCurrentCreateStap(2);
        }}
        title={'Continue'}
      />
    </View>
    </ScrollView>
  );
};

export default InvitedOnly;
