import {lightGray5Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import Job from 'assets/images/icons/job.svg';
import BiGender from 'assets/images/icons/tabler_gender-bigender.svg';
import Cake from 'assets/images/icons/cake.svg';
import Arrows from 'assets/images/icons/arrow-3.svg';
import Wine from 'assets/images/icons/milk.svg';
import Smoke from 'assets/images/icons/smoke.svg';
import Location from 'assets/images/icons/location.svg';
import Home from 'assets/images/icons/home.svg';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {FC, ReactElement} from 'react';
import {useUser} from '../../../../../store/userStore';
import * as S from './MyBasics.style';

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
    padding: 20,
    backgroundColor: lightGray5Color,
    borderRadius: 10,
    marginTop: 24,
  },
  title: {
    color: whiteColor,
    fontFamily: Satoshi500,
    fontSize: RFValue(18, 812),
  },
  itemContainer: {
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: transparentWhite16Color,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(16, 812),
    marginLeft: 10,
  },
  subText: {
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(14, 812),
    marginRight: 8,
  },
});

export default MyBasics;
