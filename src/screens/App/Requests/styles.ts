import {darkRedColor, lightGray6Color, transparent60Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: lightGray6Color,
    },
    itemContainer: {
      height: 218,
      flex: 1,
      maxWidth: '50%',
      paddingHorizontal: 7,
      borderRadius: 12,
    },
    itemSeparator: {
      height: 14,
    },
    imageBackground: {
      borderRadius: 12,
      flex: 1,
      height: '100%',
      overflow: 'hidden',
    },
    listContentContainer: {
      paddingHorizontal: 13,
    },
    superLikeContainer: {
      backgroundColor: darkRedColor,
      borderRadius: 10,
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    superLikeRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    superLikeText: {
      marginRight: 'auto',
      color: whiteColor,
      fontSize: RFValue(10, 812),
      fontFamily: Satoshi500,
      marginLeft: 4,
    },
    superLikeIcon: {
      marginLeft: 'auto',
    },
    itemContentContainer: {
      flex: 1,
    },
    linearGradient: {
      height: 100,
      padding: 7,
    },
    buttonContainer: {
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 4,
      marginTop: 'auto',
      backgroundColor: transparent60Color,
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    nameText: {
      color: whiteColor,
      fontSize: RFValue(13, 812),
      fontFamily: Satoshi700,
    },
    ageText: {
      color: whiteColor,
      fontSize: RFValue(10, 812),
      fontFamily: Satoshi400,
      marginLeft: 4,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      color: whiteColor,
      fontSize: RFValue(10, 812),
      fontFamily: Satoshi400,
      marginLeft: 4,
    },
    distanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    distanceText: {
      color: whiteColor,
      fontSize: RFValue(10, 812),
      fontFamily: Satoshi400,
      marginLeft: 4,
    },
  });

export default useStyles;
