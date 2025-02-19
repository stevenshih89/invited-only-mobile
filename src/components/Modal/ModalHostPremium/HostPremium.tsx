import {Image, SafeAreaView, Text, View} from 'react-native';
import LogoIcon from 'assets/images/icons/logo.svg';
import {blackColor, whiteColor} from 'constants/colors';
import Modal from 'react-native-modal';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {FC, useEffect, useState} from 'react';
import Button from 'components/Button/Button';
import LinearGradient from 'react-native-linear-gradient';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {profilePath, tutorialFlowPath} from 'constants/pathLocations.ts';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import { showToast } from 'helpers/showToast';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
interface LoaderProps {
  isVisible: boolean;
  setVsibleHostPremium: any;
  screen: string;
}

const HostPremium: FC<LoaderProps> = ({isVisible, setVsibleHostPremium, screen}) => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const [userInfo, setUserInfo] = useState<any>({});

  const navigation = useAppNavigation();

  const handleNext = async () => {
    if (screen === 'pending') {
      navigation.navigate(tutorialFlowPath as never);
      setVsibleHostPremium(false);
    } else {
      navigation.navigate(profilePath as never);
    }
  };

  const getUserInfo = async () => {
    const userId = auth().currentUser?.uid;
    if (userId) {
      try {
        const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(userId).get();
        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
      } catch (error) {
        showToast('inviteMatch', 'An error occurred while retrieving your information. Please try again later.', 'Error');
        logErrorToSentry(error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [userInfo]);

  const getSize = () => {
    let size;
    if (userInfo?.name?.length) {
      if (userInfo?.name?.length <= 8) {
        size = 68;
      }
      if (userInfo?.name?.length > 8 && userInfo?.name?.length <= 12) {
        size = 52;
      }
      if (userInfo?.name?.length > 12 && userInfo?.name?.length <= 16) {
        size = 38;
      }
      if (userInfo?.name?.length > 16) {
        size = 24;
      }
    } else {
      size = 68;
    }
    return size;
  };

  return (
    <Modal isVisible={isVisible} coverScreen animationInTiming={1} backdropColor={blackColor} backdropOpacity={1} style={{margin: 0}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 24, justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{}}>
            <LogoIcon />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: whiteColor, fontSize: RFValue(44, 812), marginBottom: 32, fontFamily: Satoshi500}}>Congratulations!</Text>
            <LinearGradient
              colors={['#977B4A', '#E5D291', '#A28453']}
              style={{
                width: 310,
                height: 310,
                borderRadius: 320,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              {userInfo?.photos && userInfo.photos?.[0]?.image && (
                <Image style={{width: 300, height: 300, borderRadius: 300}} source={{uri: userInfo.photos[0].image}} />
              )}
            </LinearGradient>
            <View style={{justifyContent: 'center', width: '100%', alignItems: 'center'}}>
              <Text style={{color: whiteColor, fontSize: RFValue(getSize() ?? 68, 812), fontFamily: Satoshi500, marginBottom: 8}}>
                {userInfo?.name ?? ''}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: whiteColor,
                    borderRadius: 4,
                    paddingHorizontal: 12,
                    paddingVertical: 2,
                    backgroundColor: blackColor,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontSize: RFValue(12, 812),
                      fontFamily: Satoshi400,
                      fontWeight: 'bold',
                    }}>
                    {userInfo?.accountType === 'host' ? 'Host' : 'Guest'}
                  </Text>
                </View>
                <LinearGradient
                  colors={['#977B4A', '#E5D291', '#A28453']}
                  style={{
                    marginLeft: 5,
                    borderRadius: 4,
                    paddingHorizontal: 12,
                    paddingVertical: 2,
                    backgroundColor: blackColor,
                  }}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  {true && (
                    <Text
                      style={{
                        color: blackColor,
                        fontSize: RFValue(12, 812),
                        fontFamily: Satoshi400,
                        fontWeight: 'bold',
                      }}>
                      Premium
                    </Text>
                  )}
                </LinearGradient>
              </View>
            </View>
          </View>
          <Button onPress={handleNext} buttonStyle={{width: '100%'}} title={'Continue'} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default HostPremium;
