import React from 'react';
import * as S from './InvisibleTouchZone.style';

interface Props {
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  imageCount: number;
  disabled: boolean;
}

const InvisibleTouchZone = ({ setImageIndex, imageCount, disabled = false }: Props) => {
  return (
    <S.TapZoneContainer>
      <S.InvisibleTapZone
        onPress={() => {
          if (!disabled) {
            return setImageIndex(prev => {
              if (prev > 0) {
                return prev - 1;
              }
              return prev;
            });
          }
        }}
      />
      <S.InvisibleTapZone
        onPress={() => {
          if (!disabled) {
            return setImageIndex(prev => {
              if (prev < imageCount - 1) {
                return prev + 1;
              }
              return prev;
            });
          }
        }}
      />
    </S.TapZoneContainer>
  );
};

export default InvisibleTouchZone;
