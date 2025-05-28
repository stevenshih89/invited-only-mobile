import * as S from './SummaryInfo.style';

import useCreateUser from './hooks/useCreateUser';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import Button from 'components/Button/Button';
import {calculateAge} from 'helpers/calculateAge';
import CheckIcon from 'assets/images/icons/check-star-white.svg';
import {useAuthStore} from 'src/store/authStore';
import AppLoader from 'screens/App/AppLoader/AppLoader';

const SummaryInfo = () => {
  const {onBoarding} = useAuthStore();

  const imageUser = onBoarding.registrationDetails?.verificationPhoto;
  const name: string = onBoarding.registrationDetails?.name || '';
  const birthday = onBoarding.registrationDetails?.birthday || '';

  const {handleCreateUser, isPending} = useCreateUser();

  if (isPending) {
    return (
      <S.Container>
        <AppLoader />
      </S.Container>
    );
  }

  const handleNext = () => {
    handleCreateUser();
  };

  return (
    <S.Background>
      <S.SafeArea>
        <S.Container>
          <S.LogoWrapper>
            <LogoPrimary2 />
          </S.LogoWrapper>

          <S.PhotoWrapper source={{uri: imageUser}}>
            <S.BadgeContainer>
              <S.BadgeContent>
                <S.BadgeBlur blurType="dark" />
                <S.BadgeText>Photo verified</S.BadgeText>
                <CheckIcon />
              </S.BadgeContent>
            </S.BadgeContainer>

            <S.NameOverlay>
              <S.NameText>{`${name}${birthday ? ',' : ''}`}</S.NameText>
              <S.AgeText>{calculateAge(birthday)}</S.AgeText>
            </S.NameOverlay>

            <S.GradientOverlay />
          </S.PhotoWrapper>

          <S.MessageWrapper>
            <S.MessageTitle>Congratulations!</S.MessageTitle>
            <S.MessageSubtitle>Your photo has been successfully verified.</S.MessageSubtitle>
          </S.MessageWrapper>

          <S.ButtonWrapper>
            <Button title="Continue" onPress={handleNext} />
          </S.ButtonWrapper>
        </S.Container>
      </S.SafeArea>
    </S.Background>
  );
};

export default SummaryInfo;
