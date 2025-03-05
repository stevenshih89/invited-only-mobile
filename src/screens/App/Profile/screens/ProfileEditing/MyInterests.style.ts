import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, lightGray2Color, lightGray5Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {ActivityIndicator} from 'react-native';
import {screenWidth} from 'constants/common';

export const Container = styled.View`
  background-color: ${lightGray5Color};
  border-radius: 10px;
  margin-top: 24px;
  padding: 20px;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 812)}px;
  margin-bottom: 26px;
`;

export const ListContainer = styled.View`
  width: 100%;
`;

export const ItemWrapper = styled.View`
  padding-horizontal: 5px;
  max-width: ${screenWidth / 2 - 40}px;
  flex: 1;
`;

export const InterestButton = styled.TouchableOpacity<{isSelected?: boolean}>`
  flex: 1;
  border-radius: 30px;
  padding-vertical: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({isSelected}: {isSelected: boolean}) => (isSelected ? whiteColor : lightGray2Color)};
`;

export const InterestText = styled.Text`
  color: ${({isSelected}: {isSelected: boolean}) => (isSelected ? blackColor : whiteColor)};
  font-size: ${RFValue(13, 812)}px;
  font-family: ${Satoshi400};
`;

export const AddMoreButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 26px;
`;

export const AddMoreText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 812)}px;
`;

export const ItemSeparator = styled.View`
  height: 10px;
  width: 10px;
`;

export const LoadingIndicator = styled(ActivityIndicator)`
  background-color: ${lightGray5Color};
  border-radius: 10px;
  margin-top: 24px;
  padding: 20px;
`;
