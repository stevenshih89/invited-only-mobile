import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';
import {whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';

export const StyledModal = styled(Modal).attrs({
  useNativeDriver: false,
  propagateSwipe: true,
  backdropColor: 'rgba(0, 0, 0, 0.94)',
  swipeDirection: ['down'],
})`
  margin: 0;
  justify-content: center;
`;

export const Container = styled.View`
  background-color: #111;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 16px;
`;

export const ContentContainer = styled.View`
  padding-horizontal: 8px;
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(24, 932)}px;
  color: ${whiteColor};
  margin-bottom: 24px;
`;

export const InstructionText = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  opacity: 0.8;
  margin-bottom: 8px;
`;

export const Step = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  opacity: 0.8;
  margin-bottom: 8px;
`;

export const FinalText = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  opacity: 0.8;
  margin-top: 8px;
  margin-bottom: 32px;
`;

export const CloseButton = styled.TouchableOpacity`
  align-self: flex-end;
  background-color: #202020;
  border-radius: 100px;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

export const GotItButton = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: ${whiteColor};
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export const GotItText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: #000000;
`;
