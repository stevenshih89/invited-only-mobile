import React, {JSX} from 'react';
import * as S from './Privacy.style';
import {usePrivacy} from './hooks/usePrivacy';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Button from 'components/Button/Button';
import {verifyFirstStepPath} from 'constants/pathLocations';

const Privacy = (): JSX.Element => {
  const {objWithAccountType, accountType, privaciesListHost, privaciesListGuest, navigation, screen} = usePrivacy();

  return (
    <S.GradientBackground>
      <S.SafeArea>
        <S.Container>
          <S.HeaderRow>
            <S.BackButton onPress={() => navigation.goBack()}>
              <ArrowLeft />
            </S.BackButton>
            <LogoPrimary2 />
            <S.Spacer />
          </S.HeaderRow>
          <S.TitleSection hasScreen={!!screen}>
            <S.TitleText>Welcome</S.TitleText>
            <S.SubtitleText>
              Please follow these{' '}
              {objWithAccountType?.accountType
                ? objWithAccountType?.accountType === 'host'
                  ? 'Host'
                  : 'Guest'
                : accountType === 'host'
                  ? 'Host'
                  : 'Guest'}{' '}
              House Rules
            </S.SubtitleText>
          </S.TitleSection>
          <S.PrivacyList
            data={
              objWithAccountType?.accountType
                ? objWithAccountType?.accountType === 'host'
                  ? privaciesListHost
                  : privaciesListGuest
                : accountType === 'host'
                  ? privaciesListHost
                  : privaciesListGuest
            }
            keyExtractor={({id}: {id: number}) => id.toString()}
            ItemSeparatorComponent={() => <S.ItemSeparator />}
            renderItem={({item: {title, subtitle}}: {item: {title: string; subtitle: string}}) => (
              <S.ListItem>
                <S.ItemHeader>
                  <CheckIcon />
                  <S.ItemTitle>{title}</S.ItemTitle>
                </S.ItemHeader>
                <S.ItemSubtitle>{subtitle}</S.ItemSubtitle>
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
