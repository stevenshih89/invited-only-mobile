import React, {FC, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Tooltip, TooltipProps} from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//import components
import useStyles from 'screens/Auth/Payment/styles.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import Button from 'components/Button/Button.tsx';
import {profilePath, tutorialFlowPath} from 'constants/pathLocations.ts';
import {
  backgroundGradientColors,
  blackColor,
  lightGray2Color,
  lightGray4Color,
  lightGray5Color,
  transparentWhite40Color,
  whiteColor,
} from 'constants/colors.ts';

//import icons
import CheckIcon from 'assets/images/icons/check.svg';
import CalendarIcon from 'assets/images/icons/calendar-white.svg';
import IOIcon from 'assets/images/icons/io.svg';
import FlashIcon from 'assets/images/icons/flash-white.svg';
import Logo from 'assets/images/icons/logo.svg';
import EyeIcon from 'assets/images/icons/eye.svg';
import InfoCircleIcon from 'assets/images/icons/info-circle.svg';
import CloseCircleIcon from 'assets/images/icons/close-circle.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import UnlimitedIcon from 'assets/images/icons/unlimited-new.svg';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgProps} from 'react-native-svg';
import Purchases, {PurchasesPackage} from 'react-native-purchases';
import Loader from 'components/Modal/ModalLoader/Loader';
import HostPremium from 'components/Modal/ModalHostPremium/HostPremium';
import {useRoute} from '@react-navigation/native';
import {showToast} from 'helpers/showToast';
import {useSubscriptions} from 'src/store/subscriptionsStore';
import ModalUpgradeSuccessful from 'components/Modal/ModalUpgradeSuccessful/ModalUpgradeSuccessful';
import {getActiveSubscription, getSubscriptions} from 'src/api/purchase';
import getSymbolFromCurrency from 'currency-symbol-map';
import {openLink} from 'helpers/links';
import analytics from '@react-native-firebase/analytics';
import {paymentScreen} from 'constants/analitycs';
import Config from 'react-native-config';

interface PlanListItem {
  id: number;
  identifier?: string;
  title: string;
  duration: number;
  durationName: string;
  description: string;
  pricePerDuration: string;
  fullPrice?: string;
  weeksInPeriod: number;
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
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [spotsLeft, setSpotsLeft] = useState<number>(0);
  const minProgress = 10;
  const maxProgress = 300;

