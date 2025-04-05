import {View} from 'react-native';
import * as S from './LockedFeatureComponent.style';
import LockeFeature from 'src/assets/images/icons/locked-feature-icon.svg';
import HostBadge from 'screens/App/JoinEvents/Components/EventCard/Components/HostBadge';

interface Props {
  hostName: string;
  hostImage: string;
}

const LockedFeatureComponent = ({hostImage, hostName}: Props) => {
  return (
    <S.EventCardParent>
      <HostBadge imageUrl={hostImage} totalGuests={4} />
      <S.EventCardContentContainer>
        <LockeFeature scale={10} />
        <S.LockedBigText>Coming soon</S.LockedBigText>
        <S.LockedSmallText>Join Coming soon</S.LockedSmallText>
      </S.EventCardContentContainer>
      <S.LockedFeatureContainer>
        <S.LockedFeatureBlueView blurType="light" blurAmount="10" />
      </S.LockedFeatureContainer>
    </S.EventCardParent>
  );
};
export default LockedFeatureComponent;
