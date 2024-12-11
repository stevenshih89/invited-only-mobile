import {AuthContext} from 'contexts/AuthContext';
import {useCallback, useContext, useEffect} from 'react';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import Loader from 'assets/images/auth/loader.svg';
import {AppState, Image, SafeAreaView, Text, View} from 'react-native';
import {backgroundGradientColors, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {useFocusEffect} from '@react-navigation/native';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {summaryInfoPath} from 'constants/pathLocations';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';

const PhotoVerified = () => {
  const {onBoarding} = useContext(AuthContext);
  const navigation = useAppNavigation();
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      100,
    );
  }, [rotation]);

  useFocusEffect(
    useCallback(() => {
      let timer;
      timer = setTimeout(() => {
        navigation.navigate(summaryInfoPath as never);
      }, 3000);
      return () => clearTimeout(timer);
    }, []),
  );

  useEffect(() => {
    let subscription: any;
    const name = onBoarding.find((item: {name: string}) => item?.name)?.name;
    const gender = onBoarding.find((item: {gender: string}) => item?.gender)?.gender;
    const email = onBoarding.find((item: any) => item.email)?.email;
    const accountType = onBoarding.find((item: any) => item.accountType)?.accountType;
    const date = onBoarding.find((item: any) => item.date)?.date;
    const photos = onBoarding.find((item: any) => item.photos)?.photos;
    const facePhoto = onBoarding.find((item: any) => item.facePhoto)?.facePhoto;

    const handleAppClose = async () => {
      const currentUser = auth()?.currentUser;
      if (!currentUser?.uid) {
        return;
      }
      try {
        await firestore()
          .collection('unfinishedRegistrationUsers')
          .doc(currentUser?.uid)
          .set({
            name,
            email,
            accountType,
            date,
            photos,
            facePhoto,
            gender,
            phoneNumber: auth()?.currentUser?.phoneNumber,
            createdAt: moment().format('YYYY-MM-DD'),
            screen: 'verify-first-step-selfie',
          });
        analytics().logEvent('verify_selfie_app_closed', {
          name,
          email,
          accountType,
          date,
          photos,
          facePhoto,
          gender,
          phoneNumber: auth()?.currentUser?.phoneNumber,
          createdAt: moment().format('YYYY-MM-DD'),
          screen: 'verify-first-step-selfie',
        });
      } catch (e) {
        console.error(e);
      }
    };

    subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        handleAppClose();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  });

  const flattenedPhotos = onBoarding.filter((item: {photos: []}) => item.photos)[0]?.photos;
  const imageUri = flattenedPhotos?.find((photo: {id: number}) => photo.id === 0)?.image;

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
        <View style={{paddingHorizontal: 24, flex: 1, justifyContent: 'space-around'}}>
          <View style={{alignItems: 'center', transform: [{translateY: -20}]}}>
            <LogoPrimary2 />
          </View>
          <View>
            <View
              style={{
                alignSelf: 'center',
                width: 180,
                height: 180,
                position: 'relative',
              }}>
              <CheckStarIcon style={{position: 'absolute', top: 0, right: 0, zIndex: 10}} width={36} height={36} />
              <Image source={{uri: imageUri}} style={{width: 180, height: 180, borderRadius: 180}} />
            </View>
            <Text style={{textAlign: 'center', fontFamily: Satoshi400, fontSize: RFValue(18, 812), color: whiteColor, marginTop: 20}}>
              Congratulations! Your photo has been successfully verified. Welcome aboard!
            </Text>
            <Animated.View style={[animatedStyle, {width: 90, height: 90, alignSelf: 'center', marginTop: 40}]}>
              <Loader width={90} height={90} />
            </Animated.View>
          </View>
          <View />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PhotoVerified;
