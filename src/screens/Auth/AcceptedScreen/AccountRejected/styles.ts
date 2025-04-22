import {Dimensions, StyleSheet} from 'react-native';

//import components
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, whiteColor, lightGray6Color} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';

const dimensionsHeight = Dimensions.get('window').height;
const dimensionsWidth = Dimensions.get('window').width;

const useStyles = () => {
  return StyleSheet.create({
    avatarStyle: {
      backgroundColor: 'rgba(250, 165, 1, 0.12)',
      borderRadius: 50,
      zIndex: 100,
    },
    avatarWrapper: {
      alignItems: 'flex-start',
      marginTop: dimensionsHeight / 10.5,
    },
    buttonLogout: {
      marginTop: dimensionsHeight / 25,
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: dimensionsWidth / 20,
    },
    imageAvatar: {
      height: 60,
      width: 60,
    },
    infoCircleIcon: {
      position: 'absolute',
      zIndex: 999,
    },
    infoContainer: {
      alignItems: 'flex-start',
      backgroundColor: lightGray6Color,
      borderRadius: 10,
      marginTop: dimensionsHeight / 25,
      padding: 20,
    },
    safeAreaView: {
      alignItems: 'center',
      backgroundColor: blackColor,
      flex: 1,
      paddingBottom: 0,
    },
    textDescriptionNotApproved: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(15, 812),
      opacity: 0.8,
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
      marginLeft: dimensionsWidth / 62,
      textAlign: 'center',
    },
    textYourAccount: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(44, 812),
      marginTop: dimensionsHeight / 47,
    },
    wrapperSupportInfo: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: dimensionsHeight / 60,
    },
  });
};

export default useStyles;
