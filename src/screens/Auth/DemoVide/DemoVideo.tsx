import React, { useState } from 'react';
import * as S from './DemoVideo.style';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import OnBoardingHostVideo from 'assets/videos/onboarding/onboarding_host_video.mp4';
import OnBoardingGuestVideo from 'assets/videos/onboarding/onboarding_guest_video.mp4';
import {useAppNavigation} from 'hooks/useAppNavigation';

const DemoVideo = ({route}: any) => {
  const isHost = route?.params?.isHost;
  const navigation = useAppNavigation();
  const [progress, setProgress] = useState(0);

  const handleProgress = (data: any) => {
    setProgress(data.currentTime / data.playableDuration);
  };

  return (
    <DefaultBackground>
      <S.DemoVideo
        source={isHost ? OnBoardingHostVideo : OnBoardingGuestVideo}
        onProgress={handleProgress}
        onEnd={() => {
          navigation.navigate('/sign-up', {isLogin: false});
        }}
      />
      <S.ProgressBarContainer>
        <S.ProgressBar width={`${progress * 100}%`} />
      </S.ProgressBarContainer>
    </DefaultBackground>
  );
};

export default DemoVideo;
