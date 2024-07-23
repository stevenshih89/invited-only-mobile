import React, {FC, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenWidth} from 'constants/common';

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
import FlashIcon from 'assets/images/icons/flash-filled.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

interface PlanListItem {
  id: number;
  quantity: number;
  priceEach: number
  save: number
}

const SuperInvitePay: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();

  const [plansList] = useState<PlanListItem[]>([
    {
        id: 0,
        quantity: 30,
        priceEach: 2.67,
        save: 51
    },
    {
        id: 1,
        quantity: 15,
        priceEach: 3.06,
        save: 43
    },
    {
        id: 2,
        quantity: 5,
        priceEach: 5.18,
        save: 4
    },
  ]);
  const [activePayment, setActivePayment] = useState<PlanListItem>(plansList[1]);  

  const handleNext = () => {
    navigation.navigate(IOPath as never);
  };

  const pay = async (pack: PurchasesPackage) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pack);
      console.log('pay successful');
      // if (
      //   typeof customerInfo.entitlements.active["my_entitlement_identifier"] !==
      //   "undefined"
      // ) {
      //   console.log('pay successful');
      // }
    } catch (e) {
      console.log('pay error', e);
    }
  }

  const getOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {  

        const offeringsHostSubscription = offerings.all['Super Invite']
        console.log('offerings', offeringsHostSubscription.availablePackages);
        
        if(activePayment.id === 0) {
          const product = offeringsHostSubscription.availablePackages[0]   
          pay(product)
        }

        if(activePayment.id === 1) {
          const product = offeringsHostSubscription.availablePackages[1]
          pay(product)
        }

        if(activePayment.id === 2) {
          const product = offeringsHostSubscription.availablePackages[2]
          pay(product)
        }
      }
    } catch (e) {
      console.log('offering ger error', e);
      
    }
  }

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
        {!item.id && <View style={{position: 'absolute', top: 0, right: 0, left: 0, zIndex: 10}}>
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
        </View>}
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
          {/* <View
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
          </View> */}
        </View>
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
            Super Invites
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
            ${item.priceEach} each
          </Text>
          <View style={{backgroundColor: whiteColor, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 2, alignSelf: 'center', marginTop: 10}}>
            <Text style={{color: blackColor, fontSize: RFValue(14, 812)}}>
             Save {item.save}%
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: black1Color, flex: 1, justifyContent: 'center'}}>
        <View style={styles.container}>
        <View style={{alignItems: 'flex-end', marginTop: 10}}>
            <TouchableOpacity activeOpacity={0.7} style={{marginBottom: 22, width: 45, height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: black2Color90, borderRadius: 25}} onPress={handleNext}>
              <CloseIcon width={25} height={25} />
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: black2Color90, paddingVertical: 20, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: lightGray2Color}}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <FlashIcon width={45} height={45}/>
          </View>
          <Text style={styles.textGetASpot}>Super invite</Text>
          <View
            style={{
              paddingVertical: 16,
              paddingHorizontal: 20,
            }}>
            <Text style={{fontFamily: Satoshi500, fontSize: RFValue(16, 812), color: whiteColor, textAlign: 'center'}}>
            A <Text style={{fontWeight: 'bold'}}>Super Invite</Text> increases your chances of getting your guest by x4!
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
            </View>
          </View>
          <Button buttonStyle={{marginTop: 20}} title={`Get ${activePayment.quantity} super invites for $${activePayment.priceEach * activePayment.quantity}9`} onPress={getOfferings}/>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default SuperInvitePay;
