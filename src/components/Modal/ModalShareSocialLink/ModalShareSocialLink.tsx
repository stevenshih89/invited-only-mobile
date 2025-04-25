import React, {FC} from 'react';
import Modal from 'react-native-modal';
import * as S from './ModalShareSocialLink.style';
import CloseIcon from 'assets/images/icons/close.svg';
import Button from 'components/Button/Button';

interface ModalShareSocialLinkProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalShareSocialLink: FC<ModalShareSocialLinkProps> = ({isVisible, onClose}) => {
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.94)'}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down', 'up']}>
      <S.Container>
        <S.CloseButton onPress={onClose}>
          <CloseIcon width={16} height={16} />
        </S.CloseButton>
        <S.ContentContainer>
          <S.Title>How to get your profile link?</S.Title>
          <S.InstructionText>To get your Instagram profile link on mobile:</S.InstructionText>
          <S.Step>1. Open the app and go to your profile.</S.Step>
          <S.Step>{`2. Tap "Share profile" button.`}</S.Step>
          <S.Step>{`3. Tap "Copy link".`}</S.Step>
          <S.FinalText>Now you can share your link!</S.FinalText>
          <Button title="Got it" onPress={onClose} />
        </S.ContentContainer>
      </S.Container>
    </Modal>
  );
};

export default ModalShareSocialLink;
