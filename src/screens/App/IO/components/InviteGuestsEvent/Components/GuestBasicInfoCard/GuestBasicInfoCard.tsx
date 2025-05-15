import { FC } from 'react';
import { View } from 'react-native';
import { components } from '@invited-only/invited-only-api';
import * as S from './GuestBasicInfoCard.style';
import { useGenderSpecs } from 'hooks/useGenderSpecs';
import InterestImageSmallList from 'screens/App/Components/Intrests/InterestImageSmallList';

interface GuestBasicInfoCardProps {
  homeAddress: string;
  work: components['schemas']['Work'];
  gender: 'man' | 'woman' | 'other';
  listOfInterestsImages: components['schemas']['Interest'][];
}

const GuestBasicInfoCard: FC<GuestBasicInfoCardProps> = ({ homeAddress, work, gender, listOfInterestsImages = [] }) => {
  const { genderIcon: GenderIcon, genderText } = useGenderSpecs(gender);

  return (
    <S.StyledRadialGradient
      colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
      stops={[0, 0.695, 1]}
      center={[220, -386]}
      radius={400}>
      <S.SectionTitle>Basics</S.SectionTitle>
      <S.TagsContainer>
        <S.TagContainer>
          <S.TagIconContainer>
            {GenderIcon && <GenderIcon />}
          </S.TagIconContainer>
          {genderText && <S.TagText>{genderText}</S.TagText>}
        </S.TagContainer>
        {homeAddress && (
          <S.Container>
            <S.LocationText>lives in</S.LocationText>
            <S.TagContainer>
              <S.TagText>{homeAddress}</S.TagText>
            </S.TagContainer>
          </S.Container>
        )}
        {work?.title && (
          <S.Container>
            <S.LocationText>, and works as a</S.LocationText>
            <S.TagContainer>
              <S.TagText>{work?.title}</S.TagText>
            </S.TagContainer>
          </S.Container>
        )}
      </S.TagsContainer>
      {Array.isArray(listOfInterestsImages) && listOfInterestsImages.length > 0 && (
        <View style={{ marginTop: 24 }}>
          <S.SectionTitle>Interests</S.SectionTitle>
          <S.InterestsContainer>
            <S.InterestTagsContainer>
              <InterestImageSmallList interests={listOfInterestsImages} />
            </S.InterestTagsContainer>
          </S.InterestsContainer>
        </View>
      )}
    </S.StyledRadialGradient>
  );
};

export default GuestBasicInfoCard;
