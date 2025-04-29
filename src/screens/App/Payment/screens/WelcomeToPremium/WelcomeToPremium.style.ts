import {BlurView} from '@react-native-community/blur';
import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Pagination} from 'react-native-reanimated-carousel';
import {blackColor, whiteColor} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';
import Button from 'components/Button/Button';
import {Satoshi400, Satoshi500} from 'constants/fonts';

export const Root = styled.View`
  position: relative;
  flex: 1;
  background-color: ${blackColor};
`;

export const BackgroundContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 45%;
`;

export const TopSafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const TopBar = styled.View`
  padding-horizontal: 24px;
  margin-top: ${screenHeight / 14}px;
  align-items: flex-end;
`;

export const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const CloseButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${screenWidth / 9}px;
  height: ${screenWidth / 9}px;
  border-radius: 100px;
`;

export const StyledBlurView = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 100px;
  overflow: hidden;
`;

export const BottomSafeArea = styled.SafeAreaView`
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Content = styled.View``;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  color: ${whiteColor};
  margin-horizontal: 24px;
`;

export const Subtitle = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  opacity: 0.8;
  margin-top: 8px;
  margin-bottom: 24px;
  margin-horizontal: 24px;
`;

export const CarouselContainer = styled.View``;

export const PaginationContainer = styled.View`
  margin-top: 16px;
  align-items: center;
`;

export const StyledButton = styled(Button).attrs({
  buttonStyle: {
    marginHorizontal: 24,
    marginTop: 24,
  },
})``;

export const PaginationBasic = styled(Pagination.Basic).attrs({
  dotStyle: {backgroundColor: '#141414', width: 38, height: 4, borderRadius: 10},
  activeDotStyle: {backgroundColor: 'rgba(255, 255, 255, 1)', width: 38, height: 4, borderRadius: 10},
  containerStyle: {gap: 5, marginBottom: 10},
})``;
