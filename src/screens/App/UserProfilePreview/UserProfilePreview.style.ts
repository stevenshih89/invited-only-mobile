import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import RadialGradient from 'react-native-radial-gradient';
import {Satoshi500} from 'constants/fonts';
import {blackColor, whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';

export const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${blackColor};
`;

export const MainContainer = styled.View`
  flex: 1;
  padding-top: ${screenHeight / 48}px;
  padding-horizontal: 20px;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const ContentContainer = styled.View`
  padding-top: 20px;
`;

export const ProfileContainer = styled.View`
  background-color: ${blackColor};
  flex: 1;
`;

export const StyledRadialGradient = styled(RadialGradient)`
  padding: 16px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 8px;
`;

export const SectionTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  margin-bottom: 8px;
  opacity: 0.5;
`;

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
  line-height: 16.94px;
`;
