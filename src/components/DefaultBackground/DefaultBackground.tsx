import { ReactNode } from 'react';
import * as S from './DefaultBackground.style';
import { backgroundGradientColors } from 'constants/colors';

interface Props {
  children: ReactNode;
  withGradient?: boolean;
}

const DefaultBackground = ({ children, withGradient }: Props) => {
  if (withGradient) {
    return (
      <S.MainLinearGradient colors={backgroundGradientColors} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={{ flex: 1 }}>
        <S.MainContainer>{children}</S.MainContainer>
      </S.MainLinearGradient>
    );
  } else {
    return <S.MainContainer>{children}</S.MainContainer>;
  }
};

export default DefaultBackground;
