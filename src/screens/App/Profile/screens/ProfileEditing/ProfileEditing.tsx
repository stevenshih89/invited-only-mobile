import {blackColor, transparentWhite16Color} from 'constants/colors';
import {FC, ReactElement} from 'react';
import {SafeAreaView, View} from 'react-native';
import MyPhotos from './MyPhotos';
import MyInterests from './MyInterests';
import {screenHeight} from 'constants/common';
import MyBio from './MyBio';
import LanguagesKnow from './LanguagesKnow';
import Button from 'components/Button/Button';
import MyBasics from './MyBasics';
import ModalSmoke from './ModalSmoke';
import ModalGender from './ModalGender';
import ModalHeight from './ModalHeight';
import ModalWork from './ModalWork';
import ModalAlcohol from './ModalAlcohol';
import ModalBirthday from './ModalBirthday';
import ModalLocation from './ModalLocation';
import ModalHomeAdress from './ModalHomeAdress';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useProfileProfileEditing } from 'hooks/useProfileEditing';

const SAVE_FIELD_INTERESTS = 'interests';
const SAVE_FIELD_BIO = 'bio';

const ProfileEditing: FC = (): ReactElement => {
  const {
    images,
    setImages,
    listOfInterests,
    setListOfInterests,
    interestsLoading,
    isVisibleHeightModal,
    saveBtnInterestsVisible,
    saveUserInfo,
    loadingSaveInterests,
    bio,
    setBio,
    saveBtnBioVisible,
    loadingSaveBoi,
    textNameWork,
    activeAlcoholItem,
    activeSmokeItem,
    height,
    bithdate,
    location,
    textHomeAdress,
    setIsVisibleSmokeModal,
    setIsVisibleGenderModal,
    setIsVisibleHeightModal,
    setIsVisibleWorkModal,
    setIsVisibleAlcoholModal,
    setIsVisibleBirthdayModal,
    setIsVisibleLocationModal,
    setIsVisibleHomeAddressModal,
    showSmoke,
    setShowSmoke,
    setActiveSmokeItem,
    listOfSmokes,
    isVisibleSmokeModal,
    showGender,
    setShowGender,
    activeGenderItem,
    setActiveGenderItem,
    listOfGenders,
    isVisibleGenderModal,
    showHeight,
    setShowHeight,
    heightsList,
    setHeight,
    showWork,
    setShowWork,
    textDescription,
    setTextNameWork,
    setTextDescription,
    isVisibleWorkModal,
    showAlcohol,
    setShowAlcohol,
    setActiveAlcoholItem,
    listOfAlcohols,
    isVisibleAlcoholModal,
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    setShowAge,
    showAge,
    isVisibleBirthdayModal,
    setLocation,
    setShowLocation,
    showLocation,
    isVisibleLocationModal,
    setTextHomeAdress,
    setShowHomeAdress,
    showHomeAdress,
    isVisibleHomeAddressModal
} = useProfileProfileEditing()
  
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: blackColor}}>
        <View style={{flex: 1, paddingTop: screenHeight / 48, paddingHorizontal: 20}}>
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            enableResetScrollToCoords={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 80}}
            style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
            <MyPhotos images={images} setImages={setImages} />
            <MyInterests listOfInterests={listOfInterests} setListOfInterests={setListOfInterests} loading={interestsLoading} />
            {saveBtnInterestsVisible && (
              <Button
                title="Save"
                buttonStyle={{marginTop: 20}}
                onPress={() => saveUserInfo('', SAVE_FIELD_INTERESTS)}
                loading={loadingSaveInterests}
              />
            )}
            <MyBio bio={bio} setBio={setBio} />
            {saveBtnBioVisible && (
              <Button
                title="Save"
                buttonStyle={{marginTop: 20}}
                onPress={() => saveUserInfo('', SAVE_FIELD_BIO)}
                loading={loadingSaveBoi}
              />
            )}
            <MyBasics
              // activeWorkItem={activeWorkItem}
              work={textNameWork}
              activeAlcoholItem={activeAlcoholItem}
              activeSmokeItem={activeSmokeItem}
              height={height}
              date={bithdate}
              location={location}
              homeAddress={textHomeAdress}
              setIsVisibleSmokeModal={setIsVisibleSmokeModal}
              setIsVisibleGenderModal={setIsVisibleGenderModal}
              setIsVisibleHeightModal={setIsVisibleHeightModal}
              setIsVisibleWorkModal={setIsVisibleWorkModal}
              setIsVisibleAlcoholModal={setIsVisibleAlcoholModal}
              setIsVisibleBirthdayModal={setIsVisibleBirthdayModal}
              setIsVisibleLocationModal={setIsVisibleLocationModal}
              setIsVisibleHomeAddressModal={setIsVisibleHomeAddressModal}
            />
            <LanguagesKnow />
            {/* <Button title="Save" buttonStyle={{marginTop: 34}} onPress={saveUserInfo} loading={loadingSave} /> */}
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
      <ModalSmoke
        saveUserInfo={saveUserInfo}
        showSmoke={showSmoke}
        setShowSmoke={setShowSmoke}
        activeSmokeItem={activeSmokeItem}
        setActiveSmokeItem={setActiveSmokeItem}
        listOfSmokes={listOfSmokes}
        isVisible={isVisibleSmokeModal}
        onClose={() => setIsVisibleSmokeModal(false)}
      />
      <ModalGender
        saveUserInfo={saveUserInfo}
        showGender={showGender}
        setShowGender={setShowGender}
        activeGenderItem={activeGenderItem}
        setActiveGenderItem={setActiveGenderItem}
        listOfGenders={listOfGenders}
        isVisible={isVisibleGenderModal}
        onClose={() => setIsVisibleGenderModal(false)}
      />
      <ModalHeight
        saveUserInfo={saveUserInfo}
        showHeight={showHeight}
        setShowHeight={setShowHeight}
        heightsList={heightsList}
        height={height}
        setHeight={setHeight}
        isVisible={isVisibleHeightModal}
        onClose={() => setIsVisibleHeightModal(false)}
      />
      <ModalWork
        showWork={showWork}
        setShowWork={setShowWork}
        textNameWork={textNameWork}
        textDescription={textDescription}
        setTextNameWork={setTextNameWork}
        setTextDescription={setTextDescription}
        isVisible={isVisibleWorkModal}
        onClose={() => setIsVisibleWorkModal(false)}
        saveUserInfo={saveUserInfo}
      />
      <ModalAlcohol
        saveUserInfo={saveUserInfo}
        showAlcohol={showAlcohol}
        setShowAlcohol={setShowAlcohol}
        activeAlcoholItem={activeAlcoholItem}
        setActiveAlcoholItem={setActiveAlcoholItem}
        listOfAlcohols={listOfAlcohols}
        isVisible={isVisibleAlcoholModal}
        onClose={() => setIsVisibleAlcoholModal(false)}
      />
      <ModalBirthday
        day={day}
        setDay={setDay}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        setShowAge={setShowAge}
        showAge={showAge}
        isVisible={isVisibleBirthdayModal}
        onClose={() => setIsVisibleBirthdayModal(false)}
        saveUserInfo={saveUserInfo}
      />
      <ModalLocation
        saveUserInfo={saveUserInfo}
        location={location}
        setLocation={setLocation}
        setShowLocation={setShowLocation}
        showLocation={showLocation}
        isVisible={isVisibleLocationModal}
        onClose={() => setIsVisibleLocationModal(false)}
      />
      <ModalHomeAdress
        saveUserInfo={saveUserInfo}
        textHomeAdress={textHomeAdress}
        setTextHomeAdress={setTextHomeAdress}
        setShowHomeAdress={setShowHomeAdress}
        showHomeAdress={showHomeAdress}
        isVisible={isVisibleHomeAddressModal}
        onClose={() => setIsVisibleHomeAddressModal(false)}
      />
    </>
  );
};

export default ProfileEditing;
