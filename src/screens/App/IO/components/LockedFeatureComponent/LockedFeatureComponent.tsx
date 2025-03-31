import {View} from 'react-native';
import * as S from './LockedFeatureComponent.style';
import LockeFeature from 'src/assets/images/icons/locked-feature-icon.svg';

const LockedFeatureComponent = () => {
  return (
    <View>
      <S.EventCardContentContainer>
        <LockeFeature scale={10} />
        <S.LockedBigText>Coming soon</S.LockedBigText>
        <S.LockedSmallText>Join Coming soon</S.LockedSmallText>
      </S.EventCardContentContainer>
      <S.LockedFeatureContainer>
        <S.LockedFeatureBlueView blurType="light" blurAmount="10" />
      </S.LockedFeatureContainer>
    </View>
  );
};
export default LockedFeatureComponent;
