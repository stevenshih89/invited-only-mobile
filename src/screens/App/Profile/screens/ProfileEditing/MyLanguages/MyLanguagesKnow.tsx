import {FC, useMemo, useState} from 'react';

//import components
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import * as S from './MyLanguagesKnow.style';
import ModalSelectLanguages, {Language} from 'components/Modal/ModalSelectLanguages/ModalSelectLanguages.tsx';

//import icons
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import {languagesList} from 'constants/languages';

interface MyLanguagesKnowProps {
  languages: Language[];
  setLanguages: (languages: Language[]) => void;
}

const MyLanguagesKnow: FC<MyLanguagesKnowProps> = ({languages, setLanguages}) => {
  const [modalLanguages, setModalLanguages] = useState<boolean>(false);
  const [showLanguages, setShowLanguages] = useState<boolean>(false);

  const selectedLanguages = useMemo(() => {
    return languagesList.filter((selected: any) => languages?.find((language: any) => language.id === selected.id));
  }, [languages]);

  const visibleLanguages = selectedLanguages.slice(0, 2);
  const hiddenLanguagesCount = selectedLanguages.length - visibleLanguages.length;

  return (
    <S.StyledRadialGradient
      colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
      stops={[0, 0.695, 1]}
      center={[220, -386]}
      radius={400}>
      <S.Title>Languages</S.Title>
      <S.RowContainer testID="languages-row" onPress={() => setModalLanguages(true)}>
        {selectedLanguages.length > 0 ? (
          <S.LanguagesContainer>
            <S.VisibleLanguagesContainer>
              {visibleLanguages?.map((language, index) => (
                <S.RoundedTextViewContainer key={index}>
                  <S.LanguageText>{getUnicodeFlagIcon(language.flag?.toUpperCase() || '')}</S.LanguageText>
                  <S.WhiteTextInfo>{language.title}</S.WhiteTextInfo>
                </S.RoundedTextViewContainer>
              ))}
            </S.VisibleLanguagesContainer>
            {hiddenLanguagesCount > 0 && (
              <S.CounterContainer>
                <S.CounterText>+{hiddenLanguagesCount}</S.CounterText>
              </S.CounterContainer>
            )}
          </S.LanguagesContainer>
        ) : (
          <S.LabelText>Choose the languages you know</S.LabelText>
        )}
        <ArrowRight width={14} height={14} />
      </S.RowContainer>
      <ModalSelectLanguages
        showLanguages={showLanguages}
        setShowLanguages={setShowLanguages}
        modalLanguages={modalLanguages}
        setModalLanguages={setModalLanguages}
        languages={languages}
        setLanguages={setLanguages}
      />
    </S.StyledRadialGradient>
  );
};

export default MyLanguagesKnow;
