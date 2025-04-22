import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ActivityIndicator } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import { lightGray2Color, whiteColor } from 'constants/colors';
import { Satoshi500, Satoshi700 } from 'constants/fonts';
import { screenWidth } from 'constants/common';

export const Container = styled.View`
  padding: 16px;
`;

export const StyledRadialGradient = styled(RadialGradient)`
  padding: 16px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 8px;
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  margin-bottom: 16px;
`;

export const InterestsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const InterestItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 100px;
  padding: 4px;
  margin-right: 8px;
`;

export const InterestImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 100px;
  margin-right: 8px;
`;

export const InterestText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
  margin-right: 4px;
`;

export const CounterContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 100px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const CounterText = styled.Text`
  font-family: ${Satoshi700};
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
`;

export const ListContainer = styled.View`
  width: 100%;
`;

export const ItemWrapper = styled.View`
  padding-horizontal: 5px;
  max-width: ${screenWidth / 2 - 40}px;
  flex: 1;
`;

export const InterestButton = styled.TouchableOpacity<{ isSelected?: boolean }>`
  flex: 1;
  border-radius: 30px;
  padding-vertical: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected }: { isSelected: boolean }) => (isSelected ? whiteColor : lightGray2Color)};
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
  background-color: rgba(13, 13, 13, 1);
  border-radius: 10px;
  margin-top: 24px;
  padding: 20px;
`;
