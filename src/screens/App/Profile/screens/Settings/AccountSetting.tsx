import {blackColor, deleteColor, lightGray5Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import TrashRed from 'assets/images/icons/trash-red.svg';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {FC, useEffect, useState} from 'react';
import ModalDeleteMyAccount from './ModalDeleteMyAccount';
import {phoneChangePath, emailChangePath} from 'constants/pathLocations';
import ModalConfirmPhone from './ModalConfirmPhone';
import {useAccountSetting} from 'hooks/useAccountSetting';

const AccountSetting: FC = ({navigation, route}: any) => {
  const {
    userPhone,
    user,
    isPremium,
    setIsVisibleDeleteAccountModal,
    isVisibleDeleteAccountModal,
    setIsVisibleConfirmPhoneModal,
    sendVerificationCode,
    isVisibleConfirmPhoneModal,
    verificationId,
  } = useAccountSetting(route);

  return (
    <>
      <View style={{backgroundColor: blackColor, flex: 1, paddingHorizontal: 20}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 34, paddingBottom: 50}}
          style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
          <View style={{padding: 20, borderRadius: 10, backgroundColor: lightGray5Color}}>
            <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Phone number</Text>
            <View style={{marginTop: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/*<AEFlag />*/}
                <Text style={{color: whiteColor, fontSize: RFValue(15, 812), fontFamily: Satoshi700, marginLeft: 4}}>
                  {userPhone?.slice(0, 4)}
                  <Text style={{color: whiteColor, fontSize: RFValue(15, 812), fontFamily: Satoshi400}}>
                    {' '}
                    {userPhone?.slice(4, userPhone.length)}
                  </Text>
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
          <View style={{padding: 20, borderRadius: 10, backgroundColor: lightGray5Color, marginTop: 24}}>
            <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Email</Text>
            <View style={{marginTop: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/*<AEFlag />*/}
                <Text
                  numberOfLines={1}
                  style={{
                    color: whiteColor,
                    maxWidth: '90%',
                    overflow: 'hidden',
                    fontSize: RFValue(15, 812),
                    fontFamily: Satoshi700,
                    marginLeft: 4,
                  }}>
                  {/* {userPhone?.slice(0, 4)} */}
                  {user?.email}
                  {/* <Text style={{color: whiteColor, fontSize: RFValue(15, 812), fontFamily: Satoshi400}}> {userPhone?.slice(4, -1)}</Text> */}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate(emailChangePath as never)}
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
              <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginBottom: 26}}>
                Subscription manage
              </Text>
              <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{color: whiteColor}}>Change payment method</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: whiteColor, marginRight: 10, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>*8844</Text>
                  <ArrowRight width={14} height={14} />
                </View>
              </TouchableOpacity>
              <View style={{height: 1, backgroundColor: transparentWhite16Color, marginVertical: 14}} />
              <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{color: whiteColor, marginRight: 10, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>
                  Change payment method
                </Text>
                <ArrowRight width={14} height={14} />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsVisibleDeleteAccountModal(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: lightGray5Color,
              padding: 20,
              marginTop: 24,
            }}>
            <TrashRed />
            <Text style={{color: deleteColor, marginLeft: 10, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Delete my account</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ModalDeleteMyAccount
        isVisible={isVisibleDeleteAccountModal}
        onClose={() => setIsVisibleDeleteAccountModal(false)}
        setIsVisibleConfirmPhoneModal={setIsVisibleConfirmPhoneModal}
        sendVerificationCode={sendVerificationCode}
      />
      <ModalConfirmPhone
        isVisible={isVisibleConfirmPhoneModal}
        onClose={() => setIsVisibleConfirmPhoneModal(false)}
        verificationId={verificationId}
      />
    </>
  );
};

export default AccountSetting;
