import FastImage from 'react-native-fast-image';
import { components } from 'src/api/v1';
import * as S from './ProfileImage.style';
import { ProgressCircle } from 'components/ProgressCircle/ProgressCircle';
import { transparentGray60Color } from 'constants/colors';
import { useProfile } from 'hooks/useProfile';
import { useAppNavigation } from 'hooks/useAppNavigation';

interface ProfileImageProps {
  userData: components['schemas']['User'];
}

const ProfileImage = ({ userData }: ProfileImageProps) => {
  const { percentage } = useProfile();
  const navigation = useAppNavigation();
  return (
    <S.ProfileImageContainer onPress={() => {
      navigation.navigate('/profile/profile-editing');
    }}>
      <S.OverlayContainer>
        <S.GradientContainer>
          <S.PercentageTextBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
          <S.PercentageText>{percentage}%</S.PercentageText>
        </S.GradientContainer>
      </S.OverlayContainer>
      {userData?.photos?.[0]?.image ? (
        <FastImage
          style={{
            width: 160,
            height: 160,
            borderRadius: 100,
          }}
          source={{
            uri: userData?.photos?.[0]?.image,
            headers: { Authorization: 'someAuthToken' },
            priority: 'normal',
          }}
          resizeMode={'cover'}
        />
      ) : (
        <S.ProfileImage />
      )}
      <S.ProgressCircleContainer>
        <ProgressCircle size={175} strokeWidth={4} progress={percentage} color="white" backgroundColor={transparentGray60Color} />
      </S.ProgressCircleContainer>
    </S.ProfileImageContainer>
  );
};

export default ProfileImage;
