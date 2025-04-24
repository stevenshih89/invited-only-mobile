import * as S from './InterestImge.style';
import BirthdayParty from 'src/assets/images/auth/interests/birthday-party.png';
import Exclusive from 'src/assets/images/auth/interests/exclusive.png';
import PoolParty from 'src/assets/images/auth/interests/pool-party.png';
import Private from 'src/assets/images/auth/interests/private.png';
import Restaurant from 'src/assets/images/auth/interests/restaurant.png';
import VipTables from 'src/assets/images/auth/interests/vip-tables.png';
import YachtParty from 'src/assets/images/auth/interests/yacht-party.png';


interface InterestImageProps {
  interestId: number;
  isSelected: boolean;
  handleSelectInterest: (id: number, title: string) => void;
}

const InterestImage = ({ interestId, isSelected, handleSelectInterest }: InterestImageProps) => {
  switch (interestId) {
    case 1:
      return <S.InterestImageContainer source={BirthdayParty} >
        <S.InterestImageOverlay isSelected={isSelected} onPress={() => handleSelectInterest(interestId, 'Birthday Party')}>
          <S.LeftContainer>
            <S.InterestText>Birthday Party</S.InterestText>
          </S.LeftContainer>
          <S.RightContainer>
            {isSelected ? <S.CheckedIconStyled /> : <S.UncheckedIconStyled />}
          </S.RightContainer>
        </S.InterestImageOverlay>
      </S.InterestImageContainer>
    case 2:
      return <S.InterestImageContainer source={Exclusive} >
        <S.InterestImageOverlay isSelected={isSelected} onPress={() => handleSelectInterest(interestId, 'Exclusive')}>
          <S.LeftContainer>
            <S.InterestText>Exclusive</S.InterestText>
          </S.LeftContainer>
          <S.RightContainer>
            {isSelected ? <S.CheckedIconStyled /> : <S.UncheckedIconStyled />}
          </S.RightContainer>
        </S.InterestImageOverlay>
      </S.InterestImageContainer>
    case 3:
      return <S.InterestImageContainer source={PoolParty} >
        <S.InterestImageOverlay isSelected={isSelected} onPress={() => handleSelectInterest(interestId, 'Pool Party')}>
          <S.LeftContainer>
            <S.InterestText>Pool Party</S.InterestText>
          </S.LeftContainer>
          <S.RightContainer>
            {isSelected ? <S.CheckedIconStyled /> : <S.UncheckedIconStyled />}
          </S.RightContainer>
        </S.InterestImageOverlay>
      </S.InterestImageContainer>
    case 4:
      return <S.InterestImageContainer source={Private} >
        <S.InterestImageOverlay isSelected={isSelected} onPress={() => handleSelectInterest(interestId, 'Private')}>
          <S.LeftContainer>
            <S.InterestText>Private</S.InterestText>
          </S.LeftContainer>
          <S.RightContainer>
            {isSelected ? <S.CheckedIconStyled /> : <S.UncheckedIconStyled />}
          </S.RightContainer>
        </S.InterestImageOverlay>
      </S.InterestImageContainer>
    case 5:
      return <S.InterestImageContainer source={Restaurant} >
        <S.InterestImageOverlay isSelected={isSelected} onPress={() => handleSelectInterest(interestId, 'Restaurant')}>
          <S.LeftContainer>
            <S.InterestText>Restaurant</S.InterestText>
          </S.LeftContainer>
          <S.RightContainer>
            {isSelected ? <S.CheckedIconStyled /> : <S.UncheckedIconStyled />}
          </S.RightContainer>
        </S.InterestImageOverlay>
      </S.InterestImageContainer>
    case 6:
      return <S.InterestImageContainer source={VipTables} >
        <S.InterestImageOverlay isSelected={isSelected} onPress={() => handleSelectInterest(interestId, 'Vip Tables')}>
          <S.LeftContainer>
            <S.InterestText>Vip Tables</S.InterestText>
          </S.LeftContainer>
          <S.RightContainer>
            {isSelected ? <S.CheckedIconStyled /> : <S.UncheckedIconStyled />}
          </S.RightContainer>
        </S.InterestImageOverlay>
      </S.InterestImageContainer>
    case 7:
      return <S.InterestImageContainer source={YachtParty} >
        <S.InterestImageOverlay isSelected={isSelected} onPress={() => handleSelectInterest(interestId, 'Yacht Party')}>
          <S.LeftContainer>
            <S.InterestText>Yacht Party</S.InterestText>
          </S.LeftContainer>
          <S.RightContainer>
            {isSelected ? <S.CheckedIconStyled /> : <S.UncheckedIconStyled />}
          </S.RightContainer>
        </S.InterestImageOverlay>
      </S.InterestImageContainer>
  }
};

export default InterestImage;
