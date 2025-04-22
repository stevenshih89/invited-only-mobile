import Modal from 'react-native-modal';
import type { FC} from 'react';
import * as S from './ModalReplacePhoto.style';
import Button from 'components/Button/Button';

const ModalReplacePhoto: FC<{
  isVisible: boolean;
  onClose: () => void;
  replaceImage: () => void;
}> = ({isVisible, onClose, replaceImage}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <S.Container>
        <S.HandleBar />
        <S.TitleText>Are you sure you want to replace the image?</S.TitleText>
        <Button title="Yes, replace" onPress={replaceImage} />
        <Button title="Cancel" variant="transparent" onPress={onClose} />
      </S.Container>
    </Modal>
  );
};

export default ModalReplacePhoto;
