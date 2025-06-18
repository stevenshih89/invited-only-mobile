import { FC } from 'react';
import SuccessfullySubmitted from '../InvitationCode/Components/SuccessfullySubmitted/SuccessfullySubmitted';
import * as S from './AcceptedUser.style';
import InvitationCodeBackground from 'assets/images/app/invitation-code-background.png';
import LogoIcon from 'assets/images/icons/logo.svg';

const AcceptedUser:FC = () => {
  return (
    <S.SafeArea>
        <S.Container>
          <S.Header>
            <LogoIcon />
          </S.Header>
          <S.ContentContainer>
            <S.BackgroundImage source={InvitationCodeBackground} resizeMode="contain">
                <SuccessfullySubmitted />
            </S.BackgroundImage>
          </S.ContentContainer>
        </S.Container>
    </S.SafeArea>
  )
};

export default AcceptedUser;
