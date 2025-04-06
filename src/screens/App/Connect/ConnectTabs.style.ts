import {blackColor, whiteColor, white40Color} from 'constants/colors';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {TextStyle, ViewStyle} from 'react-native';

// Style for the tab bar container itself
export const tabBarStyle: ViewStyle = {
  backgroundColor: blackColor, // Black background
};

// Style for the text label within tabs
export const tabBarLabelStyle: TextStyle = {
  fontSize: 13, // User updated size
  fontFamily: Satoshi500, // User updated font
  textTransform: 'capitalize',
  paddingVertical: 0,
  marginVertical: 0,
};

// Style for the indicator line below the active tab
export const tabBarIndicatorStyle: ViewStyle = {
  backgroundColor: whiteColor, // White underline for active tab
  height: 3, // Height of the underline
};

// Style for each individual tab item container
export const tabBarItemStyle: ViewStyle = {
  paddingHorizontal: 5,
  paddingVertical: 8,
  // width: 'auto', // Let navigator handle width
};
