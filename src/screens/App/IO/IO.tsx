import {SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {FC, useState, useEffect} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {TinderCard} from 'rn-tinder-card';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

//import components
import useStyles from 'screens/App/IO/styles.ts';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {eventCreatingStackPath} from 'constants/pathLocations.ts';
import InstagramSlider from 'components/InstagramSlider/InstagramSlider';
import SuperInvite from './screens/SuperInvite/SuperInvite';
import Match from './screens/Match/Match';
import Button from 'components/Button/Button.tsx';
import {showToast} from 'helpers/showToast.ts';

//import icons
import PersonIcon from 'assets/images/icons/person.svg';
import LocationIcon from 'assets/images/icons/location.svg';
import TablerGenderIcon from 'assets/images/icons/tabler_gender-bigender.svg';
import HomeIcon from 'assets/images/icons/home.svg';
import ArrowIcon from 'assets/images/icons/arrow-3.svg';
import WineIcon from 'assets/images/icons/milk.svg';
import SmokeIcon from 'assets/images/icons/smoke.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import FlashIcon from 'assets/images/icons/flash.svg';

const IO: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [isVisibleSuperInvite, setIsVisibleSuperInvite] = useState<boolean>(false);
  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const [nameUser, setNameUser] = useState<string>('');

  const handleOpenSuperInvite = () => {
    setIsVisibleSuperInvite(true);
  };

  const handleCloseSuperInvite = () => {
    setIsVisibleSuperInvite(false);
  };

  const handleCloseMatch = () => {
    setIsVisibleMatch(false);
  };

  const handleOpenMatch = () => {
    setIsVisibleMatch(true);
  };

  const OverlayRight = () => {
    return (
      <View style={[styles.overlayLabelContainerInvite]}>
        <Text style={styles.overlayLabelTextInvite}>INVITE</Text>
      </View>
    );
  };
  const OverlayLeft = () => {
    return (
      <View style={[styles.overlayLabelContainer]}>
        <Text style={styles.overlayLabelText}>NOPE</Text>
      </View>
    );
  };

  const getEventsData = async () => {
    try {
      const eventsData: FirebaseFirestoreTypes.DocumentData = await firestore().collection('Events').limit(10).get();
      let data: any[] = [
        <View style={styles.wrapperCreateEventCard}>
          <Text style={styles.textYouNeedToCreate}>You need to create an event to start inviting</Text>
          <Text style={styles.textYouDontHaveAny}>You don't have any active event.</Text>
          <Button onPress={() => navigation.navigate(eventCreatingStackPath)} title="Create event" />
          <View style={styles.rowText}>
            <Text style={styles.textDontHaveAnEvent}>Don't have an event?</Text>
            <View style={styles.rowJoinOne}>
              <Text style={styles.textJoinOne}>Join one!</Text>
            </View>
          </View>
        </View>,
      ];

      await eventsData?._docs?.map((item: any, index: number): void => {
        const {name, bio, accountType, gender, address, homeAddress, height, typeOfAlcohol, age} = item?._data;

        setNameUser(name);
        const girlPhotos = item?._data?.images?.map((image: any): void => image?.images);
        const interests = item?._data?.interests?.map((i: any): void => i?.title);
        const smoking: 'Yes' | 'No' = item?._data?.smoking ? 'Yes' : 'No';

        data.push(
          <View key={index} style={styles.wrapperFakeCard}>
            <TouchingSlider
              name={name}
              age={age}
              homeAddress={homeAddress}
              isShowInvitesTooltip={false}
              handleOpenSuperInvite={handleOpenSuperInvite}
              handleOpenMatch={handleOpenMatch}
              photos={girlPhotos}
            />
            <View style={styles.bioWrapper}>
              <Text style={styles.titleSection}>Bio</Text>
              <Text style={styles.textDescription}>{bio}</Text>
              <Text style={[styles.titleSection, styles.mt31]}>About me</Text>
              <View style={styles.wrapperTextTags}>
                <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                  <PersonIcon />
                  {accountType}
                </Text>
                {gender && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <TablerGenderIcon /> {gender}
                  </Text>
                )}
                {address && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <LocationIcon /> {address}
                  </Text>
                )}
                {homeAddress && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <HomeIcon /> {homeAddress}
                  </Text>
                )}
                {height && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <ArrowIcon /> {height} см
                  </Text>
                )}
                {typeOfAlcohol && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <WineIcon /> {typeOfAlcohol}
                  </Text>
                )}
                {smoking && (
                  <Text style={[styles.textTagsAboutMe, {marginLeft: screenWidth / 33}]}>
                    <SmokeIcon /> {smoking}
                  </Text>
                )}
              </View>
              <Text style={[styles.titleSection, styles.mt31]}>Interests</Text>
              <View style={styles.wrapperInterestsTags}>
                {interests?.map((interests: any, index: number) => (
                  <View key={index} style={styles.interestsTags}>
                    <Text style={styles.textTagsInterests}>{interests}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.wrapperImageSectionFaceGirl}>
                {girlPhotos?.map((photo: any, index: number) => (
                  <Image key={index} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />
                ))}
              </View>
              <InstagramSlider fakeSmallGirlPhotos={girlPhotos} />
              <View style={styles.wrapperButtonsFooter}>
                <TouchableOpacity style={styles.buttonCloseOrCheck}>
                  <CloseIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFlash} onPress={handleOpenSuperInvite}>
                  <FlashIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCloseOrCheck}>
                  <CheckIcon />
                </TouchableOpacity>
              </View>
              <Text style={styles.textHideNadSendReport}>Hide and send report</Text>
            </View>
          </View>,
        );
        setEvents([...data]);
      });
    } catch (e) {
      console.log(e);
      showToast('cancel', '', `${e}`);
    }
  };

  useEffect(() => {
    getEventsData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {events?.map((item, index) => {
          return (
            <View style={styles.cardContainer} pointerEvents="box-none" key={index}>
              <TinderCard
                // @ts-ignore
                cardWidth="100%"
                // @ts-ignore
                cardHeight="100%"
                OverlayLabelRight={OverlayRight}
                OverlayLabelLeft={OverlayLeft}
                disableBottomSwipe={true}
                disableTopSwipe={true}
                cardStyle={styles.card}>
                <ScrollView showsVerticalScrollIndicator={false} style={{borderRadius: 22, height: screenHeight - 250}}>
                  {item}
                </ScrollView>
              </TinderCard>
            </View>
          );
        })}
        <SuperInvite isVisibleSuperInvite={isVisibleSuperInvite} onCloseSuperInvite={handleCloseSuperInvite} />
        <Match isVisibleMatch={isVisibleMatch} onCloseMatch={handleCloseMatch} name={nameUser} />
      </View>
    </SafeAreaView>
  );
};

export default gestureHandlerRootHOC(IO);
