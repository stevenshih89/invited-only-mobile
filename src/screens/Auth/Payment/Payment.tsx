import React, {FC, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Tooltip, TooltipProps} from '@rneui/themed';

//import components
import useStyles from 'screens/Auth/Payment/styles.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import Button from 'components/Button/Button.tsx';
import {profilePath, tutorialFlowPath} from 'constants/pathLocations.ts';
import {
  backgroundColor,
  black1Color,
  blackColor,
  lightGray2Color,
  lightGray5Color,
  transparent60Color,
  transparentWhite56Color,
  whiteColor,
} from 'constants/colors.ts';

//import icons
import CheckIcon from 'assets/images/icons/check.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import UnlimitedIcon from 'assets/images/icons/unlimited.svg';
import IOIcon from 'assets/images/icons/io.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import EyeIcon from 'assets/images/icons/eye.svg';
import InfoCircleIcon from 'assets/images/icons/info-circle.svg';
import CloseCircleIcon from 'assets/images/icons/close-circle.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import Birthday from 'assets/images/icons/birthday.svg';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenWidth} from 'constants/common';
import * as Progress from 'react-native-progress';
import {SvgProps} from 'react-native-svg';

interface PlanListItem {
  id: number;
  title: string;
  duration: number;
  durationName: string;
  description: string;
  pricePerDuration: string;
  fullPrice?: string;
}

interface WhatGetItem {
  title: string;
  description: string;
  icon: React.FC<SvgProps>;
}

const ControlledTooltip: FC<TooltipProps | any> = props => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    />
  );
};

