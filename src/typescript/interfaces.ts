import {KeyboardType, StyleProp, ViewStyle, TextStyle} from 'react-native';

export interface ButtonProps {
  title: string;
  onPress?: () => any;
  buttonContatinerStyle?: ViewStyle;
  buttonTitleStyle?: ViewStyle | TextStyle;
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'transparent';
}

export interface InputProps {
  value: string;
  label?: string;
  placeholder?: string;
  isError?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
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
}


export interface UserInfo
