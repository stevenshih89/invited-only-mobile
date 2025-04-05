import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// Colors and Fonts (assuming you're importing them)
import {black60Color, black3Color, whiteColor, lightGray5Color, lightGray9Color, lightRedColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';

// Containers
export const Container = styled.View`
  flex: 1;
  padding-bottom: 40px;
`;

export const OverlayContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: ${screenWidth}px;
  height: ${screenHeight}px;
  z-index: 1;
  background-color: ${black60Color};
`;

export const StepHintContainer = styled.View`
  z-index: 111;
`;

export const WrapperSelectYourDesiredCompany = styled.View`
  background-color: ${black3Color};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: ${screenHeight / 42}px;
`;

export const WrapperOtherFriends = styled.View`
  background-color: ${black3Color};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: ${screenHeight / 36}px;
`;

export const WrapperPersonIcon = styled.View`
  background-color: ${lightGray5Color};
  width: 30px;
  height: 30px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const RowMale = styled.View`
  justify-content: space-between;
  margin-top: ${screenHeight / 35}px;
`;

export const RowButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const RowButtonsOtherFriends = styled.View`
  flex-direction: row;
  margin-top: ${screenHeight / 80}px;
`;

export const WrapperTextCount = styled.View`
  flex: 1;
  height: 54px;
  justify-content: center;
  border: 1px solid ${lightGray9Color};
  border-radius: 10px;
  margin-horizontal: 10px;
`;

export const HandIconContainer = styled.View`
  position: absolute;
  bottom: -24px;
  right: -16px;
`;

// Texts
export const TextSelectYourDesiredCompany = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 812)}px;
  color: ${whiteColor};
  margin-bottom: ${RFValue(16, 812)}px;
`;

export const TextOtherFriend = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 812)}px;
  color: ${whiteColor};
  margin-bottom: ${screenHeight / 42}px;
`;

export const TextPersonGender = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 812)}px;
  color: ${whiteColor};
  margin-bottom: ${RFValue(8, 812)}px;
`;

export const TextPersonGenderFriends = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 812)}px;
  color: ${whiteColor};
  margin-top: ${screenHeight / 32}px;
`;

export const TextButton = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 812)}px;
  color: ${whiteColor};
`;

export const TextCountFriends = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 812)}px;
  color: ${whiteColor};
  border: 1px solid ${lightGray9Color};
  border-radius: 10px;
  text-align: center;
  width: 92px;
  height: 41px;
  padding-vertical: 6px;
  margin-horizontal: ${screenWidth / 38}px;
`;

export const TextCount = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 812)}px;
  color: ${whiteColor};
  text-align: center;
`;

export const ErrorText = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 812)}px;
  color: ${lightRedColor};
  margin-bottom: 10px;
`;

// Buttons

export const ButtonPress = styled.TouchableOpacity`
  flex: 1;
  background-color: ${lightGray9Color};
  border-radius: 10px;
  height: 54px;
  align-items: center;
  justify-content: center;
`;

export const ButtonPressOtherFriends = styled.TouchableOpacity`
  background-color: ${lightGray9Color};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 92px;
  height: 41px;
`;
