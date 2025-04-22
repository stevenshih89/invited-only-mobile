import { FC } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import * as S from './MyBio.style';
import { Satoshi500 } from 'constants/fonts';
import { grayScale600, transparentWhite30Color } from 'constants/colors';

interface MyBioProps {
  bio: string;
  setBio: (bio: string) => void;
}

const MyBio: FC<MyBioProps> = ({ bio, setBio }) => {
  return (
    <S.StyledRadialGradient
      colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
      stops={[0, 0.695, 1]}
      center={[220, -386]}
      radius={400}>
      <S.Title>Bio</S.Title>
      <S.TextAreaInput
        value={bio}
        onChangeText={(text: string) => setBio(text)} x
        rows={3}
        placeholder="Enter your bio"
        placeholderTextColor={grayScale600}
        styles={{
          container: {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderBottomColor: 'transparent',
            borderRadius: 16,
          },
          input: {
            color: transparentWhite30Color,
            fontFamily: Satoshi500,
            fontSize: RFValue(16, 812),
            margin: 10,
          },
        }}
      />
    </S.StyledRadialGradient>
  );
};

export default MyBio;
