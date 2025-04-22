import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {isValidPhoneNumber, parsePhoneNumber, type PhoneNumber} from 'libphonenumber-js';
import PhoneInput from 'react-native-phone-number-input';
import * as S from './InputPhoneView.style';
import {errorColor, lightGray2Color, transparentGray60Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import ArrowDown from 'assets/images/icons/arrow-down.svg';

interface IInputPhoneViewProps {
  onChangeFormattedText?: (text: string) => void;
  value: string;
  testID?: string;
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
    <S.Container style={props.containerStyle}>
      <S.TouchableContainer activeOpacity={1} onPress={onPress}>
        <S.TextContainerStyle>
          <PhoneInput
            ref={phoneRef}
            autoFocus
            defaultCode={getDefaultCountryCode() as any}
            defaultValue={getDefaultPhoneNumber()}
            placeholder={props.placeholder ? props.placeholder : 'Phone Number'}
            codeTextStyle={[
              props.codeTextStyle,
              {
                color: !phoneValid && phoneNumber.length > 0 && !props.validationDisabled ? errorColor : '#ffffff',
                fontWeight: '400',
                fontSize: 16,
              },
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
              props.containerStyle,
              {
                width: '100%',
                backgroundColor: lightGray2Color,
                paddingTop: 0,
                paddingRight: 0,
                borderColor: !phoneValid && phoneNumber.length > 0 && !props.validationDisabled ? errorColor : 'transparent',
                borderWidth: 1,
                borderStyle: 'solid',
                height: 58,
                borderRadius: 10,
              },
            ]}
            textContainerStyle={[
              props.textContainer,
              {backgroundColor: lightGray2Color, flex: 1, borderRadius: 10, paddingVertical: 0, paddingLeft: 0, padding: 0},
            ]}
            textInputStyle={[
              props.textStyle,
              {
                color: !phoneValid && phoneNumber.length > 0 && !props.validationDisabled ? errorColor : '#ffffff',
                fontWeight: '400',
                fontSize: 16,
                paddingVertical: 0,
              },
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
            flagButtonStyle={props.flagButtonStyle}
          />
        </S.TextContainerStyle>
      </S.TouchableContainer>
      <S.WrapperErrorText>
        {!phoneValid && phoneNumber.length > 0 && !props.validationDisabled ? <S.ErrorText>Incorrect phone number</S.ErrorText> : null}
      </S.WrapperErrorText>
    </S.Container>
  );
};
