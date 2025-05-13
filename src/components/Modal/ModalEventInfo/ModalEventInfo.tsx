import { FC } from 'react';
import Modal from 'react-native-modal';
import * as S from './ModalEventInfo.style';
import CloseIcon from 'assets/images/icons/close.svg';
import Button from 'components/Button/Button';

interface ModalEventInfoProps {
  isVisible: boolean;
  onClose: () => void;
  closeText: string;
  title: string;
  description: string;
}

const ModalEventInfo: FC<ModalEventInfoProps> = ({ isVisible, onClose, title, description, closeText }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      useNativeDriver={true}>
      <S.ModalContent>
        <S.CloseButton onPress={onClose}>
          <CloseIcon width={14} height={14} />
        </S.CloseButton>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.ButtonContainer>
          <Button title={closeText} onPress={onClose} />
        </S.ButtonContainer>
      </S.ModalContent>
    </Modal>
  );
};

export default ModalEventInfo;
