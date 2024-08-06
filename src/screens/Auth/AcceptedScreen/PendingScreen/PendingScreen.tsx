import React, {FC, useContext} from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';

//import components
import useStyles from 'screens/Auth/AcceptedScreen/ReusableStyles/styles.ts';
import Button from 'components/Button/Button.tsx';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {paymentPath} from 'constants/pathLocations.ts';

//import images
import TimerIcon from 'assets/images/icons/timer.svg';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import {black1Color, blackColor, whiteColor} from 'constants/colors';
import {AuthContext} from 'contexts/AuthContext';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import { useRoute } from '@react-navigation/native';

const PendingScreen: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();  

  const {onBoarding} = useContext(AuthContext);

  const handleNext = () => {
    navigation.navigate(paymentPath as never, {screen: 'pending'});
  };
  const flattenedPhotos = onBoarding.filter((item: {photos: []}) => item.photos)[0]?.photos;
  const imageUser = flattenedPhotos?.find((photo: {id: number}) => photo.id === 0)?.image;
  const name = onBoarding.find((item: {name: string}) => item.name)?.name;

  return (
    <SafeAreaView style={[styles.safeAreaView, {backgroundColor: black1Color}]}>
      <View style={{flex: 1, paddingHorizontal: 24, justifyContent: 'space-between'}}>
        <View>
          <View style={{alignItems: 'center'}}>
            <LogoPrimary2 />
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(46, 812)}}>In Review</Text>
          </View>
          <View style={{marginTop: 20, alignSelf: 'center', alignItems: 'center', width: '90%'}}>
            <View style={{borderColor: whiteColor, borderWidth: 64, borderRadius: 500, alignSelf: 'center'}}>
              <Image source={{uri: imageUser}} style={{width: 190, height: 190, borderRadius: 200}} />
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
              <Text style={{color: blackColor, fontFamily: Satoshi500, fontSize: RFValue(24, 812), textAlign: 'center', marginRight: 8}}>
                {name?.split(' ')[0]}
              </Text>
              <TimerIcon />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), textAlign: 'center'}}>
              Your account is under review.
            </Text>
            <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), textAlign: 'center'}}>
              You will be notified soon.
            </Text>
          </View>
        </View>
        <View>
          <Button title="Got it, continue" onPress={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PendingScreen;
