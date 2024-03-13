import {grayColor, lightGray2Color, lightGray6Color, whiteColor} from 'constants/colors';
import {isIos} from 'constants/common';
import {Satoshi700} from 'constants/fonts';
import {useState} from 'react';
import {SafeAreaView, ViewStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {Keyboard, KeyboardAvoidingView, View} from 'react-native';
import FlagAE from 'assets/images/flags/ae.svg';
import ArrowDown from 'assets/images/icons/arrow-down.svg';
import {Dropdown} from 'react-native-element-dropdown';
import MaskInput from 'react-native-mask-input';
import {Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';

const PhoneChange = () => {
  const [mobilePhone, setMobilePhone] = useState<string>('');

  const [activeItem, setActiveItem] = useState<string>('ae');
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [isSecondStep, setIsSecondStep] = useState<boolean>(false);

  const items = [
    {
      label: '+380',
      value: 'ua',
      icon: <FlagAE />,
    },
    // {
    //   label: '+971',
    //   value: 'ae',
    //   icon: <FlagAE />,
    // },
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
    <View style={{flex: 1, backgroundColor: lightGray6Color, paddingHorizontal: 20}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={120} style={{flex: 1, paddingBottom: 0}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
            <View style={{justifyContent: 'space-between', flex: 1, paddingBottom: 0}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
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
              <Button title="Send  OTP" />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PhoneChange;
