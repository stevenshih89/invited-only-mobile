import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {FC, useState} from 'react';

//import components
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {lightGray5Color, whiteColor} from 'constants/colors';
import ModalSelectLanguages from 'components/Modal/ModalSelectLanguages/ModalSelectLanguages.tsx';

//import icons
import ArrowRight from 'assets/images/icons/arrow-right.svg';

const LanguagesKnow: FC = () => {
  const [modalLanguages, setModalLanguages] = useState<boolean>(false)
  const [showLanguages, setShowLanguages] = useState<boolean>(false)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Languages I know</Text>
      <TouchableOpacity onPress={() => setModalLanguages(true)} style={styles.rowContainer}>
        <Text style={styles.labelText}>Choose the languages you know</Text>
        <ArrowRight />
      </TouchableOpacity>
      <ModalSelectLanguages
        showLanguages={showLanguages}
        setShowLanguages={setShowLanguages}
        modalLanguages={modalLanguages}
        setModalLanguages={setModalLanguages}
      />
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
