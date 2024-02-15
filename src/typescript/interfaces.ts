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
  buttonInputStyle?: StyleProp<ViewStyle>;
  labelStyle?: ViewStyle;
  onChange: (val: string) => void;
  onBlur?: () => void;
  onPressFocus?: () => void;
  errorText?: string;
  disableFastClear?: boolean;
  keyboardType?: KeyboardType;
}
