import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import { whiteColor } from 'constants/colors';

export const StyledModal = styled(Modal).attrs({
  backdropColor: 'rgba(0, 0, 0, 0.99)',
  backdropOpacity: 0.8,
  coverScreen: true,
  useNativeDriver: false,
  propagateSwipe: true,
  swipeDirection: ['down'],
})`
  margin: 0;
  justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled.View`
  margin-horizontal: 24px;
  background-color: #111111;
  border-radius: 24px;
  padding-horizontal: 24px;
  padding-vertical: 32px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(32, 32, 32, 1);
  border-radius: 100px;
  padding: 6px;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(24, 932)}px;
  margin-bottom: 10px;
  max-width: 80%;
`;

export const Description = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  margin-bottom: 40px;
  opacity: 0.6;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 8px;
`;
