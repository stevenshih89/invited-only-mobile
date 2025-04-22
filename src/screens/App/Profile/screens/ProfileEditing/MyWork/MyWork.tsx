import React from 'react';
import * as S from './MyWork.style';

const Work = ({
  textNameWork,
  setTextNameWork,
  textDescription,
  setTextDescription,
}: {
  textNameWork: string;
  setTextNameWork: (text: string) => void;
  textDescription: string;
  setTextDescription: (text: string) => void;
}) => {
  return (
    <S.StyledRadialGradient
      colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
      stops={[0, 0.695, 1]}
      center={[220, -386]}
      radius={400}>
      <S.Title>Work</S.Title>

      <S.InputContainer>
        <S.InputLabel>Title</S.InputLabel>
        <S.StyledInput
          value={textNameWork}
          onChangeText={setTextNameWork}
          placeholder="Enter your title"
          placeholderTextColor="rgba(255, 255, 255, 0.3)"
        />
      </S.InputContainer>

      <S.InputLabel>Company or industry</S.InputLabel>
      <S.StyledInput
        value={textDescription}
        onChangeText={setTextDescription}
        placeholder="Enter company or industry"
        placeholderTextColor="rgba(255, 255, 255, 0.3)"
      />
    </S.StyledRadialGradient>
  );
};

export default Work;
