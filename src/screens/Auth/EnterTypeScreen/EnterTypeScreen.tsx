import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import * as S from './EnterTypeScreen.style';
import EnterTypeScreenBg from 'assets/images/auth/enter-type-screen-bg.png';

import EnterTypeWordsAnimation from './EnterTypeWordsAnimation';

import {useAppNavigation} from 'hooks/useAppNavigation';
import {signInPath, signUpPath} from 'constants/pathLocations';

const EnterTypeScreen = () => {
  const navigation = useAppNavigation();
  return (
    <DefaultBackground>
      <S.MainContainer>
        <S.BackgroundImage source={EnterTypeScreenBg}>
          <EnterTypeWordsAnimation />
        </S.BackgroundImage>
        <S.ButtonsContainer>
          <S.EnterButton
            testID="sign-up-btn"
            activeOpacity={0.7}
            hitSlop={{top: 26, bottom: 20}}
            onPress={() => {
              navigation.navigate('/onboarding-demo-path', {isHost: true});
            }}>
            <S.ButtonText>ENTER AS A MAN</S.ButtonText>
          </S.EnterButton>
          <S.EnterButton
            onPress={() => {
              navigation.navigate('/onboarding-demo-path', {isHost: false});
            }}
            testID="sign-in-btn"
            activeOpacity={0.7}
            hitSlop={{top: 26, bottom: 20}}>
            <S.ButtonText>ENTER AS A WOMAN</S.ButtonText>
          </S.EnterButton>
        </S.ButtonsContainer>
      </S.MainContainer>
    </DefaultBackground>
  );
};

export default EnterTypeScreen;
