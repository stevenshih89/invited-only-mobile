import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {FC} from 'react';
import Lock from 'assets/images/icons/lock.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, invitationCodePath, paymentPath} from 'constants/pathLocations';
import * as S from './ModalLockAccount.style';

interface ModalLockAccountProps {
  isPremium?: boolean;
  isVisibleButton: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
  text?: string;
  haveCode?: boolean;
  accountType?: string;
}

const ModalLockAccount: FC<ModalLockAccountProps> = ({isVisibleButton, isPremium, text, wrapperStyle, haveCode = true, accountType}) => {
  const navigation = useAppNavigation();

  const goToCodeConfirmation = (): void => {
    // @ts-ignore
    navigation.navigate(commonStackPath, {screen: invitationCodePath});
  };

  const goToMyProfileView = () => {
    // @ts-ignore
    // loaderVisibleFun()
    navigation.navigate(paymentPath as never);
  };

  return (
    <S.Container>
      <S.LockedWrapper style={wrapperStyle}>
        <S.LockIconWrapper>
          <Lock width={24} height={24} />
        </S.LockIconWrapper>
        <S.LockDescriptionWrapper>
          <S.LockedTitle>Locked</S.LockedTitle>
          <S.LockedSubtitle>
            {text ? text : 'Your account is under review. Thank you for your patience. You will be notified if your account is accepted'}
          </S.LockedSubtitle>
          {haveCode && (
            <S.LockedHaveCodeWrapper>
              <S.LockedHaveCodeTitle>Have a code?</S.LockedHaveCodeTitle>
              <TouchableOpacity activeOpacity={0.7} onPress={goToCodeConfirmation}>
                <S.LockedHaveCodePressableText>Click here</S.LockedHaveCodePressableText>
              </TouchableOpacity>
            </S.LockedHaveCodeWrapper>
          )}
        </S.LockDescriptionWrapper>
      </S.LockedWrapper>
      {isVisibleButton && !isPremium && accountType === 'host' && (
        <S.ButtonWrapper>
          <TouchableOpacity activeOpacity={0.7} onPress={goToMyProfileView} style={{width: '100%'}}>
            <S.GradientButton colors={['#977B4A', '#E5D291', '#A28453']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
              <S.ButtonText>Get Access</S.ButtonText>
            </S.GradientButton>
          </TouchableOpacity>
        </S.ButtonWrapper>
      )}
    </S.Container>
  );
};

export default ModalLockAccount;
