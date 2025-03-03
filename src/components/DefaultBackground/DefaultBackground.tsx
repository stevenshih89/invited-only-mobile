import {ReactNode} from 'react';
import * as S from './DefaultBackground.style';
import {backgroundGradientColors} from 'constants/colors';

interface Props {
  children: ReactNode;
}

const DefaultBackground = ({children}: Props) => {
  return (
    <S.MainLinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <S.MainContainer>{children}</S.MainContainer>
    </S.MainLinearGradient>
  );
};

export default DefaultBackground;
