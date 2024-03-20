import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import {lightGray5Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {FC} from 'react';

const LanguagesKnow: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Languages I know</Text>
      <TouchableOpacity style={styles.rowContainer}>
        <Text style={styles.labelText}>Choose the languages you know</Text>
        <ArrowRight />
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 26,
  },
  labelText: {
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(14, 812),
  },
});

export default LanguagesKnow;
