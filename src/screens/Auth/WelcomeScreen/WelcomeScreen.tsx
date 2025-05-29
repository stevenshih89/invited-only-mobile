import React from 'react';
import {Image, View} from 'react-native';
import * as S from './WelcomeScreen.style';
import WelcomeImage from 'assets/images/auth/welcome-image.png';
import {useAppNavigation} from 'hooks/useAppNavigation';
// eslint-disable-next-line import/no-unresolved
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import Button from 'components/Button/Button';
import BackButton from 'src/sharedComponents/BackButton/BackButton';
import {screenHeight} from 'constants/common';
import DonationHand from 'assets/images/icons/donation-hand.svg';
import DefenseShield from 'assets/images/icons/defense-shield.svg';
import MessagesBubble from 'assets/images/icons/messages-bubble.svg';
import LockStreamline from 'assets/images/icons/lock-streamline.svg';

const benefits = [
  {
    icon: DonationHand,
    title: 'Be Respectful',
    description: 'Treat your guests or hosts with courtesy and professionalism at all times.',
  },
  {
    icon: DefenseShield,
    title: 'Ensure Safety',
    description: 'Maintain a safe environment and report inappropriate behavior immediately.',
  },
  {
    icon: LockStreamline,
    title: 'Honesty is Key',
    description: 'Be clear about your table or event and its purpose—no misleading details.',
  },
  {
    icon: MessagesBubble,
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
          <BackButton onPress={() => navigation.goBack()} />
          <LogoPrimary2 />
          <S.Spacer />
        </S.HeaderRow>
        <S.WelcomeImageContainer>
          <S.WelcomeImage source={WelcomeImage} resizeMode="contain" />
        </S.WelcomeImageContainer>
        <S.BenefitsContainer>
          <S.BenefitsTitle>Welcome</S.BenefitsTitle>
          <S.BenefitsSubtitle>Please follow the house rules</S.BenefitsSubtitle>
          <S.BenefitsList>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <S.BenefitItem key={index}>
                  <S.BenefitIconContainer>
                    <Icon />
                  </S.BenefitIconContainer>
                  <S.BenefitContent>
                    <S.BenefitTitle>{benefit.title}</S.BenefitTitle>
                    <S.BenefitDescription>{benefit.description}</S.BenefitDescription>
                  </S.BenefitContent>
                </S.BenefitItem>
              );
            })}
          </S.BenefitsList>
          <Button
            variant="default"
            buttonStyle={{
              marginTop: 'auto',
            }}
            title="I agree, Continue"
            onPress={() => navigation.navigate('/verify-first-step' as never)}
          />
        </S.BenefitsContainer>
      </S.SafeArea>
    </S.Container>
  );
};

export default WelcomeScreen;
