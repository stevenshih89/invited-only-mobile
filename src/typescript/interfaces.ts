import React from 'react';
import {KeyboardType, StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface ButtonProps {
  title: string | React.ReactNode;
  onPress?: () => any;
  buttonContatinerStyle?: ViewStyle;
  buttonTitleStyle?: ViewStyle | TextStyle;
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'transparent' | 'gray' | 'outline';
  id?: string;
  testID?: string;
}

export interface InputProps {
  value: string;
  label?: string;
  placeholder?: string;
  isError?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: TextStyle;
  containerInnerStyle?: StyleProp<ViewStyle>;
  onChange: (val: string) => void;
  onBlur?: () => void;
  onPressFocus?: () => void;
  errorText?: string;
  disableFastClear?: boolean;
  keyboardType?: KeyboardType;
  InputIcon?: any;
  required?: boolean;
  placeholderTextColor?: string;
  disabled?: boolean;
  editable?: boolean;
  testID?: string;
}

export interface UserInfo {
  name: any;
}
