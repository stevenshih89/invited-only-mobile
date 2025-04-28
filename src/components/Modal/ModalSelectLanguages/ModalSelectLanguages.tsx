import React, { FC, useState } from 'react';
import { FlatList } from 'react-native';

import Config from 'react-native-config';
import IconCheckBoxSelected from "../../../assets/images/icons/check-fill.svg";
import * as S from './ModalSelectLanguages.style';
import useUser from 'hooks/user/useUser';
import { blackColor, whiteColor } from 'constants/colors.ts';

//import icons
import Search from 'src/assets/images/icons/search.svg';
import US from 'src/assets/images/flags/us.svg';
import AE from 'src/assets/images/flags/ae.svg';
import ES from 'src/assets/images/flags/es.svg';
import UA from 'src/assets/images/flags/ua.svg';
import FR from 'src/assets/images/flags/fr.svg';
import PL from 'src/assets/images/flags/pl.svg';
import IL from 'src/assets/images/flags/il.svg';
import PT from 'src/assets/images/flags/pt.svg';
import DE from 'src/assets/images/flags/de.svg';
import IT from 'src/assets/images/flags/it.svg';
import KR from 'src/assets/images/flags/kr.svg';
import Button from 'components/Button/Button.tsx';

interface ModalSelectLanguagesProps {
  modalLanguages: boolean;
  showLanguages: boolean;
  setModalLanguages: (value: boolean) => void;
  setShowLanguages: (value: boolean) => void;
}

interface Language {
  id: string;
  title: string;
  flag: string;
  flagShow: React.FC<any>;
}

const DATA: Language[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'English',
    flag: 'us',
    flagShow: US,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Arabic',
    flag: 'ae',
    flagShow: AE,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Spanish',
    flag: 'es',
    flagShow: ES,
  },
  {
    id: '3ac68af3c-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Ukranian',
    flag: 'ua',
    flagShow: UA,
  },
  {
    id: '58694a40f-3da1-471f-bd96-145571e29d72',
    title: 'French',
    flag: 'fr',
    flagShow: FR,
  },
  {
    id: '12145a90f-1dа1-431f-b436-096771e29d72',
    title: 'Polish',
    flag: 'pl',
    flagShow: PL,
  },
  {
    id: 'bd7acb5ea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Hebrew',
    flag: 'il',
    flagShow: IL,
  },
  {
    id: '3ac68a6fc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Portugese',
    flag: 'pt',
    flagShow: PT,
  },
  {
    id: '58694a70f-3da1-471f-bd96-145571e29d72',
    title: 'German',
    flag: 'de',
    flagShow: DE,
  },
  {
    id: '3ac688afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Italian',
    flag: 'it',
    flagShow: IT,
  },
  {
    id: '58694fa0f-3da1-471f-bd96-145571e29d72',
    title: 'Korean',
    flag: 'kr',
    flagShow: KR,
  },
];

const ModalSelectLanguages: FC<ModalSelectLanguagesProps> = ({ setShowLanguages, showLanguages, modalLanguages, setModalLanguages }) => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const { user: userHost } = useUser();

  const [selectLanguage, setSelectLanguage] = useState<Language[]>([]);

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
            trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
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
            data={DATA}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <S.ListSeparator />}
            renderItem={({ item }) => {
              const isActive = selectLanguage?.some((selected: any) => selected.title === item.title);
              const FlagIcon = item.flagShow;

              return (
                <S.LanguageButton isActive={isActive} activeOpacity={0.8} onPress={() => { }}>
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
                      <FlagIcon />
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
            buttonStyle={{ marginTop: 20, marginBottom: 20 }}
          />
        </S.ListContainer>
      </S.Wrapper>
    </S.StyledModal>
  );
};

export default ModalSelectLanguages;
