import { FC } from 'react';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { View } from 'react-native';
import { components } from 'src/api/v1';
import * as S from './Languages.style';

interface LanguagesProps {
  languages: components['schemas']['Language'][];
}

const Languages: FC<LanguagesProps> = ({ languages }) => {
  return (
    <View style={{ marginTop: 20 }}>
      {!!languages?.length && (
        <S.StyledRadialGradient
          colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
          stops={[0, 0.695, 1]}
          center={[220, -386]}
          radius={400}>
          <S.SectionTitle>Languages</S.SectionTitle>
          <S.LanguagesContainer>
            {languages?.map((item: components['schemas']['Language']) => (
              <S.LanguageTag key={item.flag}>
                <S.LanguageIconContainer>
                  <S.LanguageIcon>{getUnicodeFlagIcon(item.flag?.toUpperCase() || '')}</S.LanguageIcon>
                </S.LanguageIconContainer>
                <S.LanguageText>{item.title}</S.LanguageText>
              </S.LanguageTag>
            ))}
          </S.LanguagesContainer>
        </S.StyledRadialGradient>
      )}
    </View>
  );
};

export default Languages;
