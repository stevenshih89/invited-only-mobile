import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {FC, ReactElement} from 'react';
import {useUser} from '../../../../../store/userStore';
import * as S from './MyBasics.style';
import {lightGray5Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import Job from 'assets/images/icons/job.svg';
import BiGender from 'assets/images/icons/tabler_gender-bigender.svg';
import Cake from 'assets/images/icons/cake.svg';
import Location from 'assets/images/icons/location.svg';
import Home from 'assets/images/icons/home.svg';
import {Satoshi400, Satoshi500} from 'constants/fonts';

const MyBasics: FC<{
  setIsVisibleSmokeModal: (val: boolean) => void;
  setIsVisibleGenderModal: (val: boolean) => void;
  setIsVisibleHeightModal: (val: boolean) => void;
  setIsVisibleWorkModal: (val: boolean) => void;
  setIsVisibleAlcoholModal: (val: boolean) => void;
  setIsVisibleBirthdayModal: (val: boolean) => void;
  setIsVisibleLocationModal: (val: boolean) => void;
  setIsVisibleHomeAddressModal: (val: boolean) => void;
  work: string;
  activeAlcoholItem: {id: number; title: string} | null;
  activeSmokeItem: {id: number; title: string} | null;
  height: string | null;
  date: string;
  location: string;
  homeAddress: string;
}> = ({
  setIsVisibleSmokeModal,
  setIsVisibleGenderModal,
  setIsVisibleHeightModal,
  setIsVisibleLocationModal,
  setIsVisibleWorkModal,
  setIsVisibleAlcoholModal,
  setIsVisibleBirthdayModal,
  setIsVisibleHomeAddressModal,
  work,
  activeAlcoholItem,
  activeSmokeItem,
  height,
  date,
  location,
  homeAddress,
}): ReactElement => {
  const userHost = useUser((i: any) => i?.user);

  const gender = userHost?.gender?.charAt(0).toUpperCase() + userHost?.gender.slice(1);
  return (
    <S.Container>
      <S.Title>My basics</S.Title>
      <S.ItemContainer activeOpacity={0.7} onPress={() => setIsVisibleWorkModal(true)}>
        <S.IconContainer>
          <Job />
          <S.Text>Work</S.Text>
        </S.IconContainer>
        <S.IconContainer>
          <S.SubText>{work || 'Add'}</S.SubText>
          <ArrowRight />
        </S.IconContainer>
      </S.ItemContainer>
      <S.ItemContainer activeOpacity={0.7} onPress={() => setIsVisibleGenderModal(true)}>
        <S.IconContainer>
          <BiGender />
          <S.Text>Gender</S.Text>
        </S.IconContainer>
        <S.IconContainer>
          <S.SubText>{gender}</S.SubText>
          <ArrowRight />
        </S.IconContainer>
      </S.ItemContainer>
      <S.ItemContainer activeOpacity={0.7} onPress={() => setIsVisibleLocationModal(true)}>
        <S.IconContainer>
          <Location />
          <S.Text>Location</S.Text>
        </S.IconContainer>
        <S.IconContainer>
          <S.SubText>{(typeof location === 'string' && location) || 'Add'}</S.SubText>
          <ArrowRight />
        </S.IconContainer>
      </S.ItemContainer>
      <S.ItemContainer activeOpacity={0.7} onPress={() => setIsVisibleHomeAddressModal(true)}>
        <S.IconContainer>
          <Home />
          <S.Text>Hometown</S.Text>
        </S.IconContainer>
        <S.IconContainer>
          <S.SubText>{homeAddress || 'Add'}</S.SubText>
          <ArrowRight />
        </S.IconContainer>
      </S.ItemContainer>
      <S.ItemContainer activeOpacity={0.7} onPress={() => setIsVisibleBirthdayModal(true)}>
        <S.IconContainer>
          <Cake />
          <S.Text>Date of birthday</S.Text>
        </S.IconContainer>
        <S.IconContainer>
          <S.SubText>{date || 'Add'}</S.SubText>
          <ArrowRight />
        </S.IconContainer>
      </S.ItemContainer>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightGray5Color,
    borderRadius: 10,
    marginTop: 24,
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemContainer: {
    alignItems: 'center',
    borderBottomColor: transparentWhite16Color,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  subText: {
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(14, 812),
    marginRight: 8,
  },
  text: {
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(16, 812),
    marginLeft: 10,
  },
  title: {
    color: whiteColor,
    fontFamily: Satoshi500,
    fontSize: RFValue(18, 812),
  },
});

export default MyBasics;
