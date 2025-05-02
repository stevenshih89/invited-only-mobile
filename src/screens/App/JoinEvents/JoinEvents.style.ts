import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight} from 'constants/common';
import {whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const EventCardContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 89%;
  height: 100%;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${screenHeight * 0.7}px;
`;

export const EventsScrollViewContainer = styled(ScrollView)``;

export const BlockAndReportContainer = styled.View`
  background-color: 'rgba(56, 56, 56, 0.3)';
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-bottom: 70px;
  margin-top: 20px;
`;

export const BlockAndReportButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  padding-vertical: 15px;
`;

export const BlockText = styled.Text`
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
  font-family: ${Satoshi500};
  line-height: 121%;
`;

export const BottomWrapper = styled.View`
  padding-top: 20px;
  padding-horizontal: 20px;
`;
