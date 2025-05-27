import React from 'react';
import * as S from './WelcomeScreen.style';
import WelcomeImage from 'assets/images/auth/welcome-image.png';
import { useAppNavigation } from 'hooks/useAppNavigation';
// eslint-disable-next-line import/no-unresolved
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import BenefitIcon1 from 'assets/images/icons/respect-icon.png';
import BenefitIcon2 from 'assets/images/icons/safety-icon.png';
import BenefitIcon3 from 'assets/images/icons/honesty-icon.png';
import BenefitIcon4 from 'assets/images/icons/privacy-icon.png';

const benefits = [
    {
        title: 'Be Respectful',
        description: 'Treat your guests or hosts with courtesy and professionalism at all times.',
    },
    {
        title: 'Ensure Safety',
        description: 'Maintain a safe environment and report inappropriate behavior immediately.',
    },
    {
        title: 'Honesty is Key',
        description: 'Be clear about your table or event and its purpose—no misleading details.',
    },
    {
        title: 'Respect Privacy',
        description: 'Do not share personal information or media without consent.',
    },
];

const WelcomeScreen = () => {
    const navigation = useAppNavigation();
    return (
        <S.Container>
            <S.SafeArea>
                <S.HeaderRow>
                    <S.BackButton onPress={() => navigation.goBack()}>
                        <ArrowLeft />
                    </S.BackButton>
                    <LogoPrimary2 />
                    <S.Spacer />
                </S.HeaderRow>
                <S.WelcomeImage source={WelcomeImage} />
            </S.SafeArea>
            <S.BenefitsContainer>
                <S.BenefitsTitle>Welcome</S.BenefitsTitle>
                <S.BenefitsSubtitle>Please follow the house rules</S.BenefitsSubtitle>
                <S.BenefitsList>
                    {benefits.map((benefit, index) => (
                        <S.BenefitItem key={index}>
                            <S.BenefitContent>
                                <S.BenefitTitle>{benefit.title}</S.BenefitTitle>
                                <S.BenefitDescription>{benefit.description}</S.BenefitDescription>
                            </S.BenefitContent>
                        </S.BenefitItem>
                    ))}
                </S.BenefitsList>
                <S.ButtonContainer onPress={() => navigation.navigate('/verify-first-step' as never)}>
                    <S.ButtonText>I agree, Continue</S.ButtonText>
                </S.ButtonContainer>
            </S.BenefitsContainer>
        </S.Container>
    );
};

export default WelcomeScreen;