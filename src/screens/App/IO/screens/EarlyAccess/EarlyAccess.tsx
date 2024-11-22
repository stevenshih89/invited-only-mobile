import React from 'react';
import {showToast} from 'helpers/showToast';
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useUser} from 'src/store/userStore';
import CopyBlackIcon from 'assets/images/icons/copy-black.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import {blackColor, grayColor, lightGray16Color, whiteColor} from 'constants/colors';
import {Outfit500, Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useCallback, useEffect, useState} from 'react';
import {UserInfo} from 'src/types/userInfo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {screenHeight} from 'constants/common';

const EarlyAccess = () => {
  const userHost = useUser((i: any) => i?.user);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const inviteLink = userHost?.codeForInvitingOtherUsers;

  // console.log('inviteLink', inviteLink);

  const navigation = useNavigation();
  const fetchUserInfo = async () => {
    setLoadingUser(true);
    const user = auth().currentUser;

    if (user) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();

        if (userInfoDoc.exists) {
          const userInfoData = userInfoDoc.data() as UserInfo;
          setUserInfo(userInfoData);
        }
      } catch (error: any) {
        setLoadingUser(false);
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
    setLoadingUser(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
    }, []),
  );

  const handleCopy = (val: string) => {
    Clipboard.setString(val);
    showToast('inviteMatch', '', 'Invite code copied!');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: blackColor,
      }}>
      <View style={{paddingHorizontal: 24, flex: 1}}>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity onPress={handleGoBack}>
            <CloseIcon width={28} height={28} style={{}} />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: screenHeight / 48}}>
          <LogoPrimary height={32} />
          <Text
            style={{fontFamily: Satoshi700, fontSize: RFValue(24, 932), color: whiteColor, letterSpacing: 6, marginTop: screenHeight / 18}}>
            EARLY ACCESS
          </Text>
          <Text style={{fontFamily: Satoshi400, fontSize: RFValue(18, 932), color: whiteColor, marginTop: screenHeight / 18}}>
            Unlock access for 5 others.
          </Text>
          <Text style={{fontFamily: Satoshi400, fontSize: RFValue(18, 932), color: whiteColor}}>Share your invite codes below.</Text>
        </View>
        {inviteLink?.length && (
          <View style={{flex: 1, marginTop: screenHeight / 18}}>
            <Text style={{fontFamily: Satoshi500, fontSize: RFValue(14, 932), color: whiteColor}}>IO Invitations</Text>
            <View
              style={{
                gap: 10,
                marginTop: 10,
              }}>
              {inviteLink.map((item: any) => (
                <TouchableOpacity
                  disabled={!item.isActive}
                  activeOpacity={0.7}
                  onPress={() => handleCopy(item.inviteCode)}
                  style={{
                    backgroundColor: item.isActive ? whiteColor : lightGray16Color,
                    borderRadius: 10,
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontFamily: Satoshi400, fontSize: RFValue(18, 932), color: blackColor}}>{item.inviteCode}</Text>
                  <CopyBlackIcon />
                </TouchableOpacity>
              ))}
            </View>
            <View style={{alignItems: 'center', gap: 10, marginTop: 'auto', marginBottom: screenHeight / 40}}>
              <Text style={{fontFamily: Outfit500, fontSize: RFValue(14, 932), color: whiteColor}}>ACCESS IS LIMITED.</Text>
              <Text style={{fontFamily: Outfit500, fontSize: RFValue(14, 932), color: whiteColor}}>THIS APP IS FOR INVITED ONLY.</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EarlyAccess;
