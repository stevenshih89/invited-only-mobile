import React, {FC} from 'react';
import * as S from './MyLocation.style';
import LockIcon from 'assets/images/icons/lock-02.svg';

interface MyLocationProps {
  country: string;
  setCountry: (text: string) => void;
  homeAddress: string;
  setHomeAddress: (text: string) => void;
}

const MyLocation: FC<MyLocationProps> = ({country, setCountry, homeAddress, setHomeAddress}) => {
  return (
    <S.StyledRadialGradient
      colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
      stops={[0, 0.695, 1]}
      center={[220, -386]}
      radius={400}>
      <S.Title>Location</S.Title>
      <S.InputLabel>Country</S.InputLabel>
      <S.StyledInput value={country} onChangeText={setCountry} placeholder="Enter your country" />
      <S.InputContainer>
        <S.InputLabel>City</S.InputLabel>
        <S.CityContainer>
          <S.CityText>Dubai</S.CityText>
          <LockIcon />
        </S.CityContainer>
      </S.InputContainer>
      <S.InputLabel>Company or industry</S.InputLabel>
      <S.StyledInput value={homeAddress} onChangeText={setHomeAddress} placeholder="Enter your home address" />
    </S.StyledRadialGradient>
  );
};

export default MyLocation;