  const whatGet: WhatGetItem[] = [
    {
      title: 'Unlimited Events Creation',
      description: 'Share Unlimited VIP Tables and Events to Invite.',
      icon: CalendarIcon,
    },
    {
      title: 'Unlimited Invitations',
      description: 'Send Unlimited Invitations and Create Your Guest List',
      icon: UnlimitedIcon,
    },
    {
      title: 'Unlimited Guest Connections',
      description: 'Enjoy endless connections to build your guests lists.',
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
  ];

  const generateRandomProgress = () => {
    return Math.floor(Math.random() * (maxProgress - minProgress + 1)) + minProgress;
  };

  const [plansList, setPlansList] = useState<PlanListItem[]>([
    {
      id: 0,
      title: 'BILLED WEEKLY',
      duration: 1,
      durationName: 'week',
      description: 'Week',
      pricePerDuration: '$59/wk',
      fullPrice: '$59',
      weeksInPeriod: 1,
    },
    {
      id: 1,
      title: 'BILLED MONTHLY',
      duration: 1,
      durationName: 'month',
      description: 'Month',
      pricePerDuration: '$32/wk',
      fullPrice: '$129',
      weeksInPeriod: 4,
    },
    {
      id: 2,
      title: 'BILLED 3 MONTHS',
      duration: 3,
      durationName: 'months',
      description: 'Months',
      pricePerDuration: '$26/wk',
      fullPrice: '$349',
      weeksInPeriod: 13, // trust me this is true
    },
  ]);

  const [activePayment, setActivePayment] = useState<PlanListItem>(plansList[1]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [successfulPay, setSuccessfulPay] = useState(false);
  const [visibleHostPremium, setVsibleHostPremium] = useState(false);
  const [visibleUpgradeSuccessful, setVsibleUpgradeSuccessful] = useState(false);

  const currentSubscriptions = useSubscriptions((i: any) => i?.currentSubscriptions);
  const setCurrentSubscriptions = useSubscriptions((i: any) => i?.setCurrentSubscriptions);

  const updateUser = async (subscriptionId: string, expirationDate: string) => {
    const user = auth().currentUser;
    if (user) {
      try {
        await firestore().collection(apiUserInfoCollection).doc(user.uid).update({
          accountPremium: true,
          accountConfirmed: true,
          accountReviewed: true,
          activeSubscription: {
            subscriptionId,
            expirationDate,
          },
        });
      } catch (error: any) {
        console.log('error user premium update', error);
      }
    }
  };

  const handleNext = () => {
    navigation.navigate(tutorialFlowPath as never);
    navigation.navigate(profilePath as never);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpotsLeft(generateRandomProgress());
    }, 1000);
    analytics().logScreenView({
      screen_name: paymentScreen,
    });
    return () => clearTimeout(timer);
  }, []);

  const showHostPremium = async () => {
    setLoaderVisible(false);
    setTimeout(() => {
      setVsibleUpgradeSuccessful(true);
    }, 100);
    setTimeout(() => {
      setVsibleUpgradeSuccessful(false);
    }, 600);
    setTimeout(() => {
      setVsibleHostPremium(true);
    }, 1000);
  };

  const pay = async (pack: PurchasesPackage) => {
    setLoaderVisible(true);
    try {
      const {customerInfo} = await Purchases.purchasePackage(pack);

      const activeSubscription = await getActiveSubscription();
      console.warn('activeSubscription', activeSubscription);

      setCurrentSubscriptions(activeSubscription);

      setSuccessfulPay(true);
      setTimeout(() => {
        setLoaderVisible(false);
        showHostPremium();
      }, 1000);

      const subscriptionId = customerInfo.activeSubscriptions[0];
      const expirationDate = customerInfo.allExpirationDates[subscriptionId];

      updateUser(subscriptionId, expirationDate);
    } catch (e) {
      console.error('error pay', e);

      setLoaderVisible(false);
    }
  };

  const getOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
        const offeringsHostSubscription = offerings.all['Host subscription'];
        console.log('offeringsHostSubscription', offeringsHostSubscription);

        if (activePayment.durationName === 'week') {
          const product = offeringsHostSubscription.availablePackages[0];
          pay(product);
        }

        if (activePayment.durationName === 'month') {
          const product = offeringsHostSubscription.availablePackages[2];
          pay(product);
        }

        if (activePayment.durationName === 'months') {
          const product = offeringsHostSubscription.availablePackages[1];
          pay(product);
        }
      }
    } catch (e) {
      console.log('error', e);
    }
  };
  const getButtonDisabled = () => {
    return currentSubscriptions.activeSubscriptions.includes(activePayment.identifier);
  };

  const getButtonTitle = () => {
    const {duration, durationName, fullPrice, identifier} = activePayment;
    if (currentSubscriptions.activeSubscriptions.includes(identifier)) {
      return 'Current Plan';
    }

    const formattedPrice = fullPrice;
    return `Get ${duration} ${durationName} for ${formattedPrice}`;
  };

  console.warn(currentSubscriptions);

  const renderItem = ({item}: {item: PlanListItem}) => {
    let isRender = true;
    const formattedPrice = item.fullPrice;
    const isCurrentSubscription = currentSubscriptions.activeSubscriptions.includes(item.identifier);
    console.warn('isCurrentSubscription', isCurrentSubscription);
    console.warn('ac', currentSubscriptions.activeSubscriptions);

    // if (item.identifier === 'io_59_1w') {
    //   if (
    // currentSubscriptions.activeSubscriptions.includes('io_59_1w') ||
    // currentSubscriptions.activeSubscriptions.includes('io_29_3m') ||
    // currentSubscriptions.activeSubscriptions.includes('io_99_1m')
    //   ) {
    //     isRender = false;
    //   }
    // }

    // if (item.identifier === 'io_99_1m') {
    //   if (currentSubscriptions.activeSubscriptions.includes('io_99_1m') || currentSubscriptions.activeSubscriptions.includes('io_29_3m')) {
    //     isRender = false;
    //   }
    // }

    if (isRender) {
      let isActive = activePayment.id === item.id;

      if (currentSubscriptions.activeSubscriptions.length > 1) {
        isActive = true;
      }

      const colors = isActive ? ['#977B4A', '#E5D291', '#A28453'] : [lightGray2Color, lightGray2Color, lightGray2Color];

      return (
        <View style={{height: 200, flex: 1}}>
          {isCurrentSubscription && (
            <View style={{position: 'absolute', top: -26, width: '100%'}}>
              <Text style={{color: whiteColor, textAlign: 'center', fontSize: RFValue(16, 932), fontFamily: Satoshi700}}>Current Plan</Text>
            </View>
          )}
          <View style={{position: 'absolute', top: 0, right: 0, left: 0, zIndex: 10}}>
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
              <Text style={{fontFamily: Satoshi700, fontSize: RFValue(8, 812), color: whiteColor}}>{item.title}</Text>
            </View>
          </View>
          <TouchableOpacity
            key={item.id}
            disabled={isActive}
            style={{
              position: 'relative',
              marginTop: isActive ? 0 : 0,
              flex: 1,
              marginHorizontal: 3,
            }}
            activeOpacity={0.7}
            onPress={() => setActivePayment(item)}>
            <LinearGradient
              colors={isCurrentSubscription && isActive ? [whiteColor, whiteColor] : colors}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                marginTop: 10,
                borderRadius: 8,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: isActive ? whiteColor : 'transparent',
                width: '100%',
                height: 180,
                justifyContent: 'center',
                paddingTop: isActive ? 26 : 20,
                paddingBottom: isActive ? 34 : 20,
                paddingHorizontal: 6,
              }}>
              <Text
                style={{
                  fontFamily: Satoshi700,
                  fontSize: RFValue(24, 812),
                  color: isActive ? blackColor : whiteColor,
                  textAlign: 'center',
                }}>
                {item.duration}
              </Text>
              <Text
                style={{
                  fontFamily: Satoshi500,
                  fontSize: RFValue(12, 812),
                  color: isActive ? blackColor : whiteColor,
                  textAlign: 'center',
                  marginTop: 6,
                }}>
                {item.description}
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 0.5,
                  backgroundColor: isActive ? lightGray4Color : transparentWhite40Color,
                  marginVertical: 9,
                }}
              />
              <Text
                style={{
                  fontFamily: Satoshi700,
                  fontSize: RFValue(12, 812),
                  color: isActive ? blackColor : whiteColor,
                  textAlign: 'center',
                }}>
                {formattedPrice}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const checkNavig = useRoute();

  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    getSubscriptions().then(setSubscriptions);
  }, []);

  useEffect(() => {
    if (!subscriptions.length) {
      return;
    }

    const getIdentifier = (offer: any) => {
      let res;
      switch (offer.identifier) {
        case '$rc_weekly':
          res = 'io_59_1w';
          break;
        case '$rc_monthly':
          res = 'io_99_1m';
          break;
        case '$rc_three_month':
          res = 'io_29_3m';
          break;
        default:
          '';
      }
      return res;
    };

    const modifiedSubscriptions = [subscriptions[0], subscriptions[2], subscriptions[1]];

    const products = modifiedSubscriptions.map((offer, idx) => ({
      id: idx,
      identifier: getIdentifier(offer),
      title: plansList[idx].title,
      duration: plansList[idx].duration,
      durationName: plansList[idx].durationName,
      description: plansList[idx].description,
      pricePerDuration:
        getSymbolFromCurrency(offer.product.currencyCode) + (offer.product.price / plansList[idx].weeksInPeriod).toFixed(2) + '/wk',
      priceString: offer.product.priceString,
      fullPrice: offer.product.priceString,
      package: offer,
    }));
    setPlansList(products);
    setActivePayment(products[1]);
  }, [subscriptions]);

  const restorePurchases = async () => {
    try {
      const purchaserInfo = await Purchases.restorePurchases();

      console.warn(purchaserInfo);

      if (purchaserInfo.activeSubscriptions.length > 0) {
        switch (purchaserInfo.activeSubscriptions[0]) {
          case 'io_59_1w':
            showToast('inviteMatch', 'Weekly subscription restored', 'Restore purchases', {status: 'success'});

            setCurrentSubscriptions({activeSubscriptions: ['io_59_1w']});
            // navigation.navigate('/profile');
            break;
          case 'io_99_1m':
            showToast('inviteMatch', 'Month subscription restored', 'Restore purchases', {status: 'success'});
            setCurrentSubscriptions({activeSubscriptions: ['io_99_1m']});
            // navigation.navigate('/profile');
            break;
          case 'io_29_3m':
            showToast('inviteMatch', 'Monthly subscription restored', 'Restore purchases', {status: 'success'});
            setCurrentSubscriptions({activeSubscriptions: ['io_29_3m']});
            // navigation.navigate('/profile');
            break;
          default:
            break;
        }
        // console.log('purchases restore', purchaserInfo.activeSubscriptions[0]);
      } else {
        // console.log('purchases not found');
        showToast('inviteMatch', 'Active subscription not found', 'Restore purchases', {status: 'fail'});
      }
    } catch (e) {
      // console.error('error restore purchases', e);
    }
  };

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Loader isVisible={loaderVisible} successfulPay={successfulPay} />
        <ModalUpgradeSuccessful isVisible={visibleUpgradeSuccessful} />
        <HostPremium isVisible={visibleHostPremium} setVsibleHostPremium={setVsibleHostPremium} screen={checkNavig?.params?.screen} />
        <ScrollView>
          <View style={styles.container}>
            <View style={{alignItems: 'center', marginTop: 24}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 932)}}>Select a plan</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity activeOpacity={0.7} onPress={handleNext}>
                <CloseIcon width={25} height={25} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Logo />
              <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(46, 932), marginLeft: 14}}>Premium </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, flex: 1}}>
              {plansList.map(item => renderItem({item}))}
            </View>
            <Button
              buttonTitleStyle={{fontSize: RFValue(16, 812)}}
              buttonStyle={{marginTop: 20}}
              title={getButtonTitle()}
              onPress={getOfferings}
              disabled={getButtonDisabled()}
            />
            <TouchableOpacity
              onPress={restorePurchases}
              style={{
                marginTop: 12,
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 18,
                borderColor: whiteColor,
                height: 38,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: RFValue(16), color: whiteColor, fontFamily: Satoshi500}}>Restore purchases</Text>
            </TouchableOpacity>
            <View style={{marginTop: 12, alignItems: 'center'}}>
              <Text style={{fontFamily: Satoshi400, fontSize: RFValue(12, 812), color: whiteColor, textAlign: 'center'}}>
                By tapping, your App Store account will be charged. Your subscription will auto-renew for the same price and duration until
                you cancel via your App Store settings. You also agree to the Terms.
              </Text>
              <Text style={{fontFamily: Satoshi400, fontSize: RFValue(12, 812), color: whiteColor, textAlign: 'center'}}>
                More details can be found here:
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => openLink('https://www.invitedonly.app/privacy-policy')}>
                  <Text style={{fontFamily: Satoshi500, fontSize: RFValue(14, 812), color: whiteColor}}>Privacy Policy</Text>
                </TouchableOpacity>
                <Text style={{fontFamily: Satoshi400, fontSize: RFValue(12, 812), color: whiteColor, marginHorizontal: 5}}>and</Text>
                <TouchableOpacity onPress={() => openLink('https://www.invitedonly.app/terms-of-service-eula')}>
                  <Text style={{fontFamily: Satoshi500, fontSize: RFValue(14, 812), color: whiteColor}}>Terms and Conditions (EULA)</Text>
                </TouchableOpacity>
              </View>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Payment;
