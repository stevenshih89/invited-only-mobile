import React, { useState, useRef, useEffect } from 'react';
import { AppState } from 'react-native';
import * as S from './DemoVideo.style';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import OnBoardingHostVideo from 'assets/videos/onboarding/onboarding_host_video.mp4';
import OnBoardingGuestVideo from 'assets/videos/onboarding/onboarding_guest_video.mp4';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useAuthStore, selectIsAuthenticated, selectIsDemoVideoWatched } from 'src/store/authStore';

const DemoVideo = ({ route }: any) => {
  const isHost = route?.params?.isHost;
  const navigation = useAppNavigation();
  const [progress, setProgress] = useState(0);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const { setIsDemoVideoWatched } = useAuthStore();
  const isDemoVideoWatched = useAuthStore(selectIsDemoVideoWatched);

  const handleProgress = (data: any) => {
    setProgress(data.currentTime / data.playableDuration);
  };

  const handleNextStep = () => {
    if (!isDemoVideoWatched) {
      if (isAuthenticated) {
        navigation.navigate('/enter-name');
      } else {
        navigation.navigate('/sign-up', { isLogin: false });
      }
    }
  }

  return (
    <DefaultBackground>
      <S.SkipButtonContainer onPress={() => {
        handleNextStep();
      }}>
      </S.SkipButtonContainer>
      <S.DemoVideo
        source={isHost ? OnBoardingHostVideo : OnBoardingGuestVideo}
        onProgress={handleProgress}
        onEnd={() => {
          handleNextStep();
          setIsDemoVideoWatched(true);
        }}
      />
      <S.ProgressBarContainer>
        <S.ProgressBar width={`${progress * 100}%`} />
      </S.ProgressBarContainer>
    </DefaultBackground>
  );
};

export default DemoVideo;
