import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FC, useEffect, useState} from 'react';
import {Tooltip, TooltipProps} from '@rneui/themed';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//import components
import useStyles from './styles';
import {Satoshi400, Satoshi500, Satoshi700Italic} from 'constants/fonts';
import {blackColor, lightGray5Color, transparentGray90Color, whiteColor} from 'constants/colors';
import {manageSubscriptionPath, paymentPath, superInvitePayPath} from 'constants/pathLocations';

//import images
import CheckIcon from 'assets/images/icons/check.svg';
import ArrowRightIcon from 'assets/images/icons/arrow-right-balck.svg';

import InfoCircleIcon from 'assets/images/icons/info-circle.svg';
import FlashIcon from 'assets/images/icons/flash-white.svg';
import FlashFillIcon from 'assets/images/icons/flash-filled.svg';
import CloseIcon from 'assets/images/icons/close-circle.svg';
import CalendarIcon from 'assets/images/icons/calendar-white.svg';
import UnlimitedIcon from 'assets/images/icons/unlimited-new.svg';
import IOIcon from 'assets/images/icons/io.svg';
import EyeIcon from 'assets/images/icons/eye.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import Loader from '../../../../../components/Modal/ModalLoader/Loader';
import {useSubscriptions} from 'src/store/subscriptionsStore';
import {SvgProps} from 'react-native-svg';
import {screenHeight} from 'constants/common';
import Config from 'react-native-config';
import {useUser} from 'src/store/userStore';
interface WhatGetItem {
  title: string;
  description: string;
  icon: React.FC<SvgProps>;
  titleDescription: string;
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

const MyPlan = () => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const [loaderVisible, setLoaderVisible] = useState(false);

  const {user: userInfo} = useUser();
  // const [userInfo, setUserInfo] = useState<any>({});

  const whatGet: WhatGetItem[] = [
    {
      title: `Unlimited Events ${userInfo?.accountType === 'host' ? 'Creation' : 'Attendance'}`,
      titleDescription: userInfo?.accountType === 'host' ? 'Unlimited Events Creation' : 'Unlimited swipe (join)',
      description:
        userInfo?.accountType === 'host'
          ? 'Share Unlimited VIP Tables and Events to Invite.'
          : 'Swipe through unlimited events and connections. Join now and explore endless possibilities!',
      icon: CalendarIcon,
    },
    {
      title: 'Unlimited Invitations',
      titleDescription: userInfo?.accountType === 'host' ? 'Unlimited Invitations' : 'Unlimited invitations (getting invites)',
      description:
        userInfo?.accountType === 'host'
          ? 'Send Unlimited Invitations and Create Your Guest List'
          : 'Receive endless event invitations. Join now and never miss out!',
      icon: UnlimitedIcon,
    },
    {
      title: `Unlimited ${userInfo?.accountType === 'host' ? 'Guest' : ''} Connections`,
      titleDescription: userInfo?.accountType === 'host' ? 'Unlimited Events Creation' : 'Unlimited join offers',
      description:
        userInfo?.accountType === 'host'
          ? 'Enjoy endless connections to build your guests lists.'
          : 'Get unlimited opportunities to join exclusive events. Let`s start right now!',
      icon: IOIcon,
    },
    {
      title: `5 Super ${userInfo?.accountType === 'host' ? 'Invites' : 'Join'} each week.`,
      titleDescription: userInfo?.accountType === 'host' ? 'Unlimited Events Creation' : '5 Super join a week',
      description: `Send 5 super ${userInfo?.accountType === 'host' ? 'Invites' : 'Join'} each week.`,
      icon: FlashIcon,
    },
    {
      title: `See Who Wants to ${userInfo?.accountType === 'host' ? 'Join' : 'Invite'} You`,
      titleDescription: userInfo?.accountType === 'host' ? 'Unlimited Events Creation' : 'Unlimited Events Join',
      description:
        userInfo?.accountType === 'host'
          ? 'View interested guests who want to join you in real-time.'
          : 'View interested hosts who want to invite you in real-time.',
      icon: EyeIcon,
    },
  ];

