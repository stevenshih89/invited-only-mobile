import {FC} from 'react';
import * as S from './GuestBioCard.style';

const GuestBioCard: FC<{bio: string}> = ({bio}) => {
  if (!bio) {
    return null;
  }

  return (
    <S.StyledRadialGradient
      colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
      stops={[0, 0.695, 1]}
      center={[220, -386]}
      radius={400}>
      <S.SectionTitle>Bio</S.SectionTitle>
      <S.BioText>{bio}</S.BioText>
    </S.StyledRadialGradient>
  );
};

export default GuestBioCard;
