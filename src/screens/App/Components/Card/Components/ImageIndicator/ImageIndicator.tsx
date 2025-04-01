import React from 'react';

import * as S from './ImageIndicator.style';

interface ImageIndicatorProps {
  currentIndex: number;
  totalImages: number;
}

const ImageIndicator: React.FC<ImageIndicatorProps> = ({currentIndex, totalImages}) => {
  return (
    <S.Container>
      {Array.from({length: totalImages}).map((_, index) => (
        <S.Dot isActive={index === currentIndex} />
      ))}
    </S.Container>
  );
};

export default ImageIndicator;
