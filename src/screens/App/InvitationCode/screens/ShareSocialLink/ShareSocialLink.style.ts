import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { GradientBorderView } from '@good-react-native/gradient-border';
import { blackColor, whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

interface SocialButtonProps {
  isSelected?: boolean;
}
export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${blackColor};
  padding: 24px;
  justify-content: space-between;
`;

export const UpperContent = styled.View`
  flex: 1;
  gap: 8px;
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  color: ${whiteColor};
  margin-bottom: 12px;
`;

export const Description = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  opacity: 0.8;
  margin-bottom: 32px;
`;

export const SocialButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 32px;
`;

export const SocialButton = styled.TouchableOpacity<SocialButtonProps>`
  flex: 1;
  height: 56px;
  border-radius: 28px;
  background-color: ${({ isSelected }: SocialButtonProps) => (isSelected ? '#333333' : '#1E1E1E')};
  align-items: center;
  justify-content: center;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 56px;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 0 16px;
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
`;

export const HelpButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  gap: 8px;
`;

export const HelpText = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
`;

export const GradientCell = styled(GradientBorderView)`
  border-width: 1px;
  border-radius: 100px;
  background-color: ${({ backgroundColor }: { backgroundColor: string }) => backgroundColor};
  height: 56px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ButtonsContainer = styled.View`
  margin-top: 'auto';
  gap: 16px;
`;
