import RadialGradient from 'react-native-radial-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Satoshi500} from 'constants/fonts';
import {whiteColor} from 'constants/colors';

export const StyledRadialGradient = styled(RadialGradient)`
  padding: 16px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 8px;
`;

export const SubText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
`;

export const SectionTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  margin-bottom: 8px;
  opacity: 0.5;
`;

export const Container = styled.View``;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RowGap = styled(Row)`
  margin-top: 24px;
`;

export const Column = styled.View`
  flex: 1;
`;

export const ColumnStart = styled(Column)`
  align-items: flex-start;
`;

export const CountBadge = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  min-height: 24px;
  min-width: 24px;
`;

export const StyledRadialGap = styled(StyledRadialGradient)`
  gap: 24px;
`;
