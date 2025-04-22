import React from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import useStyles from '../styles.ts';
import * as S from '../IO.style.deprecated.ts';
import {screenHeight} from 'constants/common.ts';
import {calculateAge} from 'helpers/calculateAge';
import CloseIcon from 'assets/images/icons/close.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import TablerGenderIcon from 'assets/images/icons/tabler_gender-bigender.svg';
import LocationIcon from 'assets/images/icons/location.svg';
import HomeIcon from 'assets/images/icons/home.svg';
import ArrowIcon from 'assets/images/icons/arrow-3.svg';
import WineIcon from 'assets/images/icons/milk.svg';
import SmokeIcon from 'assets/images/icons/smoke.svg';
import {User} from 'src/types/userInfo';

interface HostCardContentProps {
  item: any;
  userInfo: any;
  isDemo: boolean;
  activeEvent: any;
  handleDemoSwipeCardLeft: (params: {uid: string; withSwipeAnimation: boolean}) => void;
  handleDemoSwipeCardRight: (params: {uid: string; withSwipeAnimation: boolean}) => void;
  handleReject: (params: {uid: string; id: string; withSwipeAnimation: boolean}) => void;
  handleInvite: (params: {uid: string; id: string; withSwipeAnimation: boolean}) => void;
  handleReport: (uid: string, eventId: string) => void;
  handleSuperInviteBottom: (item: any, coinAnimationTimer: number) => void;
  handleOpenSuperInvite: (item: any, uid: string) => void;
  frontAnimatedStyle: any;
  backAnimatedStyle: any;
  counterSuperInvites: number;
  setScrollPosition: (position: number) => void;
}

