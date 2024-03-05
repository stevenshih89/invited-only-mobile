import React from 'react';
import {View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity} from 'react-native';
import {TinderCard} from 'rn-tinder-card';

//import components
import useStyles from 'screens/App/IO/screens/JoinEvents/styles.ts';
import {screenHeight} from 'constants/common.ts';
import Button from 'components/Button/Button.tsx';
import {eventCreatingStackPath, userProfilePath} from 'constants/pathLocations.ts';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';

//import icons
import ArrowRightIcon from 'assets/images/icons/arrow-right.svg';
import PersonIcon from 'assets/images/icons/person.svg';
import PeopleIcon from 'assets/images/icons/profile-2user.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ClockIcon from 'assets/images/icons/clock-white.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import MapIcon from 'assets/images/icons/location.svg';

//import images
import FakePhoto from 'assets/images/app/fake-photo.png';
import ImageBg from 'assets/images/app/join-event-bg.png';

const JoinEvents = ({navigation}: any) => {
  const styles = useStyles();

  const fakePhotos = [FakePhoto, FakePhoto, FakePhoto];

  const data = [
    <>
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
      </View>
    </>,
    <>
      <View style={styles.wrapperFakeCard}>
        <TouchingSlider
          isShowEventPreview={true}
          isShowWantsJoin={false}
          isShowInvitesTooltip={false}
          isShowCardButtons={false}
          photos={fakePhotos}
        />

        <View style={styles.bioWrapper}>
          <Text style={styles.titleSection}>Event Details</Text>
          <Text style={styles.subTitle}>Place name</Text>
          <Text style={styles.textUnderSubTitle}>Nammos Dubai</Text>
          <Text style={[styles.subTitle, {marginTop: 20}]}>Event name</Text>
          <Text style={styles.textUnderSubTitle}>Dubai state</Text>
          <Text style={[styles.subTitle, {marginTop: 20}]}>Event description</Text>
          <Text style={styles.textDescription}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
          </Text>
          <View style={{marginTop: 28}}>
            <View style={styles.fdrAlc}>
              <CalendarIcon width={16} height={16} />
              <Text style={styles.textInfo}>12.11.2023</Text>
            </View>
            <View style={styles.fdrAlc}>
              <ClockIcon width={16} height={16} />
              <Text style={styles.textInfo}>12.11.2023</Text>
            </View>
            <View style={styles.fdrAlc}>
              <MapIcon width={16} height={16} />
              <Text style={styles.textInfo}>34 NE 11th St, Miami, FL 33132, EE, UU</Text>
            </View>
            <View style={styles.fdrAlc}>
              <PeopleIcon width={16} height={16} />
              <Text style={styles.textInfo}>2x girl</Text>
            </View>
          </View>
          <Image source={ImageBg} style={[styles.imageBg, {marginTop: 8}]} />
          <Image source={ImageBg} style={styles.imageBg} />

          <Text style={styles.titleSection}>Already joined</Text>
          <View>
            <View style={styles.wrapperNumberPeople}>
              <Text style={styles.textUnderSubTitle}>Female</Text>
              <View style={styles.rowNumberPeople}>
                <Text style={styles.textNumberInvitedPeople}>4</Text>
              </View>
            </View>
            <View style={styles.rowPersonIcon}>
              <View style={styles.wrapperPersonIcon}>
                <PersonIcon width={18} height={18} />
              </View>
              <View style={[styles.wrapperPersonIcon, {marginLeft: 10}]}>
                <PersonIcon width={18} height={18} />
              </View>
              <View style={[styles.wrapperPersonIcon, {marginLeft: 10}]}>
                <PersonIcon width={18} height={18} />
              </View>
              <View style={[styles.wrapperPersonIcon, {marginLeft: 10}]}>
                <PersonIcon width={18} height={18} />
              </View>
            </View>
          </View>
          <View>
            <View style={[styles.wrapperNumberPeople, {marginTop: 12}]}>
              <Text style={styles.textUnderSubTitle}>Male</Text>
              <View style={styles.rowNumberPeople}>
                <Text style={styles.textNumberInvitedPeople}>2</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 12, marginBottom: 28}}>
              <View style={styles.wrapperPersonIcon}>
                <PersonIcon width={18} height={18} />
              </View>
              <View style={[styles.wrapperPersonIcon, {marginLeft: 10}]}>
                <PersonIcon width={18} height={18} />
              </View>
            </View>
          </View>
          <Text style={styles.titleSection}>Host profile</Text>
          <View style={styles.wrapperHostProfile}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={FakePhoto} style={{width: 40, height: 40, borderRadius: 50}} />
                <View style={styles.greenCircle} />
              </View>
              <View style={{marginLeft: 13}}>
                <Text style={styles.textSimon}>Simon</Text>
                <Text style={styles.textOnline}>Online</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(userProfilePath)}>
              <Text style={styles.textSeeProfile}>
                See profile <ArrowRightIcon width={14} height={14} />
              </Text>
            </TouchableOpacity>
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
          <Text style={styles.textHideNadSendReport}>Reject and send report</Text>
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
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
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
      </SafeAreaView>
    </View>
  );
};

export default JoinEvents;
