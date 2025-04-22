import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import RadialGradient from 'react-native-radial-gradient';
import { Switch } from '@rneui/themed';
import MaskInput from 'react-native-mask-input';
import { grayScale600, whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

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
  margin-bottom: 24px;
`;

export const InputContainer = styled.View`
  margin-bottom: 24px;
`;

export const InputLabel = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  margin-bottom: 12px;
`;

export const RequiredMark = styled.Text`
  color: ${whiteColor};
`;

export const LockedInputContainer = styled.View`
  border-radius: 100px;
  border-color: rgba(255, 255, 255, 0.05);
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const LockedInputText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
  text-transform: capitalize;
`;

export const DateInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.04);
`;

export const StyledMaskInput = styled(MaskInput)`
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
  border-radius: 100px;
`;

export const ShowAgeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ShowAgeText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
`;

export const HeightContainer = styled.View`
  margin-bottom: 24px;
`;

export const HeightSelectButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.04);
  padding: 16px;
  border-radius: 100px;
  position: relative;
`;

export const HeightText = styled.Text<{ isEmpty?: boolean }>`
  color: ${({ isEmpty }: { isEmpty?: boolean }) => (isEmpty ? grayScale600 : whiteColor)};
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 932)}px;
`;

export const ArrowContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const StyledSwitch = styled(Switch)`
  transform: scale(0.7);
`;