  const currentSubscriptions = useSubscriptions((i: any) => i?.currentSubscriptions);

  // const fetchUserInfo = async () => {
  //   // setLoaderVisible(true)
  //   const user = auth().currentUser;

  //   if (user) {
  //     try {
  //       const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(user.uid).get();
  //       if (userInfoDoc.exists) {
  //         setUserInfo(userInfoDoc.data());
  //       }
  //     } catch (error: any) {}
  //   }
  //   // setLoaderVisible(false)
  // };

  // useEffect(() => {
  //   fetchUserInfo();
  // }, []);

  const navigation = useAppNavigation();

  // const loaderVisibleFun = () => {
  //   setLoaderVisible(true);
  //   setTimeout(() => setLoaderVisible(false), 1000);
  // };

  // const goToManagePath = () => {
  //   navigation.navigate(manageSubscriptionPath as never);
  // };

  const goToPaymentPath = () => {
    navigation.navigate(paymentPath as never);
  };

  const styles = useStyles();

  const goToSuperInvitePay = () => {
    // @ts-ignore
    navigation.navigate(superInvitePayPath);
  };

  const getCurrentPlan = () => {
    const item = currentSubscriptions.activeSubscriptions.at(-1);
    let text = '';

    switch (item) {
      case 'io_59_1w':
        text = '1 week access';
        break;
      case 'io_29_3m':
        text = '3 month access';
        break;
      case 'io_99_1m':
        text = '1 month access';
        break;
      default:
        text = 'Basic';
        break;
    }

    return <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi400}}>{text}</Text>;
  };

  console.warn(userInfo?.superInvites, userInfo?.weeklySuperInvites);

  return (
    <View>
      <Loader isVisible={loaderVisible} successfulPay={false} textLoader={'Checking for available spots...'} />
      <View>
        <View
          style={{
            alignItems: 'center',
            padding: 24,
            backgroundColor: transparentGray90Color,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 18,
          }}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <FlashFillIcon width={18} height={18} />
            <Text style={{fontSize: RFValue(18, 812), marginLeft: 8, color: whiteColor, fontFamily: Satoshi700Italic}}>
              Super {userInfo?.accountType === 'host' ? 'Invite' : 'Join'}{' '}
              <Text style={{fontFamily: Satoshi400}}>({(userInfo?.superInvites || 0) + (userInfo?.weeklySuperInvites || 0)})</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={goToSuperInvitePay}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: whiteColor,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: RFValue(16, 812), marginRight: 4, fontFamily: Satoshi500, color: blackColor}}>Add more</Text>
            <ArrowRightIcon width={16} height={16} />
          </TouchableOpacity>
        </View>
        {userInfo?.accountType === 'host' && (
          <View style={{width: '100%'}}>
            <TouchableOpacity onPress={goToPaymentPath} style={{marginTop: 24, width: '100%'}}>
              <LinearGradient
                colors={['#977B4A', '#E5D291', '#A28453']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  height: screenHeight / 14,
                  maxHeight: 60,
                  borderRadius: 18,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text style={{fontSize: RFValue(18, 812), fontFamily: Satoshi500, marginRight: 4}}>Subscriptions</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {userInfo?.accountType === 'host' && (
        <View>
          <View style={styles.listColumnWrapper}>
            <Text style={styles.textWhatYouGet}>What you {userInfo?.accountType === 'host' ? 'get' : 'have'}:</Text>
            {userInfo?.accountType === 'host' && <Text style={styles.textPremium}>Premium</Text>}
          </View>
          {whatGet.map(item => (
            <View key={item.title} style={styles.itemInTheList}>
              <View style={styles.rowTextAndCheckCircleIcon}>
                <View style={styles.wrapperIcon}>
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
                        <Text style={styles.textUnlimitedEventsCreation}>{item.titleDescription}</Text>
                        <CloseIcon />
                      </View>
                      <Text style={styles.textHostAccessIsLimited}>{item.description}</Text>
                    </View>
                  }>
                  <InfoCircleIcon />
                </ControlledTooltip>
              </View>
              <CheckIcon />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default MyPlan;
