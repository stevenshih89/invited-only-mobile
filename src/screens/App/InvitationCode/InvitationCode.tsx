import LogoIcon from 'assets/images/icons/logo.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import InvitationCodeBackground from 'assets/images/app/invitation-code-background.png';
import {useAppNavigation} from 'hooks/useAppNavigation';
import EnterCodeView from './Components/EnterCodeView/EnterCodeView';
import SuccessfullySubmitted from './Components/SuccessfullySubmitted/SuccessfullySubmitted';
import * as S from './InvitationCode.style';
import {useInvitationCode} from 'hooks/useInvitationCode';

const InvitationCode = () => {
  const navigation = useAppNavigation();
  const {isSuccessfullySubmitted, code, setCode, ref, props, getCellOnLayoutHandler, isIncorrectCode, cellCount, handleSubmit} =
    useInvitationCode();

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <S.SafeArea>
      <S.Container>
        <S.Header>
          <S.EmptySpace />
          <LogoIcon />
          {isSuccessfullySubmitted ? (
            <S.EmptySpace />
          ) : (
            <S.CloseButton onPress={handleClose}>
              <CloseIcon />
            </S.CloseButton>
          )}
        </S.Header>
        <S.ContentContainer>
          <S.BackgroundImage source={InvitationCodeBackground} resizeMode="contain">
            {isSuccessfullySubmitted ? (
              <SuccessfullySubmitted />
            ) : (
              <EnterCodeView
                ref={ref}
                props={props}
                code={code}
                setCode={setCode}
                getCellOnLayoutHandler={getCellOnLayoutHandler}
                isIncorrectCode={isIncorrectCode}
                cellCount={cellCount}
                handleSubmit={handleSubmit}
              />
            )}
          </S.BackgroundImage>
        </S.ContentContainer>
      </S.Container>
    </S.SafeArea>
  );
};

export default InvitationCode;
