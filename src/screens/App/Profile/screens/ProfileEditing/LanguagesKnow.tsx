import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {FC, useState} from 'react';
import styled from 'styled-components/native';

//import components
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {lightGray5Color, whiteColor} from 'constants/colors';
import ModalSelectLanguages from 'components/Modal/ModalSelectLanguages/ModalSelectLanguages.tsx';

//import icons
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import * as S from './LanguagesKnow.style';


const LanguagesKnow: FC = () => {
  const [modalLanguages, setModalLanguages] = useState<boolean>(false)
  const [showLanguages, setShowLanguages] = useState<boolean>(false)
  return (
    <S.Container>
      <S.Title>Languages I know</S.Title>
      <S.RowContainer onPress={() => setModalLanguages(true)}>
        <S.LabelText>Choose the languages you know</S.LabelText>
        <ArrowRight />
      </S.RowContainer>
      <ModalSelectLanguages
        showLanguages={showLanguages}
        setShowLanguages={setShowLanguages}
        modalLanguages={modalLanguages}
        setModalLanguages={setModalLanguages}
      />
    </S.Container>
  );
};


export default LanguagesKnow;
