import React, {FC, useContext} from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';

//import components
import useStyles from 'screens/Auth/AcceptedScreen/ReusableStyles/styles.ts';
import Button from 'components/Button/Button.tsx';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {paymentPath} from 'constants/pathLocations.ts';

//import images
import IconVerifyFilledAccepted from 'assets/images/icons/check-star.svg';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import {black1Color, blackColor, whiteColor} from 'constants/colors';
import {AuthContext} from 'contexts/AuthContext';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

const CodeVerified: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();

  const {onBoarding} = useContext(AuthContext);

  const handleNext = () => {
    navigation.navigate(paymentPath as never);
  };
  const imageUser = onBoarding.find((item: {imageUser: string}) => item.imageUser)?.imageUser;
  const name = onBoarding.find((item: {name: string}) => item.name)?.name;

  return (
    <SafeAreaView style={[styles.safeAreaView, {backgroundColor: black1Color}]}>
      <View style={{flex: 1, paddingHorizontal: 24, justifyContent: 'space-between'}}>
        <View>
          <View style={{alignItems: 'center'}}>
            <LogoPrimary2 />
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(46, 812)}}>Accepted!</Text>
          </View>
          <View style={{marginTop: 20, alignSelf: 'center', alignItems: 'center', width: '90%'}}>
            <View style={{borderColor: whiteColor, borderWidth: 64, borderRadius: 500, alignSelf: 'center'}}>
              <Image source={{uri: imageUser}} style={{width: 190, height: 190}} />
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
              <IconVerifyFilledAccepted />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), textAlign: 'center'}}>
              Congratulations! Join invitation accepted. Welcome aboard!
            </Text>
          </View>
        </View>
        <View>
          <Button title="Continue" onPress={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CodeVerified;
