import {isIos, screenHeight} from 'constants/common';
import React, {FC} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {black1Color, blackColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppNavigation} from 'hooks/useAppNavigation';
import AuthProgress from 'components/AuthProgress';

const AddBiusness: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const handleGoBack = async () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      keyboardVerticalOffset={15}
      style={{flex: 1, paddingBottom: 0, backgroundColor: black1Color}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
          <View
            style={{
              flex: 1,
              paddingBottom: 0,
              paddingHorizontal: 24,
              paddingTop: screenHeight / 29,
            }}>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                style={{
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: transparentWhite30Color,
                }}>
                <ArrowLeft />
              </TouchableOpacity>
              <LogoPrimary2 />
              <AuthProgress startPercentage={10} endPercentage={20} animationDuration={1000} />
            </View>
            <View>
              <View
                style={{
                  width: '100%',
                  marginTop: screenHeight / 6.5,
                  marginBottom: screenHeight / 39,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(48, 932),
                    marginBottom: screenHeight / 39,
                  }}>
                  Join as a Business and get more client's.
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(16, 932),
                  }}>
                  Please provide us with all your business information, and we will get back to you.
                </Text>
              </View>
              <View style={{width: '100%', backgroundColor: '#212121', borderRadius: 10, padding: 16}}>
                <Text style={{fontSize: RFValue(18, 932), fontFamily: Satoshi400, color: whiteColor, marginBottom: 16}}>
                  Please send an email to:
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: 43,
                      height: 43,
                      backgroundColor: blackColor,
                      borderRadius: 43,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 6,
                    }}>
                    <Text style={{color: whiteColor, fontSize: RFValue(20, 932), fontFamily: Satoshi700}}>IO</Text>
                  </View>
                  <Text style={{fontSize: RFValue(18, 932), fontFamily: Satoshi400, color: whiteColor}}>Buisness@invitedonly.app</Text>
                </View>
              </View>
            </View>
            <View style={{marginBottom: 4, width: '100%', alignItems: 'center', marginTop: 'auto'}}>
              <TouchableOpacity onPress={handleGoBack}>
                <Text style={{color: 'rgba(62, 62, 62, 1)', fontSize: RFValue(18, 932), fontFamily: Satoshi500}}>Go back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddBiusness;
