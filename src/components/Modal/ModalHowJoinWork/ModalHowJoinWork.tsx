import {FC} from 'react';
import Modal from 'react-native-modal';
import * as S from './ModalHowJoinWork.style';
import CloseIcon from 'assets/images/icons/close.svg';
import Button from 'components/Button/Button';
import HowJoinWork from 'assets/images/app/how-join-work.png';
import StepsHowJoinWork from 'assets/images/app/steps-how-join-work.png';

interface ModalHowJoinWorkProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalHowJoinWork: FC<ModalHowJoinWorkProps> = ({isVisible, onClose}) => {
  const steps = [
    {title: 'Guest Swipes Events', description: "You've shown interest in event"},
    {title: 'Host Swiped You Back', description: 'The host likes your profile'},
    {title: 'Invited New Connection is made', description: "You're now connected with your guest!"},
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
            <S.MainImage source={HowJoinWork} resizeMode="contain" />
          </S.MainImageWrapper>
        </S.HeaderBackground>
        <S.ContentWrapper>
          <S.Title>How Join Work</S.Title>
          <S.StepsContainer>
            <S.StepsImage source={StepsHowJoinWork} resizeMode="contain" />
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

export default ModalHowJoinWork;
