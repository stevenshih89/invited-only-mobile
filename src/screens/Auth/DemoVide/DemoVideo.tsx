import * as S from './DemoVideo.style';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import OnBoardingHostVideo from 'assets/videos/onboarding/onboarding_host_video.mp4';
import OnBoardingGuestVideo from 'assets/videos/onboarding/onboarding_guest_video.mp4';
import {useAppNavigation} from 'hooks/useAppNavigation';

const DemoVideo = ({route}: any) => {
  const isHost = route?.params?.isHost;
  const navigation = useAppNavigation();

  return (
    <DefaultBackground>
      <S.DemoVideo
        source={isHost ? OnBoardingHostVideo : OnBoardingGuestVideo}
        onEnd={() => {
          navigation.navigate('/sign-up', {isLogin: false});
        }}
      />
    </DefaultBackground>
  );
};

export default DemoVideo;
