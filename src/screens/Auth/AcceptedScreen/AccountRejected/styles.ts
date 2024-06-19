import {Dimensions, StyleSheet} from 'react-native';

//import components
import {blackColor, whiteColor, lightGray6Color} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
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
      flex: 1,
      justifyContent: 'space-between',
    },
    avatarWrapper: {
      alignItems: 'flex-start',
      marginTop: dimensionsHeight / 10.5,
    },
    avatarStyle: {
      backgroundColor: 'rgba(250, 165, 1, 0.12)',
      borderRadius: 50,
      zIndex: 100,
    },
    imageAvatar: {
      width: 60,
      height: 60,
    },
    infoCircleIcon: {
      position: 'absolute',
      zIndex: 999,
    },
    textYourAccount: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(44, 812),
      marginTop: dimensionsHeight / 47,
    },
    textDescriptionNotApproved: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(15, 812),
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
      fontSize: RFValue(17, 812),
      textAlign: 'center',
    },
    textSupport: {
      color: whiteColor,
      fontFamily: Satoshi400,
      fontSize: RFValue(15, 812),
      textAlign: 'center',
      marginLeft: dimensionsWidth / 62,
    },
    wrapperSupportInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: dimensionsHeight / 60,
    },
    buttonLogout: {
      marginTop: dimensionsHeight / 25,
    },
  });
};

export default useStyles;
