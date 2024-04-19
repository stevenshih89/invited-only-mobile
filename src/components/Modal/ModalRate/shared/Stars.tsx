import React, {FC, useState} from 'react';
import {View, ViewStyle, Pressable} from 'react-native';

import styles from 'components/Modal/ModalRate/styles.ts';

// DEVNOTE: Import filled an unfilled stars when will be available according to design.
import StarIcon from 'assets/images/icons/star.svg';

export type StarRange = 1 | 2 | 3 | 4 | 5;

type StarsProps = {
  onRate?: (rate: number) => void;
  initialRate?: StarRange;
  readonly?: boolean;
};

const MAX_STARS_AMOUNT = 5;

const makeStars = () => Array(MAX_STARS_AMOUNT).fill({checked: false});
const fillStars = (amount: number) =>
  makeStars().map((star, idx) => {
    if (idx + 1 > amount) {
      return star;
    }

    return {checked: true};
  });

// DEVNOTE: Remove when design will be updated.
const filledStar: ViewStyle = {backgroundColor: '#FFD700'};

const Stars: FC<StarsProps> = props => {
  const {onRate, initialRate: rate = 0, readonly = false} = props;
  const [stars, setStars] = useState(readonly && rate ? fillStars(rate) : makeStars());

  const handlePress = (starIdx: number) => {
    const newRate = stars.map((_, idx) => {
      if (starIdx >= idx) {
        return {checked: true};
      }

      return {checked: false};
    });
    setStars(newRate);
    onRate && onRate(starIdx + 1);
  };

  return (
    <View style={styles.starsRow}>
      {stars.map((star, idx) => (
        <Pressable key={idx} onPress={() => (!readonly ? handlePress(idx) : null)}>
          <StarIcon style={[styles.starMargin, star.checked && filledStar]} />
        </Pressable>
      ))}
    </View>
  );
};

export default Stars;
