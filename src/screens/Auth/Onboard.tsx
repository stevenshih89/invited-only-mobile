import {FC} from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AuthBackground from 'assets/images/auth/auth-background.png';
import AuthLogo from 'assets/images/auth/auth-logo.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import {transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

const Onboard: FC = (): JSX.Element => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={AuthBackground}
        style={{flex: 1}}
        resizeMode="cover">
        <View
          style={{
            marginTop: Dimensions.get('window').height / 3,
            alignItems: 'center',
          }}>
          <AuthLogo />
        </View>
        <View
          style={{
            marginTop: 'auto',
            marginBottom: 50,
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
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Dimensions.get('window').height / 30,
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
      </ImageBackground>
    </View>
  );
};

export default Onboard;
