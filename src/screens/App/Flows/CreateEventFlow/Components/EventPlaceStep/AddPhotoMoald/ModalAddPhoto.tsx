import { FC } from 'react';
import Modal from 'react-native-modal';
import PlusIcon from 'assets/images/icons/plus.svg';
import ImageIcon from 'assets/images/icons/image.svg';
import CameraIcon from 'assets/images/icons/camera.svg';
import * as S from './ModalAddPhoto.styles';

interface ModalAddProps {
  isVisible: boolean;
  onClose: () => void;
  openCamera: () => void;
  openLibrary: () => void;
  addPlaceholderPhoto: () => void;
}

const ModalAddPhoto: FC<ModalAddProps> = ({isVisible, onClose, openLibrary, openCamera, addPlaceholderPhoto}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}>
      <S.ModalContainer>
        <S.ModalDivider />
        <S.ModalTitle>Event photos</S.ModalTitle>
        
        <S.OptionButton onPress={openCamera}>
          <CameraIcon />
          <S.OptionText>Use a camera</S.OptionText>
        </S.OptionButton>
        
        <S.OptionButton onPress={openLibrary}>
          <ImageIcon />
          <S.OptionText>Upload from galery</S.OptionText>
        </S.OptionButton>
        
        <S.PlaceholderButton onPress={addPlaceholderPhoto}>
          <PlusIcon />
          <S.OptionText>Use a placeholder</S.OptionText>
        </S.PlaceholderButton>
      </S.ModalContainer>
    </Modal>
  );
};

export default ModalAddPhoto;
