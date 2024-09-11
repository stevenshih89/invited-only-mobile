import {
  blackColor,
  deleteColor,
  grayColor,
  lightGray5Color,
  lightGray6Color,
  lightRedColor,
  toggleColor,
  transparentWhite16Color,
  whiteColor,
} from 'constants/colors';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import AEFlag from 'assets/images/flags/ae.svg';
import TrashRed from 'assets/images/icons/trash-red.svg';
import InstagramIcon from 'assets/images/auth/instagram.svg';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {Switch} from '@ant-design/react-native';
import {FC, useEffect, useState} from 'react';
import ModalDeleteMyAccount from './ModalDeleteMyAccount';
import {phoneChangePath} from 'constants/pathLocations';
import {useUser} from '../../../../../store/userStore';
import auth from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import chat from 'screens/App/Chat/Chat.tsx';
import ModalConfirmPhone from './ModalConfirmPhone';

const AccountSetting: FC = ({navigation, route}: any) => {
  const locationState = route?.params?.params?.locationState;
  const [isChechked, setIsChechked] = useState(false);
  const [isConnectedInstagram, setIsConnectedInstagram] = useState(false);
  const [isVisibleDeleteAccountModal, setIsVisibleDeleteAccountModal] = useState(false);
  const [isVisibleConfirmPhoneModal, setIsVisibleConfirmPhoneModal] = useState(false);
  const [location, setLocation] = useState<boolean>(locationState);
  const [loading, setLoading] = useState<boolean>(true);
  const [verificationId, setVerificationId] = useState('');

  const user = useUser((i: any) => i?.user);

  const setUser = useUser((i: any) => i?.setUser);
  const userPhone = auth()?.currentUser?.phoneNumber;
  const uid = user?.uid;

  const isPremium = false;

  const handleChangeLocation = async (state: boolean): Promise<void> => {
    try {
      await firestore()
        .collection('userInfo')
        .doc(uid)
        .update({
          location: state,
        })
        .then(async () => {
          await firestore()
            .collection('userInfo')
            .doc(uid)
            .get()
            .then(res => {
              setUser(res.data());
            });
        });
    } catch (e) {
      // console.log(e);
    }
  };

  const getCurrentLocation = (): void => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
    });
    Geolocation.getCurrentPosition(
      position => {
        // console.log('Granted', position);
        setLocation(true);
        handleChangeLocation(true);
        setIsChechked(true);
        setLoading(false);
      },
      error => {
        // console.log('Denied', error);
        setLocation(false);
        setIsChechked(false);
        setLoading(false);
        handleChangeLocation(false);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  useEffect(() => {
    if (isChechked) {
      getCurrentLocation();
    }
    setLoading(false);
  }, [location, isChechked]);

  const sendVerificationCode = async () => {
    const phoneNumber = auth().currentUser?.phoneNumber;
    if (!phoneNumber) return;
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation?.verificationId);
    } catch (error) {
      // console.error('Failed to send verification code:', error);
    }
  };

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
                  <Text style={{color: whiteColor, fontSize: RFValue(15, 812), fontFamily: Satoshi400}}> {userPhone?.slice(4, -1)}</Text>
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
                // onPress={() => navigation.navigate(phoneChangePath as never)}
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
          {/* <View
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
            <Switch
              trackColor={{false: grayColor, true: toggleColor}}
              checked={location}
              loading={loading}
              onChange={value => {
                setIsChechked(value);
                handleChangeLocation(value);
                // setLocation(!location);
              }}
            />
          </View> */}
          {/* <TouchableOpacity
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
                {isConnectedInstagram ? user?.name : 'Connect Instagram'}
              </Text>
            </View>
            <Text style={{color: isConnectedInstagram ? lightRedColor : whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi700}}>
              {isConnectedInstagram ? 'Disconnect' : 'Connect'}
            </Text>
          </TouchableOpacity> */}
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
