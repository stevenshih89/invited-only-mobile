import React, {FC} from 'react';
import {FlatList} from 'react-native';

import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import IconCheckBoxSelected from '../../../assets/images/icons/check-fill.svg';
import * as S from './ModalSelectLanguages.style';
import {blackColor, whiteColor} from 'constants/colors.ts';

//import icons
import Search from 'src/assets/images/icons/search.svg';
import Button from 'components/Button/Button.tsx';
import {languagesList} from 'constants/languages';

export interface Language {
  id: string;
  title: string;
  flag: string;
}
interface ModalSelectLanguagesProps {
  modalLanguages: boolean;
  showLanguages: boolean;
  setModalLanguages: (value: boolean) => void;
  setShowLanguages: (value: boolean) => void;
  languages: Language[];
  setLanguages: (value: Language[]) => void;
}

const ModalSelectLanguages: FC<ModalSelectLanguagesProps> = ({
  setShowLanguages,
  showLanguages,
  modalLanguages,
  setModalLanguages,
  languages,
  setLanguages,
}) => {
  const handleSelectLanguage = (language: Language) => {
    if (languages.find((item: any) => item.id === language.id)) {
      setLanguages(languages.filter((item: any) => item.id !== language.id));
    } else {
      setLanguages([...languages, language]);
    }
  };

  return (
    <S.StyledModal
      isVisible={modalLanguages}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor="rgba(0, 0, 0, 0.94)"
      testID="bottom-half-modal-open-button"
      onBackdropPress={() => setModalLanguages(false)}
      onSwipeComplete={() => setModalLanguages(false)}
      swipeDirection={['down']}>
      <S.Wrapper>
        <S.WhiteLine />
        <S.Title>Select Languages</S.Title>
        <S.ShowProfileRow>
          <S.ShowProfileText>Show in my profile</S.ShowProfileText>
          <S.StyledSwitch
            trackColor={{false: 'rgba(29, 29, 29, 1)', true: whiteColor}}
            thumbColor={showLanguages ? blackColor : whiteColor}
            checked={showLanguages}
            onChange={(value: boolean) => setShowLanguages(value)}
          />
        </S.ShowProfileRow>
        <S.SearchContainer>
          <S.SearchIconContainer>
            <Search width={20} height={20} />
          </S.SearchIconContainer>
          <S.SearchInput placeholder="Search" placeholderTextColor="#767676" />
        </S.SearchContainer>
        <S.ListContainer>
          <FlatList
            data={languagesList}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <S.ListSeparator />}
            renderItem={({item}) => {
              const isActive = languages?.find((selected: any) => selected.id === item?.id);

              return (
                <S.LanguageButton
                  isActive={isActive}
                  activeOpacity={0.8}
                  onPress={() =>
                    handleSelectLanguage({
                      id: item?.id,
                      title: item?.title,
                      flag: item?.flag,
                    })
                  }>
                  <S.StyledRadialGradient
                    colors={[
                      'rgba(26, 26, 26, 0.40)',
                      'rgba(0, 0, 0, 0.00)',
                      isActive ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                    ]}
                    stops={[0, 0.695, 1]}
                    center={[220, -386]}
                    radius={400}>
                    <S.LanguageContent>
                      <S.LanguageIcon>{getUnicodeFlagIcon(item.flag?.toUpperCase() || '')}</S.LanguageIcon>
                      <S.LanguageText>{item.title}</S.LanguageText>
                    </S.LanguageContent>
                    <S.CheckboxContainer isActive={isActive}>{isActive && <IconCheckBoxSelected />}</S.CheckboxContainer>
                  </S.StyledRadialGradient>
                </S.LanguageButton>
              );
            }}
          />
          <Button
            onPress={() => {
              setModalLanguages(false);
            }}
            title="Save Changes"
            buttonStyle={{marginTop: 20, marginBottom: 20}}
          />
        </S.ListContainer>
      </S.Wrapper>
    </S.StyledModal>
  );
};

export default ModalSelectLanguages;
