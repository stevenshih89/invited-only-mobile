import React, {FC, useContext} from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';

//import components
import useStyles from 'screens/Auth/AcceptedScreen/ReusableStyles/styles.ts';
import Button from 'components/Button/Button.tsx';
import {useAppNavigation} from 'hooks/useAppNavigation.tsx';
import {tutorialFlowPath} from 'constants/pathLocations.ts';

//import images
import TimerIcon from 'assets/images/icons/timer.svg';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import {backgroundGradientColors, blackColor, whiteColor} from 'constants/colors';
import {AuthContext} from 'contexts/AuthContext';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {screenHeight} from 'constants/common';

const PendingScreen: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();

  const {onBoarding} = useContext(AuthContext);

  const handleNext = () => {
    navigation.navigate(tutorialFlowPath as never);
  };
  const flattenedPhotos = onBoarding.filter((item: {photos: []}) => item.photos)[0]?.photos;
  const imageUser = flattenedPhotos?.find((photo: {id: number}) => photo.id === 0)?.image;
  const name = onBoarding.find((item: {name: string}) => item.name)?.name;

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{flex: 1, paddingHorizontal: 24, justifyContent: 'space-between'}}>
          <View>
            <View style={{alignItems: 'center', marginTop: 16, paddingVertical: 28}}>
              <LogoPrimary2 />
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 932)}}>In Review</Text>
            </View>
            <View style={{marginTop: 20, alignSelf: 'center', alignItems: 'center', width: '90%'}}>
              <View style={{borderColor: whiteColor, borderWidth: screenHeight / 15, borderRadius: 500, alignSelf: 'center'}}>
                <Image source={{uri: imageUser}} style={{width: screenHeight / 4, height: screenHeight / 4, borderRadius: 200}} />
              </View>
              <View style={{width: 20, height: 23, backgroundColor: whiteColor, marginTop: -3}} />
              <View
                style={{
                  backgroundColor: whiteColor,
                  borderRadius: 16,
                  width: '100%',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: blackColor, fontFamily: Satoshi500, fontSize: RFValue(20, 932), textAlign: 'center', marginRight: 8}}>
                  {name?.split(' ')[0]}
                </Text>
                <TimerIcon />
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(20, 932), textAlign: 'center', opacity: 0.8}}>
                Your account is under review. Thank you for your patience. You will be notified if your account is accepted.
              </Text>
            </View>
          </View>
          <View>
            <Button title="Got it, continue" onPress={handleNext} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PendingScreen;