const Payment: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [spotsLeft, setSpotsLeft] = useState<number>(0);
  const minProgress = 10;
  const maxProgress = 300;

  const whatGet: WhatGetItem[] = [
    {
      title: 'Unlimited Events Creation',
      description: 'Creating extraordinary events tailored to your vision.',
      icon: CalendarIcon,
    },
    {
      title: 'Unlimited Invitations',
      description: 'Send Unlimited Invitations and Create Your Guest List',
      icon: UnlimitedIcon,
    },
    {
      title: 'Unlimited Swiped',
      description: 'Enjoy limitless swipes for endless connections.',
      icon: IOIcon,
    },
    {
      title: '5 Super invites a week',
      description: 'Send 5 super invites each week.',
      icon: FlashIcon,
    },
    {
      title: 'See who wants to join you',
      description: 'View interested guests who want to join you in real-time.',
      icon: EyeIcon,
    },
    {
      title: 'Guest Mode (Join events)',
      description: 'Join events anonymously using Guest Mode.',
      icon: Birthday,
    },
  ];

  const generateRandomProgress = () => {
    return Math.floor(Math.random() * (maxProgress - minProgress + 1)) + minProgress;
  };

  const [plansList] = useState<PlanListItem[]>([
    {
      id: 0,
      title: 'FOR TRAVELLERS',
      duration: 1,
      durationName: 'week',
      description: 'Week Access',
      pricePerDuration: '$59/wk',
      fullPrice: '59$',
    },
    {
      id: 2,
      title: 'SECURE YOUR SPOT',
      duration: 1,
      durationName: 'year',
      description: 'Year Access',
      pricePerDuration: '$25/wk',
      fullPrice: '1300$',
    },
    {
      id: 1,
      title: 'EARLY ACCESS',
      duration: 3,
      durationName: 'months',
      description: 'Months Access',
      pricePerDuration: '$29/wk',
      fullPrice: '357$',
    },
  ]);
  const [activePayment, setActivePayment] = useState<PlanListItem>(plansList[1]);

  const handleNext = () => {
    navigation.navigate(tutorialFlowPath as never);
  };

  const convertProgress = () => {
    return ((spotsLeft - minProgress) / (maxProgress - minProgress)) * (1 - 0) + 0;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpotsLeft(generateRandomProgress());
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderItem = ({item}: {item: PlanListItem}) => {
    const isActive = activePayment.id === item.id;

    const colors = isActive ? ['#977B4A', '#E5D291', '#A28453'] : [lightGray2Color, lightGray2Color, lightGray2Color];

    return (
      <TouchableOpacity
        key={item.id}
        disabled={isActive}
        style={{position: 'relative', marginTop: isActive ? 0 : 0}}
        activeOpacity={0.7}
        onPress={() => setActivePayment(item)}>
        {/* <View style={{position: 'absolute', top: 0, right: 0, left: 0, zIndex: 10}}>
          <View
            style={{
              alignSelf: 'center',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: whiteColor,
              borderRadius: 7,
              paddingHorizontal: 6,
              paddingVertical: 4,
              backgroundColor: blackColor,
            }}>
            <Text style={{fontFamily: Satoshi700, fontSize: RFValue(7, 812), color: whiteColor}}>{item.title}</Text>
          </View>
        </View> */}
        <LinearGradient
          colors={colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            marginTop: 10,
            borderRadius: 8,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: isActive ? whiteColor : 'transparent',
            width: screenWidth / 3 - 30,
            height: 180,
            justifyContent: 'center',
            paddingTop: isActive ? 26 : 20,
            paddingBottom: isActive ? 34 : 20,
            paddingHorizontal: 6,
          }}>
          <View style={{position: 'absolute', top: 10, right: 0, left: 0, zIndex: 10}}>
            <View
              style={{
                alignSelf: 'center',
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: whiteColor,
                borderRadius: 7,
                paddingHorizontal: 6,
                paddingVertical: 4,
                backgroundColor: blackColor,
              }}>
              <Text style={{fontFamily: Satoshi700, fontSize: RFValue(7, 812), color: whiteColor}}>{item.title}</Text>
            </View>
          </View>
          <Text
            style={{fontFamily: Satoshi700, fontSize: RFValue(22, 812), color: isActive ? blackColor : whiteColor, textAlign: 'center'}}>
            {item.duration}
          </Text>
          <Text
            style={{
              fontFamily: Satoshi500,
              fontSize: RFValue(11, 812),
              color: isActive ? blackColor : whiteColor,
              textAlign: 'center',
              marginTop: 6,
            }}>
            {item.description}
          </Text>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: isActive ? transparent60Color : transparentWhite56Color,
              marginVertical: 9,
            }}
          />
          <Text
            style={{fontFamily: Satoshi700, fontSize: RFValue(10, 812), color: isActive ? blackColor : whiteColor, textAlign: 'center'}}>
            {item.pricePerDuration}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: black1Color}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{alignItems: 'flex-end', marginTop: 10}}>
            <TouchableOpacity activeOpacity={0.7} onPress={handleNext}>
              <CloseIcon width={25} height={25} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textGetASpot}>Early Access</Text>
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: whiteColor,
              borderRadius: 15,
              paddingVertical: 16,
              paddingHorizontal: 20,
            }}>
            <Text style={{fontFamily: Satoshi700, fontSize: RFValue(18, 812), color: whiteColor, textAlign: 'center', marginBottom: 8}}>
              Host Premium
            </Text>
            <Text style={{fontFamily: Satoshi500, fontSize: RFValue(13, 812), color: whiteColor, textAlign: 'center'}}>
              Get Access & Unlock all of our features. Secure your spot. Host Access is limited.
            </Text>
            <View style={styles.buttonWrapper} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
            {plansList.map(item => renderItem({item}))}
          </View>
          <View style={{width: '100%', height: 20, marginTop: 30, position: 'relative', justifyContent: 'center'}}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10,
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: whiteColor,
                  borderRadius: 12,
                  backgroundColor: blackColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  paddingHorizontal: 10,
                }}>
                <Text style={{fontFamily: Satoshi700, fontSize: 9, color: whiteColor}}>{spotsLeft} SPOTS LEFT</Text>
              </View>
            </View>
            <Progress.Bar
              width={screenWidth - 48}
              progress={convertProgress()}
              color="#E5D291"
              unfilledColor={backgroundColor}
              borderColor={black1Color}
            />
          </View>
          <Button buttonStyle={{marginTop: 20}} title={'Get access'} />
          <View style={{marginTop: 8}}>
            <Text style={{fontFamily: Satoshi400, fontSize: RFValue(12, 812), color: whiteColor, textAlign: 'center'}}>
              By tapping Continue, your App Store will be charged, your subscription will auto-renew for the same price and package lenght
              untill you cancel via App Store settings, and you agree to your Terms
            </Text>
          </View>
          <View style={styles.listColumnWrapper}>
            <Text style={styles.textWhatYouGet}>What you get:</Text>
            <Text style={styles.textPremium}>Premium</Text>
          </View>
          <FlatList
            data={whatGet}
            renderItem={({item}) => {
              return (
                <View style={styles.itemInTheList}>
                  <View style={styles.rowTextAndCheckCircleIcon}>
                    <View
                      style={{
                        marginRight: 8,
                        borderRadius: 100,
                        backgroundColor: lightGray5Color,
                        width: 34,
                        height: 34,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <item.icon />
                    </View>
                    <Text style={styles.textFromTheList}>{item.title}</Text>
                    <ControlledTooltip
                      width={300}
                      height={100}
                      backgroundColor={lightGray5Color}
                      withOverlay={false}
                      popover={
                        <View style={styles.tooltipWrapper}>
                          <View style={styles.rowTitleTooltip}>
                            <Text style={styles.textUnlimitedEventsCreation}>{item.title}</Text>
                            <CloseCircleIcon />
                          </View>
                          <Text style={styles.textHostAccessIsLimited}>{item.description}</Text>
                        </View>
                      }>
                      <InfoCircleIcon />
                    </ControlledTooltip>
                  </View>
                  <CheckIcon />
                </View>
              );
            }}
          />
          {/* <View style={styles.itemInTheList}>
            <View style={styles.rowTextAndCheckCircleIcon}>
              <View
                style={{
                  marginRight: 8,
                  borderRadius: 100,
                  backgroundColor: lightGray5Color,
                  width: 34,
                  height: 34,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CalendarIcon />
              </View>
              <Text style={styles.textFromTheList}>Unlimited Events Creation</Text>
              <ControlledTooltip
                width={300}
                height={100}
                backgroundColor={lightGray5Color}
                withOverlay={false}
                popover={
                  <View style={styles.tooltipWrapper}>
                    <View style={styles.rowTitleTooltip}>
                      <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                      <CloseCircleIcon />
                    </View>
                    <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
                  </View>
                }
                >
                <InfoCircleIcon />
              </ControlledTooltip>
            </View>
            <CheckIcon />
          </View> */}
          {/* <View style={styles.itemInTheList}>
            <View style={styles.rowTextAndCheckCircleIcon}>
              <View
                style={{
                  marginRight: 8,
                  borderRadius: 100,
                  backgroundColor: lightGray5Color,
                  width: 34,
                  height: 34,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <UnlimitedIcon />
              </View>
              <Text style={styles.textFromTheList}>Unlimited Invitations</Text>
              <ControlledTooltip
                width={300}
                height={100}
                backgroundColor={lightGray5Color}
                withOverlay={false}
                popover={
                  <View style={styles.tooltipWrapper}>
                    <View style={styles.rowTitleTooltip}>
                      <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                      <CloseCircleIcon />
                    </View>
                    <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
                  </View>
                }>
                <InfoCircleIcon />
              </ControlledTooltip>
            </View>
            <CheckIcon />
          </View> */}
          {/* <View style={styles.itemInTheList}>
            <View style={styles.rowTextAndCheckCircleIcon}>
              <View
                style={{
                  marginRight: 8,
                  borderRadius: 100,
                  backgroundColor: lightGray5Color,
                  width: 34,
                  height: 34,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IOIcon />
              </View>
              <Text style={styles.textFromTheList}>Unlimited Likes</Text>
              <ControlledTooltip
                width={300}
                height={100}
                backgroundColor={lightGray5Color}
                withOverlay={false}
                popover={
                  <View style={styles.tooltipWrapper}>
                    <View style={styles.rowTitleTooltip}>
                      <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                      <CloseCircleIcon />
                    </View>
                    <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
                  </View>
                }>
                <InfoCircleIcon />
              </ControlledTooltip>
            </View>
            <CheckIcon />
          </View>
          <View style={styles.itemInTheList}>
            <View style={styles.rowTextAndCheckCircleIcon}>
              <View
                style={{
                  marginRight: 8,
                  borderRadius: 100,
                  backgroundColor: lightGray5Color,
                  width: 34,
                  height: 34,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FlashIcon width={18} />
              </View>
              <Text style={styles.textFromTheList}>5 Super invites a week</Text>
              <ControlledTooltip
                width={300}
                height={100}
                backgroundColor={lightGray5Color}
                withOverlay={false}
                popover={
                  <View style={styles.tooltipWrapper}>
                    <View style={styles.rowTitleTooltip}>
                      <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                      <CloseCircleIcon />
                    </View>
                    <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
                  </View>
                }>
                <InfoCircleIcon />
              </ControlledTooltip>
            </View>
            <CheckIcon />
          </View>
          <View style={styles.itemInTheList}>
            <View style={styles.rowTextAndCheckCircleIcon}>
              <View
                style={{
                  marginRight: 8,
                  borderRadius: 100,
                  backgroundColor: lightGray5Color,
                  width: 34,
                  height: 34,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <UnlimitedIcon />
              </View>
              <Text style={styles.textFromTheList}>Join events</Text>
              <ControlledTooltip
                width={300}
                height={100}
                backgroundColor={lightGray5Color}
                withOverlay={false}
                popover={
                  <View style={styles.tooltipWrapper}>
                    <View style={styles.rowTitleTooltip}>
                      <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                      <CloseCircleIcon />
                    </View>
                    <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
                  </View>
                }>
                <InfoCircleIcon />
              </ControlledTooltip>
            </View>
            <CheckIcon />
          </View>
          <View style={styles.itemInTheList}>
            <View style={styles.rowTextAndCheckCircleIcon}>
              <View
                style={{
                  marginRight: 8,
                  borderRadius: 100,
                  backgroundColor: lightGray5Color,
                  width: 34,
                  height: 34,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <EyeIcon />
              </View>
              <Text style={styles.textFromTheList}>See who wants to join you</Text>
              <ControlledTooltip
                width={300}
                height={100}
                backgroundColor={lightGray5Color}
                withOverlay={false}
                popover={
                  <View style={styles.tooltipWrapper}>
                    <View style={styles.rowTitleTooltip}>
                      <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                      <CloseCircleIcon />
                    </View>
                    <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
                  </View>
                }>
                <InfoCircleIcon />
              </ControlledTooltip>
            </View>
            <CheckIcon />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
