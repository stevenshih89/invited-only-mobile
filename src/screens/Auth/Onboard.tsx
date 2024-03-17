import {FC} from 'react';
import {Dimensions, ImageBackground, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Background from 'assets/images/auth/background.png';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import {transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {signUpPath} from 'constants/pathLocations';

const Onboard: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  // @ts-ignore
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={Background} style={{flex: 1}} resizeMode="cover">
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              marginTop: Dimensions.get('window').height / 3,
              alignItems: 'center',
            }}>
            <LogoPrimary />
          </View>
          <View
            style={{
              marginTop: 'auto',
              alignItems: 'center',
              paddingHorizontal: 42,
            }}>
            <Text
              style={{
                color: whiteColor,
                fontFamily: Satoshi400,
                fontSize: RFValue(48, 812),
              }}>
              Welcome
            </Text>
            <View
              style={{
                alignItems: 'center',
                marginTop: Dimensions.get('window').height / 30,
              }}>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi400,
                  fontSize: RFValue(18, 812),
                }}>
                Acess is limited.
              </Text>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi400,
                  fontSize: RFValue(18, 812),
                }}>
                This App os for invited only.
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: transparentWhite30Color,
                width: '100%',
                marginTop: Dimensions.get('window').height / 30,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={{top: 26, bottom: 20}}
              onPress={() => navigation.navigate(signUpPath)}
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: Dimensions.get('window').height / 30,
              }}>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi400,
                  fontSize: RFValue(20, 812),
                }}>
                JOIN THE APP
              </Text>
              <ArrowRight />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Onboard;
