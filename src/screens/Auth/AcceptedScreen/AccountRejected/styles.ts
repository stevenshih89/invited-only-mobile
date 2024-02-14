import {Dimensions, StyleSheet} from 'react-native';

//import components
import {blackColor, whiteColor, lightGray6Color} from 'constants/colors.ts';
import {Satoshi400} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

const dimensionsHeight = Dimensions.get('window').height;
const dimensionsWidth = Dimensions.get('window').width;

const useStyles = () => {
  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: blackColor,
      paddingBottom: 0,
    },
    container: {
      paddingHorizontal: dimensionsWidth / 20,
    },
    avatarWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: dimensionsHeight / 10.5,
    },
    avatarStyle: {
      backgroundColor: 'rgba(250, 165, 1, 0.12)',
      borderRadius: 50,
      zIndex: 100,
    },
    infoCircleIcon: {
      position: 'absolute',
      zIndex: 999,
    },
    textYourAccount: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(34, 812),
      marginTop: dimensionsHeight / 47,
      textAlign: 'center',
    },
    textDescriptionNotApproved: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      textAlign: 'center',
      opacity: 0.8,
    },
    infoContainer: {
      backgroundColor: lightGray6Color,
      padding: 20,
      alignItems: 'flex-start',
      marginTop: dimensionsHeight / 25,
      borderRadius: 10,
    },
    textNeedAHelp: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(18, 812),
      textAlign: 'center',
    },
    textSupport: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
      textAlign: 'center',
      marginLeft: dimensionsWidth / 62,
    },
    wrapperSupportInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: dimensionsHeight / 32.5,
    },
    buttonLogout: {
      marginTop: dimensionsHeight / 25,
    },
  });
};

export default useStyles;
