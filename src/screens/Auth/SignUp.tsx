import {isIos, screenHeight} from 'constants/common';
import {FC, useState} from 'react';
import {ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import FlagAE from 'assets/images/flags/ae.svg';
import ArrowDown from 'assets/images/icons/arrow-down.svg';
import MaskInput from 'react-native-mask-input';
import {Dropdown} from 'react-native-element-dropdown';
import {grayColor, lightGray2Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {confirmPhonePath} from 'constants/pathLocations';
import auth from '@react-native-firebase/auth';

const SignUp: FC = (): JSX.Element => {
  const [mobilePhone, setMobilePhone] = useState<string>('');
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useAppNavigation();
  const [activeItem, setActiveItem] = useState<string>('ae');
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const items = [
    {
      label: '+380',
      value: 'ua',
      icon: <FlagAE />,
    },
    {
      label: '+972',
      value: 'ae',
      icon: <FlagAE />,
    },
    {
      label: '+300',
      value: 'fr',
      icon: <FlagAE />,
    },
    {
      label: '+400',
      value: 'lo',
      icon: <FlagAE />,
    },
    {
      label: '+321',
      value: 'po',
      icon: <FlagAE />,
    },
  ];

  async function signInWithPhoneNumber() {
    try {
      if (!mobilePhone) {
        return;
      }
      setLoading(true);
      const searchCode = items?.filter(i => i?.value === activeItem);
      const phone = `${searchCode[0]?.label}${mobilePhone}`;
      const confirmation = await auth().signInWithPhoneNumber(phone);
      // @ts-ignore
      setConfirm(confirmation);
      setLoading(false);
      // @ts-ignore
      navigation.navigate(confirmPhonePath, {confirm: confirmation, mobilePhone: phone});
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  const dropdownContainerStyle: ViewStyle = isOpenDropdown
    ? {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {
        borderRadius: 10,
      };

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
              }}>
              <View style={{alignItems: 'center'}}>
                <LogoSecondary />
                <View
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: 38,
                    marginBottom: screenHeight / 30,
                    marginTop: screenHeight / 80,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(34, 812),
                      marginBottom: 18,
                    }}>
                    My phone
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
                    }}>
                    We protect our community by ensuring the authenticity of everyone in IO.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    paddingHorizontal: 38,
                  }}>
                  <Dropdown
                    data={items}
                    value={activeItem}
                    valueField="value"
                    labelField="label"
                    onChange={({value}) => setActiveItem(value)}
                    onBlur={() => setIsOpenDropdown(false)}
                    onFocus={() => setIsOpenDropdown(true)}
                    activeColor="transparent"
                    renderItem={({label, icon: Icon}) => (
                      <View
                        key={label}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: 40,
                          marginHorizontal: 11,
                          borderBottomColor: grayColor,
                          borderBottomWidth: 1,
                          borderStyle: 'solid',
                        }}>
                        {Icon}
                        <Text style={{color: whiteColor, marginLeft: 4, fontFamily: Satoshi700, fontSize: RFValue(14, 812)}}>{label}</Text>
                      </View>
                    )}
                    renderLeftIcon={() => (
                      <View style={{marginLeft: 10}}>
                        <FlagAE />
                      </View>
                    )}
                    renderRightIcon={() => (
                      <View style={{marginRight: 10}}>
                        <ArrowDown />
                      </View>
                    )}
                    iconStyle={{width: 24, height: 24}}
                    selectedTextStyle={{
                      color: whiteColor,
                      marginLeft: 5,
                      fontFamily: Satoshi700,
                    }}
                    style={{
                      backgroundColor: lightGray2Color,
                      width: 110,
                      height: 56,
                      ...dropdownContainerStyle,
                    }}
                    containerStyle={{
                      backgroundColor: lightGray2Color,
                      borderWidth: 0,
                      height: 110,
                      marginTop: -2,
                    }}
                    itemContainerStyle={{
                      backgroundColor: lightGray2Color,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                    itemTextStyle={{
                      color: whiteColor,
                      fontFamily: Satoshi700,
                    }}
                  />
                  <View style={{marginLeft: 6, flex: 1}}>
                    <MaskInput
                      style={{
                        color: whiteColor,
                        borderRadius: 10,
                        backgroundColor: lightGray2Color,
                        height: 64,
                        paddingHorizontal: 20,
                        flex: 1,
                      }}
                      keyboardAppearance="dark"
                      value={mobilePhone}
                      keyboardType="number-pad"
                      onChangeText={(masked: any) => setMobilePhone(masked)}
                      placeholder="_ _ _  _ _ _  _ _ _"
                      placeholderTextColor={whiteColor}
                      mask={[/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
                    />
                  </View>
                </View>
              </View>
              <View style={{paddingHorizontal: 38, marginBottom: 4}}>
                <Button
                  variant="transparent"
                  title="Login by phone number"
                  // disabled={!mobilePhone && !loading && !confirm}
                  onPress={() => signInWithPhoneNumber()}
                  buttonContatinerStyle={{marginBottom: 12}}
                />
                <Button disabled={!mobilePhone && !loading && !confirm} onPress={() => signInWithPhoneNumber()} title="Sign up by phone number" />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignUp;
