import {lightGray2Color, transparentWhite30Color} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';
import {Dispatch, FC, SetStateAction} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import * as S from './MyBio.style';

interface MyBioProps {
  bio: string;
  setBio: Dispatch<SetStateAction<string>>;
}

const MyBio: FC<MyBioProps> = ({bio, setBio}) => {
  return (
    <S.Container>
      <S.Title>My bio</S.Title>
      <S.TextAreaInput
        value={bio}
        onChangeText={(text: string) => setBio(text)}
        rows={9}
        placeholder="Enter your bio"
        placeholderTextColor={transparentWhite30Color}
        styles={{
          container: {
            backgroundColor: lightGray2Color,
            borderBottomColor: 'transparent',
            borderRadius: 10,
          },
          input: {
            color: transparentWhite30Color,
            fontFamily: Satoshi500,
            fontSize: RFValue(16, 812),
            margin: 10,
          },
        }}
      />
    </S.Container>
  );
};

export default MyBio;
