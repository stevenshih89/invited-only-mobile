import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {FC, useRef} from 'react';
import {errorColor, lightGray2Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {InputProps} from 'typescript/interfaces';

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
  value,
  label,
  keyboardType = 'default',
  InputIcon,
}) => {
  const inputRef = useRef<TextInput>(null);

  const handleOnChange = (text: string): void => {
    onChange(text);
  };

  const onPress = (): void => {
    onPressFocus && onPressFocus();
    inputRef.current?.focus();
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 56,
      borderRadius: 10,
      borderWidth: 0,
      backgroundColor: lightGray2Color,
      flexDirection: 'row',
      paddingRight: 8,
      paddingBottom: 8,
      justifyContent: 'space-between',
    },
    titleText: {
      marginBottom: 12,
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      ...labelStyle,
    },
    input: {
      width: InputIcon ? '90%' : '100%',
      minWidth: 200,
      paddingLeft: 12,
      paddingTop: 8,
      paddingBottom: 0,
      color: isError ? errorColor : whiteColor,
      fontSize: RFValue(18, 812),
    },
    errorText: {
      fontSize: RFValue(14, 812),
      fontFamily: Satoshi500,
      color: errorColor,
    },
    wrapperErrorText: {
      height: 22,
      marginTop: 2,
      marginBottom: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <View style={[containerStyle]}>
      {label && <Text style={styles.titleText}>{label}</Text>}
      <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.container, containerInnerStyle]}>
        <TextInput
          ref={inputRef}
          onFocus={onPress}
          keyboardType={keyboardType}
          onBlur={onBlur}
          placeholder={placeholder}
          style={[styles.input, inputStyle]}
          placeholderTextColor={transparentWhite30Color}
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
        {InputIcon && (
          <View style={{height: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 8, width: 20}}>
            {<InputIcon width={20} height={20} />}
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.wrapperErrorText}>
        <Text style={styles.errorText}>{isError ? errorText : ' '}</Text>
      </View>
    </View>
  );
};

export default Input;
