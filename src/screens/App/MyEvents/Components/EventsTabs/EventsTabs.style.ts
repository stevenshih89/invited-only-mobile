import styled from 'styled-components/native';
import {View, Text, ViewStyle} from 'react-native'; // Import base components and ViewStyle, TextStyle
import {RFValue} from 'react-native-responsive-fontsize'; // For responsive font size
import {whiteColor, blackColor} from 'constants/colors'; // Import needed colors
import {Satoshi500} from 'constants/fonts'; // Import needed font

export const TabBarLabel = styled(Text)`
  font-family: ${Satoshi500};
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(22)}px;
  text-align: center;
  text-transform: none; /* Prevent default uppercase */
  /* Color (active/inactive) is handled by tabBarActiveTintColor/tabBarInactiveTintColor */
`;

export const tabBarIndicatorStyle: ViewStyle = {
  backgroundColor: whiteColor /* Figma: #FFFFFF */,
  height: 3,
};

export const tabBarStyle: ViewStyle = {
  backgroundColor: blackColor,
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0,
  alignSelf: 'center',
};

export const tabBarItemStyle: ViewStyle = {
  flex: 1,
  flexDirection: 'column' /* Figma: column */,
  alignItems: 'center' /* Figma: center */,
  paddingHorizontal: 0, // Adjust padding if needed
  paddingVertical: 0, // Adjust padding if needed
};

export const TabItemContent = styled(View)`
  display: flex;
  flex-direction: row; /* Figma: row */
  justify-content: center; /* Figma: center */
  align-items: center; /* Figma: center */
  padding: 0px;
  gap: 8px; /* Figma: gap 8px */
  height: 22px; /* Figma: 22px */
`;

export const RequestCountBubble = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px;
  gap: 4px;
  width: 20px; /* Figma: 20px */
  height: 21px; /* Figma: 21px */
  background: rgba(56, 56, 56, 0.5); /* Figma: rgba(56, 56, 56, 0.5) */
  border-radius: 100px; /* Figma: 100px */
  margin-left: 6px; /* Approximated from Figma gap */
`;

export const RequestCountText = styled(Text)`
  font-family: ${Satoshi500};
  font-size: ${RFValue(12)}px; /* Figma: 12px */
  line-height: ${RFValue(15)}px; /* Figma: 15px */
  color: ${whiteColor};
`;
