import React, {JSX} from 'react';
import * as S from './Privacy.style';
import {usePrivacy} from './hooks/usePrivacy';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-right-s-line.svg';
import Button from 'components/Button/Button';
import HouseRulesBackground from 'assets/images/app/house-rules-background.png';
import {verifyFirstStepPath} from 'constants/pathLocations';

const Privacy = (): JSX.Element => {
  const {privaciesList, navigation, screen} = usePrivacy();

  return (
    <S.GradientBackground>
      <S.SafeArea>
        <S.Container>
          <S.HeaderRow>
            <S.BackButton onPress={() => navigation.goBack()}>
              <ArrowLeft style={{transform: [{rotate: '180deg'}]}} />
            </S.BackButton>
            <LogoPrimary2 />
            <S.Spacer />
          </S.HeaderRow>
          <S.BackgroundImage source={HouseRulesBackground} resizeMode="cover">
            <S.ImageOverlay />
          </S.BackgroundImage>
          <S.TitleSection hasScreen={!!screen}>
            <S.TitleText>Welcome</S.TitleText>
            <S.SubtitleText>Please follow these House Rules</S.SubtitleText>
          </S.TitleSection>
          <S.PrivacyList
            data={privaciesList}
            scrollEnabled={false}
            keyExtractor={({id}: {id: number}) => id.toString()}
            ItemSeparatorComponent={() => <S.ItemSeparator />}
            renderItem={({item: {title, subtitle, icon: Icon}}: {item: {title: string; subtitle: string; icon: any}}) => (
              <S.ListItem>
                <S.IconWrapper>
                  <Icon width={18} height={18} />
                </S.IconWrapper>
                <S.TextWrapper>
                  <S.ItemTitle>{title}</S.ItemTitle>
                  <S.ItemSubtitle>{subtitle}</S.ItemSubtitle>
                </S.TextWrapper>
              </S.ListItem>
            )}
          />
          {screen !== 'SafetyAndWellbeing' && (
            <S.ButtonContainer>
              <Button testID="agree-button" onPress={() => navigation.navigate(verifyFirstStepPath as never)} title="I Agree, Continue" />
            </S.ButtonContainer>
          )}
        </S.Container>
      </S.SafeArea>
    </S.GradientBackground>
  );
};

export default Privacy;