const HostCardContent: React.FC<HostCardContentProps> = ({
  item,
  userInfo,
  isDemo,
  activeEvent,
  handleDemoSwipeCardLeft,
  handleDemoSwipeCardRight,
  handleReject,
  handleInvite,
  handleReport,
  handleSuperInviteBottom,
  handleOpenSuperInvite,
  frontAnimatedStyle,
  backAnimatedStyle,
  counterSuperInvites,
  setScrollPosition,
}) => {
  const styles = useStyles();

  const handleScroll = (event: any) => {
    const positionY = event.nativeEvent.contentOffset.y;
    setScrollPosition(positionY);
  };

  const {
    name,
    bio,
    accountType,
    gender,
    address,
    homeAddress,
    height,
    alcohol,
    date,
    accountConfirmed,
    uid,
    accountPremium,
    isSuperInvite,
  } = item;

  const girlPhotos: string[] = item?.photos
    ?.filter((userPhotos: User.Photo) => userPhotos.image !== null)
    .map((image: User.Photo) => `${image?.image}`);

  const interests = item?.interests?.map((i: User.Interests) => i?.title);
  const smoking = item?.smoke?.title;

  const age: string = calculateAge(date);

  return (
    <View style={styles.wrapperFakeCard}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={20}
        showsVerticalScrollIndicator={false}
        style={{borderRadius: 22, height: screenHeight - 250}}>
        <TouchingSlider
          name={name}
          age={age}
          homeAddress={homeAddress}
          isShowInvitesTooltip={false}
          isLocked={!userInfo?.accountConfirmed}
          confirmedAccount={accountConfirmed}
          onReject={() =>
            isDemo ? handleDemoSwipeCardLeft({uid, withSwipeAnimation: true}) : handleReject({uid, id: item?.id, withSwipeAnimation: true})
          }
          onInvite={() =>
            isDemo ? handleDemoSwipeCardRight({uid, withSwipeAnimation: true}) : handleInvite({uid, id: item?.id, withSwipeAnimation: true})
          }
          handleOpenSuperInvite={() =>
            isDemo ? handleDemoSwipeCardRight({uid, withSwipeAnimation: true}) : handleOpenSuperInvite(item, uid)
          }
          photos={girlPhotos}
          accountType={accountType}
          isShowWantsJoin={isSuperInvite}
          isPremium={accountPremium}
          activeEvent={activeEvent}
          location={item.location}
          joinEvents={item.joinEvents}
          online={item.online}
          date={item.date}
          item={item}
          userInfo={userInfo}
          isPreview={false}
        />
        <View style={styles.bioWrapper}>
          <Text style={[styles.titleSection, bio ? styles.mt31 : {}]}>My basics</Text>
          <View style={styles.wrapperTextTags}>
            {gender && (
              <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                <View style={{marginRight: 4}}>
                  <TablerGenderIcon />
                </View>
                {gender}
              </Text>
            )}
            {address && (
              <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                <View style={{marginRight: 4}}>
                  <LocationIcon />
                </View>
                {address}
              </Text>
            )}
            {homeAddress && (
              <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                <View style={{marginRight: 4}}>
                  <HomeIcon />
                </View>
                {homeAddress}
              </Text>
            )}
            {height && (
              <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                <View style={{marginRight: 4}}>
                  <ArrowIcon />
                </View>
                {height} см
              </Text>
            )}
            {alcohol && (
              <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                <View style={{marginRight: 4}}>
                  <WineIcon />
                </View>
                {alcohol}
              </Text>
            )}
            {smoking && (
              <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                <View style={{marginRight: 4}}>
                  <SmokeIcon />
                </View>
                {smoking}
              </Text>
            )}
          </View>
          {bio && (
            <>
              <Text style={[styles.titleSection, styles.mt31]}>About me</Text>
              <Text style={styles.textDescription}>{bio}</Text>
            </>
          )}
          {!!interests?.length && (
            <S.InterestsContainer>
              <Text style={styles.titleSection}>My interests</Text>
              <View style={styles.wrapperInterestsTags}>
                {interests.map((interest: string | null, idx: number) => (
                  <View key={idx} style={styles.interestsTags}>
                    <Text style={styles.textTagsInterests}>{interest}</Text>
                  </View>
                ))}
              </View>
            </S.InterestsContainer>
          )}
          {!isDemo && (
            <S.DemoReportContainer>
              <TouchableOpacity
                onPress={() => {
                  handleReport(uid || '', activeEvent || '');
                }}>
                <Text style={styles.textHideNadSendReport}>Block and Report</Text>
              </TouchableOpacity>
            </S.DemoReportContainer>
          )}
          <View style={styles.wrapperImageSectionFaceGirl}>
            {girlPhotos?.map((photo: string, photoIndex: number) => (
              <FastImage key={photoIndex} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />
            ))}
          </View>
          <View style={styles.wrapperButtonsFooter}>
            <TouchableOpacity
              testID="bottom-reject"
              onPress={() =>
                isDemo
                  ? handleDemoSwipeCardLeft({uid: uid || '', withSwipeAnimation: true})
                  : handleReject({uid: uid || '', id: item?.id || '', withSwipeAnimation: true})
              }
              style={styles.buttonCloseOrCheck}>
              <S.BorderButton
                style={{
                  top: -1,
                  left: -1,
                }}
              />
              <S.BorderButton
                style={{
                  right: -1,
                  bottom: -1,
                }}
              />
              <S.ButtonBottom>
                <CloseIcon />
              </S.ButtonBottom>
            </TouchableOpacity>
            <TouchableWithoutFeedback
              testID="bottom-super-invite"
              onPress={() =>
                isDemo ? handleDemoSwipeCardLeft({uid: uid || '', withSwipeAnimation: true}) : handleSuperInviteBottom(item, 400)
              }>
              <View style={styles.buttonFlash}>
                <S.BorderButton
                  style={{
                    top: -1,
                    left: -1,
                  }}
                />
                <S.BorderButton
                  style={{
                    right: -1,
                    bottom: -1,
                  }}
                />
                <S.AnimatedContainer style={frontAnimatedStyle}>
                  <FlashIcon />
                </S.AnimatedContainer>
                <S.AnimatedContainer style={backAnimatedStyle}>
                  <S.CounterSuperJoinInvite>{counterSuperInvites}</S.CounterSuperJoinInvite>
                </S.AnimatedContainer>
              </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
              testID="bottom-invite"
              onPress={() =>
                isDemo
                  ? handleDemoSwipeCardRight({uid, withSwipeAnimation: true})
                  : handleInvite({uid: item?.uid, id: item?.id, withSwipeAnimation: true})
              }
              style={styles.buttonCloseOrCheck}>
              <S.BorderButton
                style={{
                  top: -1,
                  left: -1,
                }}
              />
              <S.BorderButton
                style={{
                  right: -1,
                  bottom: -1,
                }}
              />
              <S.ButtonBottom>
                <CheckIcon />
              </S.ButtonBottom>
            </TouchableOpacity>
          </View>
          {!isDemo && (
            <TouchableOpacity onPress={() => handleReport(uid, activeEvent)}>
              <Text style={styles.textHideNadSendReport}>Block and Report</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HostCardContent;
