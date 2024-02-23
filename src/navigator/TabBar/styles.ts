import {Satoshi500} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  label: {
    fontSize: RFValue(10, 812),
    fontFamily: Satoshi500,
  },
  iconWr: {
    height: '100%',
    width: 28,
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
});

export default styles;
