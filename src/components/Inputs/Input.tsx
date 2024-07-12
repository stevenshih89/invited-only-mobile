import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {FC, useRef} from 'react';
import {errorColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {InputProps} from 'typescript/interfaces';
import useStyles from 'components/Inputs/styles.ts';

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
  required
}) => {
  const inputRef = useRef<TextInput>(null);

  const styles = useStyles();
  const handleOnChange = (text: string): void => {
    onChange(text);
  };

  const onPress = (): void => {
    onPressFocus && onPressFocus();
    inputRef.current?.focus();
  };

  return (
    <View style={[containerStyle]}>
      {label && <Text style={[styles.titleText, {...labelStyle}]}>{label} {required && <Text style={{color: errorColor}}>*</Text>}</Text>}
      <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.container, containerInnerStyle]}>
        <TextInput
          ref={inputRef}
          onFocus={onPress}
          keyboardType={keyboardType}
          onBlur={onBlur}
          placeholder={placeholder}
          style={[styles.input, inputStyle, {width: InputIcon ? '90%' : '100%', color: isError ? errorColor : whiteColor}]}
          placeholderTextColor={placeholderTextColor}
          keyboardAppearance="dark"
          value={value}
          onChangeText={handleOnChange}
          onSubmitEditing={() => console.log('onSubmitEditing')}
          blurOnSubmit={false}
          editable={true}
          autoComplete={'off'}
          autoCorrect={false}
          autoCapitalize={'none'}
          textAlignVertical={'center'}
        />
        {InputIcon && <View style={styles.wrapperInputIcon}>{<InputIcon width={20} height={20} />}</View>}
      </TouchableOpacity>
      <View style={styles.wrapperErrorText}>
        <Text style={styles.errorText}>{isError ? errorText : ' '}</Text>
      </View>
    </View>
  );
};

export default Input;
