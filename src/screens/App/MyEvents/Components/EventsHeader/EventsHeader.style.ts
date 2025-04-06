import {whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';
import {Satoshi500} from 'constants/fonts';
import {Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: ${RFValue(32, 892)}px;
`;
export const EventsHeaderTitle = styled(Text)`
  font-family: ${Satoshi500};
  font-size: 20px;
  color: ${whiteColor};
`;
export const EventsHeaderSubtitle = styled(Text)`
  font-size: 16px;
`;
