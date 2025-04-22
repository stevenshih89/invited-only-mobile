import {FC, useState} from 'react';

//import components
import * as S from './MyLanguagesKnow.style';
import ModalSelectLanguages from 'components/Modal/ModalSelectLanguages/ModalSelectLanguages.tsx';

//import icons
import ArrowRight from 'assets/images/icons/arrow-right.svg';

const MyLanguagesKnow: FC = () => {
  const [modalLanguages, setModalLanguages] = useState<boolean>(false);
  const [showLanguages, setShowLanguages] = useState<boolean>(false);
  return (
    <S.StyledRadialGradient
      colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
      stops={[0, 0.695, 1]}
      center={[220, -386]}
      radius={400}>
      <S.Title>Languages</S.Title>
      <S.RowContainer testID="languages-row" onPress={() => setModalLanguages(true)}>
        <S.LabelText>Choose the languages you know</S.LabelText>
        <ArrowRight width={14} height={14} />
      </S.RowContainer>
      <ModalSelectLanguages
        showLanguages={showLanguages}
        setShowLanguages={setShowLanguages}
        modalLanguages={modalLanguages}
        setModalLanguages={setModalLanguages}
      />
    </S.StyledRadialGradient>
  );
};

export default MyLanguagesKnow;
