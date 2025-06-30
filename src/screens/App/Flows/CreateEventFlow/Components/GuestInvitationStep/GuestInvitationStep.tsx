import {useFormikContext} from 'formik';
import {components} from '@invited-only/invited-only-api';
import {FC} from 'react';
import {View} from 'react-native';
import * as S from './GuestInvitationStep.style';
import InvitationEventTicket from 'assets/images/app/invitation-event-ticket.png';
import {screenHeight} from 'constants/common';
import MinusIcon from 'assets/images/icons/minus-white.svg';
import PlusIcon from 'assets/images/icons/plus-white.svg';

interface GuestInvitationStepProps {
    handleNextStep: () => void;
}

const GuestInvitationStep: FC<GuestInvitationStepProps> = ({handleNextStep}) => {
    const {values, setFieldValue} = useFormikContext<Partial<components['schemas']['EventData']>>();
    const {maleFriend, femaleFriend} = values;

    const incrementFemale = () => setFieldValue('femaleFriend', (femaleFriend ?? 0) + 1);
    const decrementFemale = () => (femaleFriend ?? 0) > 0 && setFieldValue('femaleFriend', (femaleFriend ?? 0) - 1);

    const incrementMale = () => setFieldValue('maleFriend', (maleFriend ?? 0) + 1);
    const decrementMale = () => (maleFriend ?? 0) > 0 && setFieldValue('maleFriend', (maleFriend ?? 0) - 1);

    return (
        <S.Wrapper>
            <S.TicketWrapper>
                <S.TicketBackground source={InvitationEventTicket} imageStyle={{height: screenHeight / 6}}>
                    <S.TicketTitle>Invitation</S.TicketTitle>
                </S.TicketBackground>
            </S.TicketWrapper>
            <View>
                <S.CounterRow>
                    <S.IconButton onPress={decrementFemale} activeOpacity={0.8}>
                        <MinusIcon />
                    </S.IconButton>
                    <S.CountText active={(femaleFriend ?? 0) > 0}>{femaleFriend}</S.CountText>
                    <S.IconButton onPress={incrementFemale} activeOpacity={0.8}>
                        <PlusIcon />
                    </S.IconButton>
                </S.CounterRow>
                <S.DescriptionText>{`How many women would\nyou like to invite?`}</S.DescriptionText>
            </View>
            <View>
                <S.CounterRow>
                    <S.IconButton onPress={decrementMale} activeOpacity={0.8}>
                        <MinusIcon />
                    </S.IconButton>
                    <S.CountText active={(maleFriend ?? 0) > 0}>{maleFriend}</S.CountText>
                    <S.IconButton onPress={incrementMale} activeOpacity={0.8}>
                        <PlusIcon />
                    </S.IconButton>
                </S.CounterRow>
                <S.DescriptionText>{`How many men would\nyou like to invite?`}</S.DescriptionText>
            </View>
            <S.ButtonsContainer>
                <S.ContinueButton onPress={handleNextStep}>
                    <S.ContinueButtonText>{'Continue'}</S.ContinueButtonText>
                </S.ContinueButton>
            </S.ButtonsContainer>
        </S.Wrapper>
    );
};

export default GuestInvitationStep;
