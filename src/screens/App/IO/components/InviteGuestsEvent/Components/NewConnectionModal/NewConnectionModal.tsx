import React from 'react';
import { Modal, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { components } from '@invited-only/invited-only-api';
import { useNewConnectionAnimations } from './hooks/useNewConnectionAnimations';
import * as S from './NewConnectionModal.style';
import Card from 'screens/App/Components/Card/Card';
import { calculateAge } from 'helpers/calculateAge';
import useUser from 'hooks/user/useUser';
import { Stepper } from 'screens/App/Components/Stepper/Stepper';
import useNavigateToChat from 'screens/App/Chat/hooks/useNavigateToChat';

interface NewConnectionModalProps {
    visible: boolean;
    onClose: () => void;
    cardData: components['schemas']['User'] | components['schemas']['EventData'] | undefined;
    isEvent: boolean;
    eventId: string;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const NewConnectionModal: React.FC<NewConnectionModalProps> = ({ visible, onClose, cardData, isEvent, eventId }) => {
    const { user } = useUser();
    const { navigateToChat, isChatLoading, isChatFound } = useNavigateToChat({
        eventId: eventId,
        hostId: isEvent ? (cardData as components['schemas']['EventData'])?.hostId || '' : user?.uid || '',
        guestId: !isEvent ? (cardData as components['schemas']['User'])?.uid || '' : user?.uid || '',
        asGuest: isEvent ? true : false,
        isEnabled: cardData && 'uid' in cardData && 'hostId' in cardData,
    });
    const { card1AnimatedStyle, card2AnimatedStyle, stepperAnimatedStyle, buttonAnimatedStyle } =
        useNewConnectionAnimations({ visible });

    const steps = [
        { id: 1, title: isEvent ? 'Invited, Connection Made' : 'Invited', description: isEvent ? 'Invitation received and connection made' : 'Connection Made' },
        { id: 2, title: 'Host approved', description: isEvent ? 'The host approved your invitation' : 'You need to approve the guest' },
        { id: 3, title: 'Guest confirmed', description: isEvent ? 'The guest needs to accept the attending' : 'The guest needs to accept the invitation' },
    ];
    const currentStepIndex = 0;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <S.ModalBackdrop>
                <S.CloseButton onPress={onClose}>
                    <S.StyleCloseIcon />
                </S.CloseButton>
                <S.ModalContent width={screenWidth} height={screenHeight}>
                    <S.MatchTextContainer>
                        <S.MatchTextTitle>{isEvent ? 'Joined!' : 'Invited!'}</S.MatchTextTitle>
                        <S.MatchTextDescription>{isEvent ? 'Invitation received' : 'Connection Made'}</S.MatchTextDescription>
                    </S.MatchTextContainer>
                    <S.CardsContainer>
                        <S.CardContainer>
                            <Animated.View style={card1AnimatedStyle}>

                                <Card backgroundUrls={user?.photos || []} index={0} distanceFromTop={0} uid={user?.uid || ''} isTopCard={true} isStatic showDots={false} disabled={true}>
                                    <S.GuestInfoContainer>
                                        <S.GuestName>{user?.name}</S.GuestName>
                                        {user?.showAge && <S.GuestAge>, {calculateAge(user?.birthday || '')}</S.GuestAge>}
                                    </S.GuestInfoContainer>
                                </Card>
                            </Animated.View>
                            <Animated.View style={card2AnimatedStyle}>
                                {cardData && 'photos' in cardData && (
                                    <Card backgroundUrls={cardData.photos || []} index={0} distanceFromTop={0} uid={cardData.uid || ''} isTopCard={true} isStatic showDots={false} disabled={true}>
                                        <S.GuestInfoContainer>
                                            <S.GuestName>{cardData.name}</S.GuestName>
                                            {'birthday' in cardData && cardData.showAge && (
                                                <S.GuestAge>{calculateAge(cardData.birthday || '')}</S.GuestAge>
                                            )}
                                        </S.GuestInfoContainer>
                                    </Card>
                                )}
                            </Animated.View>
                        </S.CardContainer>
                    </S.CardsContainer>
                    <Animated.View style={stepperAnimatedStyle}>
                        <Stepper steps={steps} currentStepIndex={currentStepIndex} />
                    </Animated.View>
                    <Animated.View style={buttonAnimatedStyle}>
                        <S.ButtonContainer>
                            <S.SendMessageButton disabled={isChatLoading || !isChatFound} onPress={() => {
                                navigateToChat();
                                onClose();
                            }}>
                                <S.StyledSendMessageIconContainer>
                                    <S.StyledSendMessageIcon width={20} height={20} />
                                </S.StyledSendMessageIconContainer>
                                <S.SendMessageButtonText>Send Message</S.SendMessageButtonText>
                            </S.SendMessageButton>
                            <S.ContinueButton onPress={onClose}>
                                <S.StyledContinueInvitingIconContainer>
                                    <S.StyledContinueInvitingIcon width={20} height={20} />
                                </S.StyledContinueInvitingIconContainer>
                                <S.ContinueButtonText>Continue inviting</S.ContinueButtonText>
                            </S.ContinueButton>
                        </S.ButtonContainer>
                    </Animated.View>
                </S.ModalContent>
            </S.ModalBackdrop>
        </Modal>
    );
};

export default NewConnectionModal; 