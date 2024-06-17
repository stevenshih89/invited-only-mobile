import {isIos, screenHeight} from 'constants/common';
import {FC} from 'react';
import {FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {black1Color, lightGray3Color, lightGray4Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {verifyFirstStepPath} from 'constants/pathLocations';
import {TouchableOpacity} from 'react-native';

const Privacy: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const privaciesList = [
    {
      id: 0,
      title: 'Be yourself.',
      subtitle: 'Make sure your photos, age, and bio are true to who you are.',
    },
    {
      id: 1,
      title: 'Play it cool.',
      subtitle: 'Respect others and treat them as you would like to be treated.',
    },
    {
      id: 2,
      title: 'Be proactive.',
      subtitle: 'Always report bad behavior.',
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
                <View />
              </View>
              <View
                style={{
                  width: '100%',
                  marginBottom: screenHeight / 30,
                  marginTop: screenHeight / 14,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(34, 812),
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
                  Please follow these House Rules
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <FlatList
                  data={privaciesList}
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
              <Button onPress={() => navigation.navigate(verifyFirstStepPath as never)} title="I agree, continue" />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Privacy;
