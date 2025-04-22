import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import FastImage from "react-native-fast-image";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import React, { memo, useMemo } from "react";
import { useUser } from "../../store/userStore";
import { User, UserInfo } from "../../types/userInfo.ts";
import useStyles from "./styles.ts";
import type { Photo } from "components/TouchingSlider/TouchingSlider.tsx";
import TouchingSlider from "components/TouchingSlider/TouchingSlider.tsx";
import TablerGenderIcon from "assets/images/icons/tabler_gender-bigender.svg";
import LocationIcon from "assets/images/icons/location.svg";
import HomeIcon from "assets/images/icons/home.svg";
import ArrowIcon from "assets/images/icons/arrow-3.svg";
import WineIcon from "assets/images/icons/milk.svg";
import SmokeIcon from "assets/images/icons/smoke.svg";
import { blackColor, transparentWhite16Color, transparentWhite56Color, whiteColor } from "constants/colors.ts";
import { screenHeight } from "constants/common.ts";
import CloseIcon from "assets/images/icons/close.svg";
import FlashIcon from "assets/images/icons/flash.svg";
import CheckIcon from "assets/images/icons/check.svg";
import { calculateAge } from "helpers/calculateAge.ts";

interface IDemoGuestCardProps {
  userInfo: UserInfo;
}
const DemoGuestCard = (props: IDemoGuestCardProps) => {
  const styles = useStyles();
  const {user} = useUser();

  const {userInfo} = props;
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
    location,
    online,
    placeName,
    joinEvents,
    photos,
    interests,
    smoke,
    accountPremium,
  } = userInfo;

  const girlPhotos: Photo[] = useMemo(
    () =>
      photos
        ?.filter((userPhotos: User.Photo) => userPhotos.image !== null)
        ?.map((image: User.Photo) => {
          return {
            url: image?.image ?? '',
          }
        }) ?? [],
    [photos],
  );

  const userInterests = interests?.map((i: User.Interests) => i?.title);
  const smoking = smoke?.title;

  // const findSuperJoin = getActualDataEvent?.requestsList.find((i: Event.User) => {
  //   if (uid === i.uid && i.superInvite) {
  //     return true;
  //   }
  // });

  const age: string = calculateAge(date);

  const rotation = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotation.value}deg`}],
      opacity: rotation.value >= 90 && rotation.value <= 270 ? 0 : 1,
    };
  });


  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotation.value}deg`}],
      opacity: rotation.value >= 90 && rotation.value <= 270 ? 1 : 0,
    };
  });

  return (
    <View style={styles.wrapperFakeCard}>
      <TouchingSlider
        name={name}
        age={age}
        homeAddress={homeAddress}
        isShowInvitesTooltip={false}
        isLocked={!user?.accountConfirmed}
        confirmedAccount={accountConfirmed}
        onReject={() => {
          // handleReject({ uid, id: item?.id, withSwipeAnimation: true });
        }}
        onInvite={() => {
          // handleInvite({ uid, id: item?.id, withSwipeAnimation: true });
        }}
        handleOpenSuperInvite={() => {
          // handleOpenSuperInvite(item, uid);
        }}
        photos={girlPhotos}
        accountType={accountType}
        isShowWantsJoin={false}
        isPremium={accountPremium}
        // activeEvent={}
        location={location}
        placeName={placeName}
        joinEvents={joinEvents}
        online={online}
        date={date}
        item={userInfo}
        userInfo={user}
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
        {!!userInterests?.length && (
          <View
            style={{
              borderTopWidth: 1,
              borderStyle: 'solid',
              borderTopColor: transparentWhite16Color,
              marginTop: screenHeight / 44,
              paddingTop: screenHeight / 44,
            }}>
            <Text style={styles.titleSection}>My interests</Text>
            <View style={styles.wrapperInterestsTags}>
              {userInterests.map((interest: string | null, idx: number) => (
                <View key={idx} style={styles.interestsTags}>
                  <Text style={styles.textTagsInterests}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        <View
          style={{
            borderTopWidth: 1,
            borderStyle: 'solid',
            borderTopColor: transparentWhite16Color,
            paddingTop: screenHeight / 34,
            marginTop: 10,
            marginBottom: screenHeight / 40,
          }}>
          <TouchableOpacity
            onPress={() => {
              // handleReport(uid, activeEvent);
            }}>
            <Text style={styles.textHideNadSendReport}>Block and Report</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperImageSectionFaceGirl}>
          {girlPhotos?.map((photo: string, photoIndex: number) => (
            <FastImage key={photoIndex} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />
          ))}
        </View>
        <View style={styles.wrapperButtonsFooter}>
          <TouchableOpacity onPress={() => {
            // handleReject({ uid, id: item?.id, withSwipeAnimation: true });
          }} style={styles.buttonCloseOrCheck}>
            <View
              style={{
                backgroundColor: transparentWhite56Color,
                width: '100%',
                height: '100%',
                borderRadius: 50,
                position: 'absolute',
                top: -1,
                left: -1,
              }}
            />
            <View
              style={{
                backgroundColor: transparentWhite56Color,
                width: '100%',
                height: '100%',
                borderRadius: 50,
                position: 'absolute',
                right: -1,
                bottom: -1,
              }}
            />
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: blackColor,
                borderRadius: 50,
                zIndex: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CloseIcon />
            </View>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={() => {
            // handleSuperInviteBottom(item, 400);
          }}>
            <View style={styles.buttonFlash}>
              <View
                style={{
                  backgroundColor: transparentWhite56Color,
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                  position: 'absolute',
                  top: -1,
                  left: -1,
                }}
              />
              <View
                style={{
                  backgroundColor: transparentWhite56Color,
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                  position: 'absolute',
                  right: -1,
                  bottom: -1,
                }}
              />
              <Animated.View
                style={[
                  {
                    width: '100%',
                    height: '100%',
                    backgroundColor: blackColor,
                    borderRadius: 50,
                    zIndex: 10,
                    justifyContent: 'center',
                    position: 'absolute',
                    alignItems: 'center',
                  },
                  frontAnimatedStyle,
                ]}>
                <FlashIcon />
              </Animated.View>
              <Animated.View
                style={[
                  {
                    width: '100%',
                    height: '100%',
                    backgroundColor: blackColor,
                    borderRadius: 50,
                    zIndex: 10,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  backAnimatedStyle,
                ]}>
                <Text style={{color: whiteColor, fontSize: 24, fontWeight: '500', transform: [{rotateY: '180deg'}]}}>
                  {/*{counterSuperInvites}*/}
                </Text>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={() => {
              // handleInvite({ uid: item?.uid, id: item?.id, withSwipeAnimation: true });
            }}
            style={styles.buttonCloseOrCheck}>
            <View
              style={{
                backgroundColor: transparentWhite56Color,
                width: '100%',
                height: '100%',
                borderRadius: 50,
                position: 'absolute',
                top: -1,
                left: -1,
              }}
            />
            <View
              style={{
                backgroundColor: transparentWhite56Color,
                width: '100%',
                height: '100%',
                borderRadius: 50,
                position: 'absolute',
                right: -1,
                bottom: -1,
              }}
            />
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: blackColor,
                borderRadius: 50,
                zIndex: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CheckIcon />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {
          // handleReport(uid, activeEvent);
        }}>
          <Text style={styles.textHideNadSendReport}>Block and Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(DemoGuestCard);
