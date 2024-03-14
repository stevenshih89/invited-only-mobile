import {grayColor, lightGray2Color, lightGray5Color, lightGray6Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {isIos, screenHeight} from 'constants/common';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {RefObject, useState} from 'react';
import {SafeAreaView, StyleSheet, ViewStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {Keyboard, KeyboardAvoidingView, View} from 'react-native';
import FlagAE from 'assets/images/flags/ae.svg';
import ArrowDown from 'assets/images/icons/arrow-down.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import {Dropdown} from 'react-native-element-dropdown';
import MaskInput from 'react-native-mask-input';
import {Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {TouchableOpacity} from 'react-native';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {TextInput} from 'react-native';

const PhoneChange = () => {
  const [mobilePhone, setMobilePhone] = useState<string>('');

  const [activeItem, setActiveItem] = useState<string>('ae');
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [isSecondStep, setIsSecondStep] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const CELL_COUNT: number = 6;
  const ref: RefObject<TextInput> = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});

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
          <SafeAreaView style={{flex: 1, paddingBottom: 0, borderTopColor: transparentWhite16Color, borderTopWidth: 1}}>
            <View style={{justifyContent: 'space-between', flex: 1, paddingBottom: 0, paddingTop: 20}}>
              {!isSecondStep ? (
                <>
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
                  <Button title="Send OTP" onPress={() => setIsSecondStep(true)} disabled={mobilePhone.length < 11} />
                </>
              ) : (
                <>
                  <View>
                    <View
                      style={{
                        marginTop: 26,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 20,
                        borderRadius: 10,
                        backgroundColor: lightGray5Color,
                      }}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FlagAE />
                        <Text style={{color: whiteColor, fontSize: RFValue(15, 812), fontFamily: Satoshi700, marginLeft: 4}}>
                          +971<Text style={{color: whiteColor, fontSize: RFValue(15, 812), fontFamily: Satoshi400}}> 011 417 757 21</Text>
                        </Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setIsSecondStep(false)}
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        hitSlop={{top: 20, left: 10, right: 10, bottom: 10}}>
                        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginRight: 4}}>Change</Text>
                        <ArrowRight width={14} height={14} />
                      </TouchableOpacity>
                    </View>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), textAlign: 'center', marginTop: 34}}>
                      Please enter verification code sent to your mobile{' '}
                      <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(18, 812)}}>
                        {mobilePhone.slice(-3, mobilePhone.length)}
                      </Text>
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: 20,
                      }}>
                      <CodeField
                        ref={ref}
                        {...props}
                        value={code}
                        onChangeText={setCode}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        keyboardAppearance="dark"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                          <View
                            key={index}
                            style={{
                              borderRadius: 10,
                              backgroundColor: lightGray2Color,
                              flex: 1,
                              height: screenHeight / 18,
                              marginHorizontal: 8,
                            }}>
                            <Text style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
                              {symbol || (isFocused ? <Cursor /> : '_')}
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'flex-start',
                        marginTop: screenHeight / 60,
                      }}>
                      <TouchableOpacity activeOpacity={0.7} hitSlop={{bottom: 10, right: 20}}>
                        <Text
                          style={{
                            color: whiteColor,
                            fontFamily: Satoshi700,
                            fontSize: RFValue(13, 812),
                          }}>
                          Resend OTP
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Button title="Save" />
                </>
              )}
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    lineHeight: 38,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginVertical: 'auto',
    fontSize: RFValue(16, 812),
    textAlign: 'center',
    color: whiteColor,
    fontFamily: Satoshi400,
  },
  focusCell: {
    borderRadius: 20,
    borderColor: '#000',
  },
});

export default PhoneChange;
