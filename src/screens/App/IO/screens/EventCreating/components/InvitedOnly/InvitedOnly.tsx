import React, {FC, useState, Dispatch, SetStateAction, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//import components
import useStyles from 'screens/App/IO/screens/EventCreating/components/InvitedOnly/styles.ts';
import Button from 'components/Button/Button.tsx';
import {screenHeight} from 'constants/common.ts';

interface InvitedOnlyProps {
  setTabState: Dispatch<SetStateAction<string>>;
  setIsVisibleSaveModal: Dispatch<SetStateAction<boolean>>;
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
  useEffect(() => {
    if (isEditing) {
      setFemale(prevFemale ?? 0);
      setMale(prevMale ?? 0);
      setFemaleFriend(prevFemaleFriend ?? 0);
      setMaleFriend(prevMaleFriend ?? 0);
    }
  }, []);

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.wrapperSelectYourDesiredCompany}>
        <Text style={styles.textSelectYourDesiredCompany}>Select your desired company</Text>
        <View>
          <View style={styles.rowFemale}>
            <Text style={styles.textPersonGender}>Female</Text>
            <View style={styles.rowButtons}>
              <TouchableOpacity onPress={() => female !== 0 && setFemale(female - 1)} style={styles.buttonPress}>
                <Text style={styles.textButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.textCount}>{female}</Text>
              <TouchableOpacity onPress={() => setFemale(female + 1)} style={styles.buttonPress}>
                <Text style={styles.textButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowMale}>
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
          </View>
        </View>
      </View>
      <View style={styles.wrapperOtherFriends}>
        <Text style={styles.textOtherFriend}>Do you have any other friends with you?</Text>
        <View>
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
        </View>
        <View>
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
        </View>
      </View>
      <Button
        onPress={() => (isEditing ? setIsVisibleSaveModal(true) : setTabState('eventDetails'))}
        title={isEditing ? 'Save changes' : 'Continue to the event details'}
      />
    </View>
  );
};

export default InvitedOnly;
