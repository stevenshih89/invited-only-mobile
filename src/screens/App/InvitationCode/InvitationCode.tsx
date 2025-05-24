import {ActivityIndicator} from 'react-native';
import * as S from './InvitationCode.style';
import EnterCodeView from './Components/EnterCodeView/EnterCodeView';
import SuccessfullySubmitted from './Components/SuccessfullySubmitted/SuccessfullySubmitted';
import {useInvitationCode} from './hooks/useInvitationCode';
import LogoIcon from 'assets/images/icons/logo.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import InvitationCodeBackground from 'assets/images/app/invitation-code-background.png';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {whiteColor} from 'constants/colors';

const InvitationCode = () => {
  const navigation = useAppNavigation();
  const {
    isSuccessfullySubmitted,
    code,
    setCode,
    ref,
    props,
    getCellOnLayoutHandler,
    isIncorrectCode,
    cellCount,
    handleSubmit,
    isGettingAccess,
  } = useInvitationCode();

  const handleClose = () => {
    if (navigation.getState().routes.length > 1) {
      navigation.goBack();
    } else {
      navigation.navigate('/bottom-tabs-stack');
    }
  };

  const handleGoToShareSocialLink = () => {
    navigation.navigate('/share-social-link');
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
            <S.CloseButton testID="close-button" onPress={handleClose}>
              <CloseIcon />
            </S.CloseButton>
          )}
        </S.Header>
        <S.ContentContainer>
          <S.BackgroundImage source={InvitationCodeBackground} resizeMode="contain">
            {isGettingAccess ? (
              <S.Container>
                <ActivityIndicator size="large" color={whiteColor} />
              </S.Container>
            ) : isSuccessfullySubmitted ? (
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
        <S.FooterContainer>
          <S.InviteButton testID="share-social-button" onPress={handleGoToShareSocialLink}>
            <S.InviteTitle>Do not have an invitation code?</S.InviteTitle>
            <S.InviteLink>Share socials for invite</S.InviteLink>
          </S.InviteButton>
          <S.Description>
            This app is invite-only. Share a link to one of your social profiles, and we&apos;ll check it out to let you in.
          </S.Description>
        </S.FooterContainer>
      </S.Container>
    </S.SafeArea>
  );
};

export default InvitationCode;
