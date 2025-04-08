import {View} from 'react-native';
import * as S from './LockedFeatureComponent.style';
import LockeFeature from 'src/assets/images/icons/locked-feature-icon.svg';
import HostBadge from 'screens/App/JoinEvents/Components/EventCard/Components/HostBadge';

interface Props {
  hostName: string;
  hostImage: string;
  lockedBigText: string;
  lockedSmallText: string;
  withHostBadge?: boolean;
}

const LockedFeatureComponent = ({hostImage, hostName, lockedBigText, lockedSmallText, withHostBadge = true}: Props) => {
  return (
    <S.EventCardParent>
      {/* {withHostBadge && <HostBadge imageUrl={hostImage} totalGuests={4} />} */}
      <S.EventCardContentContainer>
        <LockeFeature scale={10} />
        <S.LockedBigText>{lockedBigText}</S.LockedBigText>
        <S.LockedSmallText>{lockedSmallText}</S.LockedSmallText>
      </S.EventCardContentContainer>
      <S.LockedFeatureContainer>
        <S.LockedFeatureBlueView blurType="light" blurAmount="10" />
      </S.LockedFeatureContainer>
    </S.EventCardParent>
  );
};
export default LockedFeatureComponent;
