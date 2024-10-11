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
import {useUser} from "../../../../../store/userStore";

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
  homeAddress
}): ReactElement => {  
  const userHost = useUser((i: any) => i?.user);  

  const gender = userHost?.gender?.charAt(0).toUpperCase() + userHost?.gender.slice(1);
  return (
    <View style={styles.container}>
      <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>My basics</Text>
      <TouchableOpacity activeOpacity={0.7} style={styles.itemContainer} onPress={() => setIsVisibleWorkModal(true)}>
        <View style={styles.iconContainer}>
          <Job/>
          <Text style={styles.text}>Work</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.subText}>{work || 'Add'}</Text>
          <ArrowRight />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.itemContainer} onPress={() => setIsVisibleGenderModal(true)}>
        <View style={styles.iconContainer}>
          <BiGender />
          <Text style={styles.text}>Gender</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.subText}>{gender}</Text>
          <ArrowRight />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.itemContainer} onPress={() => setIsVisibleLocationModal(true)}>
        <View style={styles.iconContainer}>
          <Location />
          <Text style={styles.text}>Location</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.subText}>{typeof(location) === 'string' && location || 'Add'}</Text>
          <ArrowRight />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.itemContainer} onPress={() => setIsVisibleHomeAddressModal(true)}>
        <View style={styles.iconContainer}>
          <Home />
          <Text style={styles.text}>Hometown</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.subText}>{homeAddress || 'Add'}</Text>
          <ArrowRight />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.itemContainer} onPress={() => setIsVisibleBirthdayModal(true)}>
        <View style={styles.iconContainer}>
          <Cake />
          <Text style={styles.text}>Date of birthday</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.subText}>{date || 'Add'}</Text>
          <ArrowRight />
        </View>
      </TouchableOpacity>
    </View>
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
