import { useCallback, useContext, useEffect } from 'react';
import { AppState, Image, SafeAreaView, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import { summaryInfoPath } from 'constants/pathLocations';
import { useAppNavigation, useFocusEffect } from 'hooks/useAppNavigation';
import { Satoshi400 } from 'constants/fonts';
import { backgroundGradientColors, whiteColor } from 'constants/colors';
import Loader from 'assets/images/auth/loader.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import { AuthContext } from 'contexts/AuthContext';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import { useAuthStore } from 'src/store/authStore';

const PhotoVerified = () => {
  const { onBoarding } = useContext(AuthContext);
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
    const name = onBoarding.find((item: { name: string }) => item?.name)?.name;
    const gender = onBoarding.find((item: { gender: string }) => item?.gender)?.gender;
    const email = onBoarding.find((item: any) => item.email)?.email;
    const accountType = onBoarding.find((item: any) => item.accountType)?.accountType;
    const date = onBoarding.find((item: any) => item.date)?.date;
    const photos = onBoarding.find((item: any) => item.photos)?.photos;
    const facePhoto = onBoarding.find((item: any) => item.facePhoto)?.facePhoto;
    const { userMetadata: user } = useAuthStore();
    const handleAppClose = async () => {
      if (!user?.uid) {
        return;
      }
      try {
        await firestore()
          .collection('unfinishedRegistrationUsers')
          .doc(user?.uid)
          .set({
            name,
            email,
            accountType,
            date,
            photos,
            facePhoto,
            gender,
            phoneNumber: user?.phoneNumber,
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
          phoneNumber: user?.phoneNumber,
          createdAt: moment().format('YYYY-MM-DD'),
          screen: 'verify-first-step-selfie',
        });
      } catch (e) {
        console.error(e);
        logErrorToSentry(e);
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
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const flattenedPhotos = onBoarding.filter((item: { photos: [] }) => item.photos)[0]?.photos;
  const imageUri = flattenedPhotos?.find((photo: { id: number }) => photo.id === 0)?.image;

  return (
    <LinearGradient colors={backgroundGradientColors} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, paddingBottom: 0 }}>
        <View style={{ paddingHorizontal: 24, flex: 1, justifyContent: 'space-around' }}>
          <View style={{ alignItems: 'center', transform: [{ translateY: -20 }] }}>
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
              <CheckStarIcon style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }} width={36} height={36} />
              <Image testID="photo-verified-image" source={{ uri: imageUri }} style={{ width: 180, height: 180, borderRadius: 180 }} />
            </View>
            <Text style={{ textAlign: 'center', fontFamily: Satoshi400, fontSize: RFValue(18, 812), color: whiteColor, marginTop: 20 }}>
              Congratulations! Your photo has been successfully verified. Welcome aboard!
            </Text>
            <Animated.View
              testID="photo-verified-loader"
              style={[animatedStyle, { width: 90, height: 90, alignSelf: 'center', marginTop: 40 }]}>
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
