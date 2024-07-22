import {StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {isValidPhoneNumber, parsePhoneNumber, type PhoneNumber} from 'libphonenumber-js';
import {errorColor, lightGray2Color, transparentGray60Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import ArrowDown from 'assets/images/icons/arrow-down.svg';
import PhoneInput from 'react-native-phone-number-input';
import {Satoshi400} from 'constants/fonts';

interface IInputPhoneViewProps {
  onChangeFormattedText?: (text: string) => void;
  value: string;
  containerStyle?: StyleProp<ViewStyle>;
  textContainer?: StyleProp<ViewStyle>;
  validationDisabled?: boolean;
  flagButtonStyle?: StyleProp<ViewStyle>;
  arrowDisabled?: boolean;
  disabled?: boolean;
  textDisabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
  onFocus?: () => void;
  placeholder?: string | null;
  codeTextStyle?: StyleProp<TextStyle>;
  onPressFocus?: () => void;
  setIsValid?: (valid: boolean) => void;
}

export const InputPhoneView: React.FC<IInputPhoneViewProps> = props => {
  const DEFAULT_COUNTRY = 'AE';
  const phoneRef: any = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState(props.value);
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const [_, setFocusInput] = useState<boolean>(!!props.value);

  useEffect(() => {
    validatePhone();
  }, [props.value, phoneNumber]);

  const onPress = (): void => {
    props.onPressFocus && props.onPressFocus();
    setFocusInput(true);
  };

  const validatePhone = () => {
    const validPhoneNumber = _isValidPhoneNumber(phoneNumber);
    setPhoneValid(validPhoneNumber);
    props.setIsValid && props.setIsValid(validPhoneNumber);
  };

  const _isValidPhoneNumber = (mobileNumber: string) => {
    const googlePhoneValid = isValidPhoneNumber(mobileNumber);
    const countryCode = getDefaultCountryCode();
    if (countryCode === 'IL') {
      const fistSymbolAfterCode = mobileNumber[4];
      if (fistSymbolAfterCode === '0') {
        return false;
      }
    }
    return googlePhoneValid;
  };

  const handleOnChangeFormattedText = (text: string) => {
    props.onChangeFormattedText && props.onChangeFormattedText(text);
    setPhoneNumber(text);
  };

  const getDefaultCountryCode = () => {
    try {
      const parsedPhoneResponse: PhoneNumber = parsePhoneNumber(props.value) as PhoneNumber;
      const parsedCountry = parsedPhoneResponse.country || DEFAULT_COUNTRY;
      return parsedCountry;
    } catch (e) {
      return DEFAULT_COUNTRY;
    }
  };

  const getDefaultPhoneNumber = () => {
    if (phoneNumber.length === 0) {
      return;
    }
    const defaultShortNumber = props.value.replace('+', '').trim();
    try {
      const parsedPhoneResponse: PhoneNumber = parsePhoneNumber(props.value) as PhoneNumber;
      const callingCode = parsedPhoneResponse.countryCallingCode;
      if (!callingCode) {
        return defaultShortNumber;
      } else {
        return props.value.replace('+', '').replace(callingCode.toString(), '').trim();
      }
    } catch (e) {
      return defaultShortNumber;
    }
  };

  const handleOnFocus = () => {
    props.onFocus && props.onFocus();
  };

  return (
    <View style={[props.containerStyle, {marginBottom: 16, flexDirection: 'column'}]}>
      <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.container]}>
        <View style={{width: '100%'}}>
          <PhoneInput
            ref={phoneRef}
            autoFocus
            defaultCode={getDefaultCountryCode() as any}
            defaultValue={getDefaultPhoneNumber()}
            placeholder={props.placeholder ? props.placeholder : 'Phone Number'}
            codeTextStyle={[
              styles.codeText,
              props.codeTextStyle,
              {color: !phoneValid && phoneNumber.length > 0 && !props.validationDisabled ? errorColor : '#ffffff'},
            ]}
            onChangeFormattedText={handleOnChangeFormattedText}
            disableArrowIcon={props.arrowDisabled}
            renderDropdownImage={<ArrowDown />}
            withDarkTheme
            textInputProps={{
              editable: !props.textDisabled,
              onFocus: handleOnFocus,
              placeholderTextColor: 'rgba(255,255,255,0.5)',
              placeholder: props.placeholder ? props.placeholder : 'Phone Number',
            }}
            containerStyle={[
              styles.containerInput,
              props.containerStyle,
              {
                width: '100%',
                backgroundColor: lightGray2Color,
                paddingTop: 0,
                paddingRight: 0,
                borderColor: !phoneValid && phoneNumber.length > 0 && !props.validationDisabled ? errorColor : 'transparent',
                borderWidth: 1,
                borderStyle: 'solid',
              },
            ]}
            textContainerStyle={[styles.textContainer, props.textContainer, {backgroundColor: lightGray2Color}]}
            textInputStyle={[
              styles.text,
              props.textStyle,
              {color: !phoneValid && phoneNumber.length > 0 && !props.validationDisabled ? errorColor : '#ffffff'},
            ]}
            countryPickerProps={{
              filterProps: {
                withAlphaFilter: false,
                placeholder: 'Country / Region',
                placeholderTextColor: transparentWhite30Color,
                style: {
                  color: whiteColor,
                  width: '70%',
                  fontSize: 18,
                  backgroundColor: transparentGray60Color,
                  padding: 16,
                  borderRadius: 10,
                },
              },
            }}
            flagButtonStyle={[styles.flagStyle, props.flagButtonStyle]}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.wrapperErrorText}>
        {!phoneValid && phoneNumber.length > 0 && !props.validationDisabled ? (
          <Text style={[styles.errorText]}>Incorrect phone number</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 58,
    borderRadius: 10,
    width: '100%',
    borderWidth: 0,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingRight: 0,
  },
  wrapperIconError: {
    position: 'absolute',
    right: -10,
    bottom: 10,
  },
  emailText: {
    fontWeight: '500',
    fontSize: 16,
  },
  placeholderText: {
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 12,
  },
  input: {
    minWidth: 300,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 23,
  },
  errorText: {
    fontSize: 14,
    width: '100%',
    fontWeight: '500',
    lineHeight: 21,
    color: errorColor,
    fontFamily: Satoshi400,
  },
  wrapperErrorText: {
    marginTop: 6,
  },
  codeText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#ffffff',
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
    color: '#ffffff',
    paddingVertical: 0,
  },
  flagStyle: {},
  disableBlock: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  containerInput: {
    height: 58,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 0,
    paddingLeft: 0,
    padding: 0,
  },
});
