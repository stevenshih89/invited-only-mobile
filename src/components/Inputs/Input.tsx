import {Text, TextInput, View} from 'react-native';
import {FC, useRef} from 'react';
import {errorColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {InputProps} from 'typescript/interfaces';
import * as S from './Input.style';

const Input: FC<InputProps> = ({
  errorText,
  onChange,
  onBlur,
  onPressFocus,
  containerStyle,
  inputStyle,
  containerInnerStyle,
  labelStyle,
  isError = false,
  placeholder,
  placeholderTextColor = transparentWhite30Color,
  value,
  label,
  keyboardType = 'default',
  InputIcon,
  required,
  disabled,
  editable = true,
}) => {
  const inputRef = useRef<TextInput>(null);

  const handleOnChange = (text: string): void => {
    onChange(text);
  };

  const onPress = (): void => {
    onPressFocus && onPressFocus();
    inputRef.current?.focus();
  };

  return (
    <View style={containerStyle}>
      {label && (
        <S.TitleText style={labelStyle}>
          {label} {required && <Text style={{color: errorColor}}>*</Text>}
        </S.TitleText>
      )}
      <S.InputTouchableWrappper activeOpacity={1} onPress={onPress} style={containerInnerStyle}>
        <S.InputField
          ref={inputRef}
          onFocus={onPress}
          keyboardType={keyboardType}
          onBlur={onBlur}
          placeholder={placeholder}
          style={[inputStyle, {width: InputIcon ? '90%' : '100%', color: isError ? errorColor : whiteColor}]}
          placeholderTextColor={placeholderTextColor}
          keyboardAppearance="dark"
          value={value}
          onChangeText={handleOnChange}
          onSubmitEditing={() => console.log('onSubmitEditing')}
          blurOnSubmit={false}
          editable={editable}
          autoComplete={'off'}
          autoCorrect={false}
          autoCapitalize={'none'}
          textAlignVertical={'center'}
        />
        {InputIcon && <S.WrapperInputIcon>{<InputIcon width={20} height={20} />}</S.WrapperInputIcon>}
      </S.InputTouchableWrappper>
      <S.WrapperErrorText>
        <S.ErrorText>{isError ? errorText : ' '}</S.ErrorText>
      </S.WrapperErrorText>
    </View>
  );
};

export default Input;
