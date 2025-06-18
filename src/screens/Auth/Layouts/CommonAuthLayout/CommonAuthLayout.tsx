import { Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { useCallback } from 'react';
import * as S from './CommonAuthLayout.style';
import { isIos, screenHeight } from 'constants/common';
import { backgroundGradientColors } from 'constants/colors';
import BackButton from 'src/sharedComponents/BackButton/BackButton';
import AuthProgress from 'components/AuthProgress';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import { useAppNavigation } from 'hooks/useAppNavigation';

interface CommonAuthLayoutProps {
  withKeyboard?: boolean;
  startPercentage?: number;
  endPercentage?: number;
  animationDuration?: number;
  children: React.ReactNode;
  onBackPress?: () => void;
  title: string;
  subtitle: string;
  continueButtonDisabled?: boolean;
  continueButtonTitle?: string;
  continueButtonLoading?: boolean;
  skipButtonTitle?: string;
  onContinuePress?: () => void;
  onSkipPress?: () => void | null | Promise<void> | (() => Promise<void> | null);
  continueButtonTestID?: string;
  skipButtonTestID?: string;
}

const CommonAuthLayout: React.FC<CommonAuthLayoutProps> = ({
  withKeyboard = true,
  startPercentage = 0,
  endPercentage = 10,
  animationDuration = 1000,
  onBackPress,
  title,
  subtitle,
  continueButtonDisabled,
  continueButtonTitle,
  continueButtonLoading,
  skipButtonTitle,
  onContinuePress,
  onSkipPress,
  children,
  continueButtonTestID,
  skipButtonTestID,
}) => {
  const BASE_SCREEN_HEIGHT = 932;
  const calculateSize = (baseSize: number) => {
    const ratio = screenHeight / BASE_SCREEN_HEIGHT;
    return Math.round(baseSize * ratio);
  };

  const navigation = useAppNavigation();

  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  }, [onBackPress, navigation]);

  const Wrapper = useCallback(
    ({ children: wrChildren }: { children: React.ReactNode }) => {
      if (withKeyboard) {
        return (
          <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{wrChildren}</TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        );
      }
      return <>{wrChildren}</>;
    },
    [withKeyboard],
  );

  return (
    <LinearGradient colors={backgroundGradientColors} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
      <Wrapper>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingHorizontal: 24,
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <S.TopRow>
                <BackButton onPress={handleBackPress} />
                <LogoPrimary2 />
                {startPercentage && endPercentage ? (
                  <AuthProgress startPercentage={startPercentage} endPercentage={endPercentage} animationDuration={animationDuration} />
                ) : (
                  <View style={{ width: (calculateSize(22) + calculateSize(2)) * 2, height: (calculateSize(22) + calculateSize(2)) * 2 }} />
                )}
              </S.TopRow>
              <S.TitleContainer>
                <S.Title>{title}</S.Title>
                <S.Subtitle>{subtitle}</S.Subtitle>
              </S.TitleContainer>
              {children}
            </View>
            <S.ButtonsContainer>
              <S.ContinueButton
                testID={continueButtonTestID}
                loading={continueButtonLoading}
                disabled={continueButtonDisabled}
                onPress={onContinuePress}
                title={continueButtonTitle}
              />
              {skipButtonTitle && onSkipPress && <S.SkipButton testID={skipButtonTestID} onPress={onSkipPress} title={skipButtonTitle} />}
            </S.ButtonsContainer>
          </View>
        </SafeAreaView>
      </Wrapper>
    </LinearGradient>
  );
};

export default React.memo(CommonAuthLayout);
