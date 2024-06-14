import {isIos, screenHeight} from 'constants/common';
import {FC} from 'react';
import {FlatList, ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import CheckIcon from 'assets/images/icons/check.svg';
import {lightGray3Color, lightGray4Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {verifyFirstStepPath} from 'constants/pathLocations';

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
    <ImageBackground source={HalfBackground} resizeMode="cover" style={{flex: 1}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1, paddingBottom: 0}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: 0,
                paddingHorizontal: 38,
              }}>
              <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                  <LogoSecondary />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginBottom: screenHeight / 30,
                    marginTop: screenHeight / 80,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(34, 812),
                      marginBottom: 18,
                      textAlign: 'center',
                    }}>
                    Welcome
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
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
                          <Text style={{color: whiteColor, fontSize: RFValue(14, 812), fontFamily: Satoshi700, marginLeft: 8}}>
                            {title}
                          </Text>
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
    </ImageBackground>
  );
};

export default Privacy;
