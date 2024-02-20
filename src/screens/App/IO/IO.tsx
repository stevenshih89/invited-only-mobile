import {SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {TinderCard} from 'rn-tinder-card';

//import components
import useStyles from 'screens/App/IO/styles.ts';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';
import {screenHeight, screenWidth} from 'constants/common.ts';

//import images
import FakeGirlOne from 'assets/images/app/fake-girl-1.png';
import FakeGirlTwo from 'assets/images/app/fake-girl-2.png';
import FakeGirlThere from 'assets/images/app/fake-girl-3.png';
import FakeGirlFour from 'assets/images/app/fake-girl-4.png';

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
import Button from 'components/Button/Button.tsx';

const IO: FC = (): JSX.Element => {
  const styles = useStyles();

  const fakeGirlPhotos = [FakeGirlOne, FakeGirlTwo, FakeGirlThere];

  const data = [
    <>
      <View style={styles.wrapperCreateEventCard}>
        <Text style={styles.textYouNeedToCreate}>You need to create an event to start inviting</Text>
        <Text style={styles.textYouDontHaveAny}>You don't have any active event.</Text>
        <Button title="Create event" />
        <View style={styles.rowText}>
          <Text style={styles.textDontHaveAnEvent}>Don't have an event?</Text>
          <Text style={styles.textJoinOne}>Join one!</Text>
        </View>
      </View>
    </>,
    <>
      <View style={styles.wrapperFakeCard}>
        <TouchingSlider photos={fakeGirlPhotos} />
        <View style={styles.bioWrapper}>
          <Text style={styles.titleSection}>Bio</Text>
          <Text style={styles.textDescription}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
          </Text>
          <Text style={[styles.titleSection, styles.mt31]}>About me</Text>
          <View style={styles.wrapperTextTags}>
            <Text style={styles.textTagsAboutMe}>
              <PersonIcon />
              Guest
            </Text>
            <Text style={[styles.textTagsAboutMe, styles.ml18]}>
              <TablerGenderIcon /> Woman
            </Text>
            <Text style={[styles.textTagsAboutMe, styles.ml18]}>
              <LocationIcon /> Dubai
            </Text>
            <Text style={styles.textTagsAboutMe}>
              <HomeIcon /> Odessa
            </Text>
            <Text style={[styles.textTagsAboutMe, styles.ml18]}>
              <ArrowIcon /> 184 см
            </Text>
            <Text style={[styles.textTagsAboutMe, styles.ml18]}>
              <WineIcon /> Wine
            </Text>
            <Text style={[styles.textTagsAboutMe, {marginLeft: screenWidth / 33}]}>
              <SmokeIcon /> Yes
            </Text>
          </View>
          <Text style={[styles.titleSection, styles.mt31]}>Interests</Text>
          <View style={styles.wrapperInterestsTags}>
            <View style={styles.interestsTags}>
              <Text style={styles.textTagsInterests}>Business</Text>
            </View>
            <View style={styles.interestsTags}>
              <Text style={styles.textTagsInterests}>Traveling</Text>
            </View>
            <View style={styles.interestsTags}>
              <Text style={styles.textTagsInterests}>Clubs</Text>
            </View>
            <View style={styles.interestsTags}>
              <Text style={styles.textTagsInterests}>Yacht</Text>
            </View>
            <View style={styles.interestsTags}>
              <Text style={styles.textTagsInterests}>Luxury</Text>
            </View>
            <View style={styles.interestsTags}>
              <Text style={styles.textTagsInterests}>Fitness</Text>
            </View>
          </View>
          <View style={styles.wrapperImageSectionFaceGirl}>
            <Image style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={FakeGirlTwo} />
            <Image style={styles.imageFaceGirl} source={FakeGirlThere} />
            <Image style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={FakeGirlFour} />
          </View>
          <View style={styles.wrapperButtonsFooter}>
            <TouchableOpacity style={styles.buttonCloseOrCheck}>
              <CloseIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonFlash}>
              <FlashIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCloseOrCheck}>
              <CheckIcon />
            </TouchableOpacity>
          </View>
          <Text style={styles.textHideNadSendReport}>Hide and send report</Text>
        </View>
      </View>
    </>,
  ];

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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {data.map((item, index) => {
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
      </View>
    </SafeAreaView>
  );
};

export default gestureHandlerRootHOC(IO);
