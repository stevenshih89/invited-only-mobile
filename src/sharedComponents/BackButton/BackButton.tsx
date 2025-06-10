import {ViewStyle, StyleProp} from 'react-native';
import * as S from './BackButton.style';
import ArrowLeftArrow from 'assets/images/icons/arrow-left.svg';
import {screenHeight} from 'constants/common';

interface BackButtonProps {
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const BASE_SCREEN_HEIGHT = 932;
const calculateSize = (baseSize: number) => {
  const ratio = screenHeight / BASE_SCREEN_HEIGHT;
  return Math.round(baseSize * ratio);
};

const BackButton = ({onPress, containerStyle}: BackButtonProps) => {
  const adaptedBorderRadius = calculateSize(22);
  const adaptedBorderWidth = calculateSize(2);

  return (
    <S.BackButton
      onPress={onPress}
      style={[
        {width: (adaptedBorderRadius + adaptedBorderWidth) * 2, height: (adaptedBorderRadius + adaptedBorderWidth) * 2},
        containerStyle,
      ]}>
      <ArrowLeftArrow width={15} height={15} />
    </S.BackButton>
  );
};

export default BackButton;
