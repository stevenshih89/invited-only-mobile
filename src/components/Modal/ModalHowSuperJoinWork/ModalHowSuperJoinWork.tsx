import {FC} from 'react';
import Modal from 'react-native-modal';
import * as S from './ModalHowSuperJoinWork.style';
import CloseIcon from 'assets/images/icons/close.svg';
import Button from 'components/Button/Button';
import HowSuperJoinWork from 'assets/images/app/how-super-join-work.png';
import StepsHowSuperJoinWork from 'assets/images/app/steps-how-super-join-work.png';

interface ModalHowSuperJoinWorkProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalHowSuperJoinWork: FC<ModalHowSuperJoinWorkProps> = ({isVisible, onClose}) => {
  const steps = [
    {title: 'You Send Super Join', description: 'Press Super Join button when swiping.'},
    {
      title: 'Your Profile Gets More Attention',
      description: 'Super Join increases the chances of a quicker response and higher engagement.',
    },
  ];
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      useNativeDriver={true}>
      <S.ModalContent>
        <S.HeaderBackground>
          <S.CloseButton onPress={onClose}>
            <CloseIcon width={14} height={14} />
          </S.CloseButton>
          <S.MainImageWrapper>
            <S.MainImage source={HowSuperJoinWork} resizeMode="contain" />
          </S.MainImageWrapper>
        </S.HeaderBackground>
        <S.ContentWrapper>
          <S.Title>How Super Join Work</S.Title>
          <S.StepsContainer>
            <S.StepsImage source={StepsHowSuperJoinWork} resizeMode="contain" />
            <S.StepList>
              {steps.map((step, idx) => (
                <S.StepItem key={idx}>
                  <S.StepTextWrapper>
                    <S.StepTitle>{step.title}</S.StepTitle>
                    <S.StepDescription>{step.description}</S.StepDescription>
                  </S.StepTextWrapper>
                </S.StepItem>
              ))}
            </S.StepList>
          </S.StepsContainer>
          <S.ButtonContainer>
            <Button title="Got it" variant="default" onPress={onClose} />
          </S.ButtonContainer>
        </S.ContentWrapper>
      </S.ModalContent>
    </Modal>
  );
};

export default ModalHowSuperJoinWork;
