import * as S from './DemoVideo.style';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import OnBoardingHostVideo from 'assets/videos/onboarding/onboarding_host_video.mp4';
import OnBoardingGuestVideo from 'assets/videos/onboarding/onboarding_guest_video.mp4';
import {StyleSheet} from 'react-native';
import {useAppNavigation} from 'hooks/useAppNavigation';
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const DemoVideo = ({route}: any) => {
  const isHost = route?.params?.isHost;
  const navigation = useAppNavigation();

  return (
    <DefaultBackground>
      <S.DemoVideo
        source={isHost ? OnBoardingHostVideo : OnBoardingGuestVideo}
        style={styles.backgroundVideo}
        onEnd={() => {
          navigation.navigate('/sign-up', {isLogin: false});
        }}
      />
    </DefaultBackground>
  );
};

export default DemoVideo;
