import * as S from './HostButton.style';
import {useAppNavigation} from 'hooks/useAppNavigation';
import ArrowRightIcon from 'src/assets/images/icons/arrow-right-s-line.svg';
import {userProfilePreviewPath} from 'constants/pathLocations';

const HostButton = ({hostName, hostImage, hostId}: {hostName: string; hostImage: string; hostId: string}) => {
  const navigation = useAppNavigation();

  const navigateToProfile = () => {
    navigation.navigate(userProfilePreviewPath as any, {
      userUid: hostId,
    });
  };

  return (
    <S.ButtonWrapper testID="host-button" onPress={navigateToProfile}>
      <S.StyledRadialGradient
        colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
        stops={[0, 0.695, 1]}
        center={[220, -386]}
        radius={400}>
        <S.Row>
          <S.InnerRow>
            <S.ProfileImage testID="host-profile-image" source={{uri: hostImage}} />
            <S.InfoWrapper>
              <S.HostName>{hostName}</S.HostName>
              <S.HostRole>Host</S.HostRole>
            </S.InfoWrapper>
          </S.InnerRow>
          <ArrowRightIcon />
        </S.Row>
      </S.StyledRadialGradient>
    </S.ButtonWrapper>
  );
};

export default HostButton;
