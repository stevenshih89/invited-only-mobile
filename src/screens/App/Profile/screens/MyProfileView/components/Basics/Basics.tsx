import { FC } from 'react';
import { View } from 'react-native';
import * as S from './Basics.style';
import { useGenderSpecs } from 'hooks/useGenderSpecs';

interface BasicsProps {
  location: string;
  homeAddress: string;
  work: { title: string };
  gender: 'man' | 'woman' | 'other';
  interests: { id: string; title: string }[];
  listOfInterestsImages: { id: number; image: any }[];
}

const Basics: FC<BasicsProps> = ({ location, homeAddress, work, gender, interests, listOfInterestsImages }) => {
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
            <GenderIcon />
          </S.TagIconContainer>
          <S.TagText>{genderText}</S.TagText>
        </S.TagContainer>
        {location && (
          <>
            <S.LocationText>lives in</S.LocationText>
            <S.TagContainer>
              <S.TagText>{location}</S.TagText>
            </S.TagContainer>
          </>
        )}
        {homeAddress && (
          <>
            <S.LocationText>and calls home</S.LocationText>
            <S.TagContainer>
              <S.TagText>{homeAddress}</S.TagText>
            </S.TagContainer>
          </>
        )}
        {work?.title && (
          <>
            <S.LocationText>, and works as a</S.LocationText>
            <S.TagContainer>
              <S.TagText>{work?.title}</S.TagText>
            </S.TagContainer>
          </>
        )}
      </S.TagsContainer>
      {!!interests?.length && (
        <View style={{ marginTop: 24 }}>
          <S.SectionTitle>Interests</S.SectionTitle>
          <S.InterestsContainer>
            <S.InterestTagsContainer>
              {interests?.map((interest: any) => (
                <S.InterestTag key={interest.id}>
                  <S.InterestImage source={listOfInterestsImages.find(item => item.id === interest.id)?.image} />
                  <S.InterestText>{interest.title}</S.InterestText>
                </S.InterestTag>
              ))}
            </S.InterestTagsContainer>
          </S.InterestsContainer>
        </View>
      )}
    </S.StyledRadialGradient>
  );
};

export default Basics;
