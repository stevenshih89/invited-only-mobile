import {grayColor, lightGray5Color, lightGray6Color, lightRedColor, toggleColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import AEFlag from 'assets/images/flags/ae.svg';
import TrashCan from 'assets/images/icons/trash.svg';
import InstagramIcon from 'assets/images/auth/instagram.svg';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {Switch} from '@ant-design/react-native';
import {useState} from 'react';
import ModalDeleteMyAccount from './ModalDeleteMyAccount';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {phoneChangePath} from 'constants/pathLocations';

const AccountSetting = () => {
  const [isChechked, setIsChechked] = useState(false);
  const [isConnectedInstagram, setIsConnectedInstagram] = useState(false);
  const [isVisibleDeleteAccountModal, setIsVisibleDeleteAccountModal] = useState(false);

  const navigation = useAppNavigation();

  const isPremium = false;

  return (
    <>
      <View style={{backgroundColor: lightGray6Color, flex: 1, paddingHorizontal: 20}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 34, paddingBottom: 50}}
          style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
          <View style={{padding: 20, borderRadius: 10, backgroundColor: lightGray5Color}}>
            <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Phone number</Text>
            <View style={{marginTop: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AEFlag />
                <Text style={{color: whiteColor, fontSize: RFValue(15, 812), fontFamily: Satoshi700, marginLeft: 4}}>
                  +971<Text style={{color: whiteColor, fontSize: RFValue(15, 812), fontFamily: Satoshi400}}> 011 417 757 21</Text>
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate(phoneChangePath as never)}
                style={{flexDirection: 'row', alignItems: 'center'}}
                hitSlop={{top: 20, left: 10, right: 10, bottom: 10}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>Change</Text>
                <ArrowRight width={14} height={14} />
              </TouchableOpacity>
            </View>
          </View>
          {isPremium && (
            <View
              style={{
                borderRadius: 10,
                backgroundColor: lightGray5Color,
                padding: 20,
                marginTop: 24,
              }}>
              <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginBottom: 26}}>Subscription manage</Text>
              <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{color: whiteColor}}>Change payment method</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: whiteColor, marginRight: 10, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>*8844</Text>
                  <ArrowRight width={14} height={14} />
                </View>
              </TouchableOpacity>
              <View style={{height: 1, backgroundColor: transparentWhite16Color, marginVertical: 14}} />
              <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{color: whiteColor, marginRight: 10, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>Change payment method</Text>
                <ArrowRight width={14} height={14} />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              borderRadius: 10,
              backgroundColor: lightGray5Color,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 24,
            }}>
            <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Location</Text>
            <Switch trackColor={{false: grayColor, true: toggleColor}} checked={isChechked} onChange={val => setIsChechked(val)} />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsConnectedInstagram(prev => !prev)}
            style={{
              width: '100%',
              backgroundColor: lightGray5Color,
              borderRadius: 10,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 24,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <InstagramIcon width={28} height={28} />
              <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi400, marginLeft: 6}}>
                {isConnectedInstagram ? 'john.doe' : 'Connect Instagram'}
              </Text>
            </View>
            <Text style={{color: isConnectedInstagram ? lightRedColor : whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi700}}>
              {isConnectedInstagram ? 'Disconnect' : 'Connect'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsVisibleDeleteAccountModal(true)}
            style={{flexDirection: 'row', alignItems: 'center', borderRadius: 10, backgroundColor: lightGray5Color, padding: 20, marginTop: 24}}>
            <TrashCan />
            <Text style={{color: whiteColor, marginLeft: 10, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Delete my account</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ModalDeleteMyAccount isVisible={isVisibleDeleteAccountModal} onClose={() => setIsVisibleDeleteAccountModal(false)} />
    </>
  );
};

export default AccountSetting;
