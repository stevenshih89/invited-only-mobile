import React, {useContext} from 'react';
import * as S from './SummaryInfo.style';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {AuthContext} from 'contexts/AuthContext';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import Button from 'components/Button/Button';
import {calculateAge} from 'helpers/calculateAge';
import CheckIcon from 'assets/images/icons/check-star-white.svg';

const SummaryInfo = () => {
  const navigation = useAppNavigation();

  const {onBoarding} = useContext(AuthContext);

  const flattenedPhotos = onBoarding.filter((item: {photos: []}) => item.photos)[0]?.photos;
  const imageUser = flattenedPhotos?.find((photo: {id: number}) => photo.id === 0)?.image;
  const name: string = onBoarding.find((item: {name: string}) => item.name)?.name;
  const birthday = onBoarding.find((item: {birthday: number}) => item.birthday)?.birthday;
  const handleNext = () => {
    navigation.navigate('/invitation-code', {cameFromSummary: true});
  };

  return (
    <S.Background>
      <S.SafeArea>
        <S.Container>
          <S.LogoWrapper>
            <LogoPrimary2 />
          </S.LogoWrapper>

          <S.PhotoWrapper source={{uri: 'https://picsum.photos/200/300'}}>
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
