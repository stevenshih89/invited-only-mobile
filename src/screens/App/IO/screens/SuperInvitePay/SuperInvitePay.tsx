import React, {FC, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenWidth} from 'constants/common';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//import components
import useStyles from 'screens/App/IO/screens/SuperInvitePay/styles';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import Button from 'components/Button/Button.tsx';
import {IOPath} from 'constants/pathLocations.ts';
import {
  black1Color,
  black2Color90,
  blackColor,
  lightGray2Color,
  transparent60Color,
  transparentWhite56Color,
  whiteColor,
} from 'constants/colors.ts';

//import icons
import LoaderIcon from 'assets/images/icons/loader.svg';
import FlashIcon from 'assets/images/icons/flash-filled.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import Purchases, {PurchasesPackage} from 'react-native-purchases';
import {showToast} from 'helpers/showToast';
import {getSuperInvites} from 'src/api/purchase';
import Config from 'react-native-config';

import getSymbolFromCurrency from 'currency-symbol-map';
import {useUser} from 'src/store/userStore';
import {getUserData} from 'helpers/getUserData';
import Animated, {cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import moment from 'moment';

interface PlanListItem {
  id: number;
  quantity: number;
  priceEach: number;
  priceString: string;
  save: number;
  package: PurchasesPackage;
}

const SuperInvitePay: FC = (): JSX.Element => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const styles = useStyles();
  const navigation = useAppNavigation();

  const [plansList, setPlansList] = useState<PlanListItem[]>([
    {
      id: 0,
      quantity: 30,
      priceEach: 2.67,
      save: 51,
    },
    {
      id: 1,
      quantity: 15,
      priceEach: 3.06,
      save: 43,
    },
    {
      id: 2,
      quantity: 5,
      priceEach: 5.18,
      save: 4,
    },
  ]);

  const user = useUser((i: any) => i?.user);
  const [loadingPurchasing, setLoadingPurchasing] = useState(false);
  const [loadingPurchaseList, setLoadingPurchaseList] = useState(true);
  const [purchaseListError, setPurchaseListError] = useState(false);
  const [activePayment, setActivePayment] = useState<PlanListItem>(plansList[1]);

  const rotationLoader = useSharedValue(0);

  const [userData, setUserData] = useState({});

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotationLoader.value}deg`}],
    };
  });

  useEffect(() => {
    if (loadingPurchaseList) {
      rotationLoader.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
      );
    }

    return () => {
      cancelAnimation(rotationLoader);
    };
  }, [rotationLoader, loadingPurchaseList]);

  const updateSuperInvites = async (superInvites: number, price: string) => {
    const user = auth().currentUser;

    if (user) {
      try {
        const {superInvites: superInvitesCurrent, weeklySuperInvites: weeklySuperInvitesCurrent} = userData;
        const {inAppPurchase} = userData;
        await firestore()
          .collection(apiUserInfoCollection)
          .doc(user.uid)
          .update({
            superInvites: firestore.FieldValue.increment(superInvites),
            inAppPurchase: [
              ...(inAppPurchase ?? []), 
              { number: superInvites, 
                purchaseDate: moment().format(), 
                price,
              }
            ]            
          });
        handleNext(superInvitesCurrent + weeklySuperInvitesCurrent + superInvites);
      } catch (error: any) {
        setLoadingPurchasing(false);
        showToast('inviteMatch', '', 'Failed to update super invites / joins');
        // console.log('error updateSuperInvites', error);
      }
    }
  };

  const fetchUserData = async () => {
    const currentUser = auth().currentUser;
    if (!currentUser?.uid) {
      return;
    }
    const userInfo = await getUserData(currentUser?.uid);
    setUserData(userInfo);
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  
  const handleNext = async (superInvites: number) => {
    navigation.navigate(IOPath as never);
    setLoadingPurchasing(false);
    showToast(
      'inviteMatch',
      `You have ${superInvites} super ${userData?.accountType === 'host' ? 'Invites' : 'Joins'}`,
      `Let's start ${userData?.accountType === 'host' ? 'invite' : 'join'}!`,
      {ownerPhoto: userData?.photos[0].image, status: 'SUCCESSFUL'},
    );
  };

  const handleCloseModal = () => {
    navigation.goBack();
  };

  const pay = async (pack: PurchasesPackage, superInvites: number, price: string) => {
    try {
      const {customerInfo} = await Purchases.purchasePackage(pack);
      updateSuperInvites(superInvites, price);
      // console.log('pay successful');
    } catch (e) {
      setLoadingPurchasing(false);
      showToast('inviteMatch', '', 'Failed to purchase');
      // console.log('pay error', e);
    }
  };

  const getOfferings = async () => {
    if (!userData?.uid) {
      setLoadingPurchasing(false);
      showToast('inviteMatch', '', "There's been an error");
      return;
    }
    setLoadingPurchasing(true);
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
        const offeringsHostSubscription = offerings.all['Super Invite'];

        if (activePayment.id === 0) {
          const product = offeringsHostSubscription.availablePackages[0];
          pay(product, 30, activePayment.priceString);
        }

        if (activePayment.id === 1) {
          const product = offeringsHostSubscription.availablePackages[1];
          pay(product, 15, activePayment.priceString);
        }

        if (activePayment.id === 2) {
          const product = offeringsHostSubscription.availablePackages[2];
          pay(product, 5, activePayment.priceString);
        }
      }
    } catch (e) {
      setLoadingPurchasing(false);
      showToast('inviteMatch', '', 'Failed to get offerings');
    }
  };

  const fetchSuperInvites = async () => {
    setLoadingPurchaseList(true);
    await getSuperInvites()
      .then(response => {
        if (response?.length) {
          const products = response.map((offer, idx) => ({
            id: idx,
            quantity: plansList[idx].quantity,
            priceEach: getSymbolFromCurrency(offer.product.currencyCode) + (offer.product.price / plansList[idx].quantity).toFixed(2),
            priceString: offer.product.priceString,
            save: plansList[idx].save,
            package: offer,
          }));
          setPlansList(products);
          setActivePayment(products[1]);
          setLoadingPurchaseList(false);
          setPurchaseListError(false);
        } else {
          setLoadingPurchaseList(false);
          setPurchaseListError(true);
          showToast('inviteMatch', '', "Can't find any purchase");
        }
      })
      .catch(() => {
        setLoadingPurchaseList(false);
        setPurchaseListError(true);
        showToast('inviteMatch', '', "Error: Can't find any purchase");
      });
  };

  useEffect(() => {
    fetchSuperInvites();
  }, [userData?.uid]);

  const renderItem = ({item}: {item: PlanListItem}) => {
    const isActive = activePayment.id === item.id;

    const colors = isActive ? ['#977B4A', '#E5D291', '#A28453'] : [lightGray2Color, lightGray2Color, lightGray2Color];

    return (
      <TouchableOpacity
        key={item.id}
        disabled={isActive}
        style={{position: 'relative'}}
        activeOpacity={0.7}
        onPress={() => setActivePayment(item)}>
        {!item.id && (
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
              <Text style={{fontFamily: Satoshi700, fontSize: RFValue(7, 812), color: whiteColor}}>POPULAR</Text>
            </View>
          </View>
        )}
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
          <View style={{position: 'absolute', top: 10, right: 0, left: 0, zIndex: 10}} />
          <Text
            style={{fontFamily: Satoshi700, fontSize: RFValue(26, 812), color: isActive ? blackColor : whiteColor, textAlign: 'center'}}>
            {item.quantity}
          </Text>
          <Text
            style={{
              fontFamily: Satoshi500,
              fontSize: RFValue(14, 812),
              color: isActive ? blackColor : whiteColor,
              textAlign: 'center',
              marginTop: 6,
            }}>
            Super {user?.accountType === 'host' ? 'Invites' : 'Joins'}
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
            style={{fontFamily: Satoshi500, fontSize: RFValue(16, 812), color: isActive ? blackColor : whiteColor, textAlign: 'center'}}>
            {item.priceEach} each
          </Text>
          <View
            style={{
              backgroundColor: whiteColor,
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: 2,
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <Text style={{color: blackColor, fontSize: RFValue(14, 812)}}>Save {item.save}%</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  if (loadingPurchaseList) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor}}>
        <Animated.View style={[animatedStyle]}>
          <LoaderIcon />
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: black1Color, flex: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        <View style={{alignItems: 'flex-end', marginTop: 10}}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              marginBottom: 22,
              width: 45,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: black2Color90,
              borderRadius: 25,
            }}
            onPress={handleCloseModal}>
            <CloseIcon width={25} height={25} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: black2Color90,
            paddingVertical: 20,
            paddingHorizontal: 14,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: lightGray2Color,
          }}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <FlashIcon width={45} height={45} />
          </View>
          <Text style={styles.textGetASpot}>Super {user?.accountType === 'host' ? 'Invite' : 'Join'}</Text>
          <View
            style={{
              paddingVertical: 16,
              paddingHorizontal: 20,
            }}>
            <Text style={{fontFamily: Satoshi500, fontSize: RFValue(16, 812), color: whiteColor, textAlign: 'center'}}>
              A <Text style={{fontWeight: 'bold'}}>Super {user?.accountType === 'host' ? 'Invite' : 'Join'}</Text> increases your chances of
              getting your guest by x4!
            </Text>
            <View style={styles.buttonWrapper} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
            {!purchaseListError && plansList.map(item => renderItem({item}))}
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
              }}
            />
          </View>
          <Button
            loading={loadingPurchasing}
            disabled={purchaseListError}
            buttonStyle={{marginTop: 20}}
            title={
              purchaseListError
                ? "Can't find any purchase"
                : `Get ${activePayment.quantity} super ${user?.accountType === 'host' ? 'invites' : 'joins'} for ${
                    activePayment.priceString
                  }`
            }
            onPress={getOfferings}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuperInvitePay;
