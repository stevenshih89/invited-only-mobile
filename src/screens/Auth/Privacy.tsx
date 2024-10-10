import {isIos, screenHeight} from 'constants/common';
import {FC, useContext} from 'react';
import {FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {black1Color, lightGray3Color, lightGray4Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {verifyFirstStepPath} from 'constants/pathLocations';
import {TouchableOpacity} from 'react-native';
import { AuthContext } from 'contexts/AuthContext';

const Privacy: FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const {onBoarding} = useContext(AuthContext);
  const objWithAccountType = onBoarding.find(obj => obj.hasOwnProperty("accountType"));
  
  const privaciesListHost = [
    {
      id: 0,
      title: 'Be Respectful',
      subtitle: 'Treat your guests with courtesy and professionalism at all times.',
    },
    {
      id: 1,
      title: 'Ensure Safety',
      subtitle: 'Maintain a safe environment and report inappropriate behavior immediately.',
    },
    {
      id: 2,
      title: 'Honesty is Key',
      subtitle: 'Be clear about your event and its purpose—no misleading details.',
    },
    {
      id: 3,
      title: 'Respect Privacy',
      subtitle: 'Do not share personal information or media without consent.'
    },
  ];

  const privaciesListGuest = [
    {
      id: 0,
      title: 'Be Polite',
      subtitle: 'Treat the host and other guests with respect and courtesy.'
    },
    {
      id: 1,
      title: 'Follow Guidelines',
      subtitle: "Adhere to the host's event rules and maintain appropriate behavior.",
    },
    {
      id: 2,
      title: 'Be Honest',
      subtitle: 'Represent yourself truthfully when joining events.',
    },
    {
      id: 3,
      title: 'Respect Privacy',
      subtitle: 'Do not share personal details or event content without permission.'
    },
  ];

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
              justifyContent: 'space-between',
              paddingBottom: 0,
              paddingHorizontal: 24,
            }}>
            <View style={{alignItems: 'center'}}>
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
                <View style={{width: 40}} />
              </View>
              <View
                style={{
                  width: '100%',
                  marginBottom: screenHeight / 30,
                  marginTop: screenHeight / 10,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(48, 812),
                    marginBottom: 18,
                  }}>
                  Welcome
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(18, 812),
                  }}>
                  Please follow these {objWithAccountType?.accountType === 'host'? 'Host': 'Guest'} House Rules
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <FlatList
                  data={objWithAccountType?.accountType === 'host'? privaciesListHost: privaciesListGuest}
                  keyExtractor={({id}) => id.toString()}
                  ItemSeparatorComponent={() => <View style={{height: 8}} />}
                  renderItem={({item: {title, subtitle}}) => (
                    <View style={{width: '100%', padding: 20, backgroundColor: lightGray3Color, borderRadius: 10}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CheckIcon />
                        <Text style={{color: whiteColor, fontSize: RFValue(14, 812), fontFamily: Satoshi700, marginLeft: 8}}>{title}</Text>
                      </View>
                      <Text style={{color: lightGray4Color, fontSize: RFValue(14, 812), fontFamily: Satoshi400, marginTop: 10}}>
                        {subtitle}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={{marginBottom: 4}}>
              <Button onPress={() => navigation.navigate(verifyFirstStepPath as never)} title="I Agree, Continue" />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Privacy;
