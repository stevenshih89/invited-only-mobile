import { components } from "@invited-only/invited-only-api";
import { FC } from "react";
import { View } from "react-native";
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import * as S from './GuestLanguagesCard.style';

type Language = components['schemas']['Language'];

interface GuestLanguagesCardProps {
  languages: Language[];
}

const GuestLanguagesCard: FC<GuestLanguagesCardProps> = ({ languages }) => {
  if (!languages?.length) {
    return null;
  }

  return (
    <View style={{ marginTop: 8, width: '100%' }}>
      <S.StyledRadialGradient
        colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
        stops={[0, 0.695, 1]}
        center={[220, -386]}
        radius={400}>
        <S.SectionTitle>Languages</S.SectionTitle>
        <S.LanguagesContainer>
          {languages?.map((item: Language) => (
            <S.LanguageTag key={item.id}>
              <S.LanguageIconContainer>
                <S.LanguageIcon>{getUnicodeFlagIcon(item.flag?.toUpperCase() || '')}</S.LanguageIcon>
              </S.LanguageIconContainer>
              <S.LanguageText>{item.title || ''}</S.LanguageText>
            </S.LanguageTag>
          ))}
        </S.LanguagesContainer>
      </S.StyledRadialGradient>
    </View>
  );
};

export default GuestLanguagesCard;
