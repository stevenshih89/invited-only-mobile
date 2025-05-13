import RadialGradient from 'react-native-radial-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import { whiteColor } from 'constants/colors';

export const Container = styled.View`
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

export const TagsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
`;

export const TagContainer = styled.View`
  background-color: #1c1c1c;
  border-radius: 100px;
  padding-vertical: 4px;
  padding-horizontal: 8px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const TagIconContainer = styled.View`
  background-color: rgba(1, 1, 1, 0.5);
  padding: 4px;
  border-radius: 100px;
`;

export const TagText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
`;

export const LocationText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  opacity: 0.5;
  font-size: ${RFValue(16, 932)}px;
`;

export const InterestsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const InterestTagsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

export const InterestTag = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 100px;
  padding: 4px;
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
