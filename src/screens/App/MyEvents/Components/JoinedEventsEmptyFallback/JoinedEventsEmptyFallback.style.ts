import { ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { blackColor, whiteColor } from 'constants/colors';
import { screenHeight } from 'constants/common';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

export const FallbackContainer = styled.View`
  flex: 1;
  background-color: ${blackColor};
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 10px;
`;

export const EmptyFallbackImage = styled(FastImage)`
  width: 200px;
  height: 300px;
  margin-bottom: 10px;
`;

export const FlatListWrapper = styled.FlatList`
  justify-content: center;
  align-items: center;
`;

export const columnWrapperStyle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2
};

export const FallbackTextContainer = styled.View`
  display: flex;
  width: 60%;
  margin-top: ${screenHeight / 40}px;
  padding-horizontal: 10px;
  padding-bottom: 10px;
`;

export const TextContainer = styled.View`
  padding-bottom: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const FallbackTitleText = styled.Text`
  flex-direction: column;
  font-family: ${Satoshi500};
  align-items: center;

  justify-content: center;
  gap: 8px;
  color: ${whiteColor};
  font-size: ${RFValue(24, 932)};
`;

export const FallbackInstructorTex = styled.Text`
  font-family: ${Satoshi400};
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  color: ${whiteColor};
  opacity: 0.7;
  font-size: ${RFValue(16, 932)};
`;
