import {FC} from 'react';
import Modal from 'react-native-modal';
import * as S from './ModalDefault.style';
import CloseIcon from 'assets/images/icons/close.svg';
import Button from 'components/Button/Button';

interface ModalDefaultProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
  title: string;
  description: string;
}

const ModalDefault: FC<ModalDefaultProps> = ({isVisible, onConfirm, onClose, confirmText, cancelText, title, description}) => {
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
          <Button title={confirmText} onPress={onConfirm} />
        </S.ButtonContainer>
        <Button title={cancelText} variant="gray" onPress={onClose} />
      </S.ModalContent>
    </Modal>
  );
};

export default ModalDefault;
