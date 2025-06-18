import {View} from 'react-native';
import * as S from './EnterTypeScreen.style';
import EnterTypeWordsAnimation from './EnterTypeWordsAnimation';
import EnterTypeScreenBg from 'assets/images/auth/enter-type-screen-bg.png';
import {selectIsAuthenticated, useAuthStore} from 'src/store/authStore';

import {useAppNavigation} from 'hooks/useAppNavigation';
import BackButton from 'src/sharedComponents/BackButton/BackButton';
import {screenHeight} from 'constants/common';
import {selectIsDemoVideoWatched, useFirstTimeShowStore} from 'src/store/firstTimeShowStore';

const EnterTypeScreen = () => {
    const isDemoVideoWatched = useFirstTimeShowStore(selectIsDemoVideoWatched);
    const navigation = useAppNavigation();
    const {onBoarding, setOnBoarding} = useAuthStore();

    const isAuthenticated = useAuthStore(selectIsAuthenticated);

    return (
        <S.MainContainer>
            <View
                style={{
                    position: 'absolute',
                    top: screenHeight * 0.07,
                    left: 24,
                    zIndex: 1000,
                }}>
                <BackButton
                    containerStyle={{
                        backgroundColor: '#1a1a1c',
                    }}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <S.BackgroundImage source={EnterTypeScreenBg}>
                <EnterTypeWordsAnimation />
            </S.BackgroundImage>
            <S.ButtonsContainer>
                <S.EnterButton
                    testID="sign-up-btn"
                    activeOpacity={0.7}
                    hitSlop={{top: 26, bottom: 20}}
                    onPress={() => {
                        setOnBoarding({
                            ...onBoarding,
                            onboardingStep: '/onboarding-demo-path',
                            registrationDetails: {
                                ...onBoarding.registrationDetails,
                                gender: 'man',
                            },
                        });
                        if (!isDemoVideoWatched) {
                            navigation.navigate('/onboarding-demo-path', {isHost: true});
                        } else {
                            if (isAuthenticated) {
                                navigation.navigate('/enter-name');
                            } else {
                                navigation.navigate('/sign-up', {isLogin: false});
                            }
                        }
                    }}>
                    <S.ButtonText>I am a Man</S.ButtonText>
                </S.EnterButton>
                <S.EnterButton
                    onPress={() => {
                        setOnBoarding({
                            ...onBoarding,
                            onboardingStep: '/onboarding-demo-path',
                            registrationDetails: {
                                ...onBoarding.registrationDetails,
                                gender: 'woman',
                            },
                        });
                        if (!isDemoVideoWatched) {
                            navigation.navigate('/onboarding-demo-path', {isHost: false});
                        } else {
                            if (isAuthenticated) {
                                navigation.navigate('/enter-name');
                            } else {
                                navigation.navigate('/sign-up', {isLogin: false});
                            }
                        }
                    }}
                    testID="sign-in-btn"
                    activeOpacity={0.7}
                    hitSlop={{top: 26, bottom: 20}}>
                    <S.ButtonText>I am a Woman</S.ButtonText>
                </S.EnterButton>
            </S.ButtonsContainer>
        </S.MainContainer>
    );
};

export default EnterTypeScreen;
