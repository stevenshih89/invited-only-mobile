import React from 'react';
import * as S from './GuestLanguagesCard.style';
import {components} from 'src/api/v1';

interface GuestLanguagesCardProps {
  guestInfo: components['schemas']['User'];
}

const GuestLanguagesCard: React.FC<GuestLanguagesCardProps> = ({guestInfo}) => {
  // Assuming languages is an array of strings or objects with a name/title property
  const languages = guestInfo.languages || [];

  if (!languages || languages.length === 0) {
    return null; // Don't render anything if there are no languages
  }
  return (
    <S.Container>
      <S.CardLabel>Languages</S.CardLabel>
      <S.LanguagesContainer>
        {languages.map((language, index) => (
          <S.LanguagePill key={index}>
            <S.FlagContainer>
              <S.LanguageFlag countryCode={'UK'} />
            </S.FlagContainer>
            <S.LanguageText>{typeof language === 'string' ? language : language.title /* or language.title */}</S.LanguageText>
          </S.LanguagePill>
        ))}
      </S.LanguagesContainer>
    </S.Container>
  );
};

export default GuestLanguagesCard;
