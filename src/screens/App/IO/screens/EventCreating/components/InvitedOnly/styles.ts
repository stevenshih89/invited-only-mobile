import {StyleSheet} from 'react-native';
import {Satoshi500, Satoshi400} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {goldColor, lightGray10Color, lightGray9Color, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperSelectYourDesiredCompany: {
      borderWidth: 1,
      borderColor: goldColor,
      borderRadius: 10,
      padding: 20,
      marginBottom: screenHeight / 42,
    },
    wrapperOtherFriends: {
      borderRadius: 10,
      padding: 20,
      backgroundColor: lightGray10Color,
      marginBottom: screenHeight / 36,
    },
    textSelectYourDesiredCompany: {
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      color: whiteColor,
    },
    textOtherFriend: {
      fontFamily: Satoshi500,
      fontSize: RFValue(18, 812),
      color: whiteColor,
      width: '80%',
    },
    rowFemale: {
      marginTop: screenHeight / 32,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowMale: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: screenHeight / 35,
    },
    rowButtons: {
      flexDirection: 'row',
    },
    textPersonGender: {
      fontFamily: Satoshi500,
      fontSize: RFValue(14, 812),
      color: whiteColor,
    },
    textPersonGenderFriends: {
      fontFamily: Satoshi500,
      fontSize: RFValue(14, 812),
      color: whiteColor,
      marginTop: screenHeight / 32,
    },
    rowButtonsOtherFriends: {
      flexDirection: 'row',
      marginTop: screenHeight / 80,
    },
    buttonPress: {
      backgroundColor: lightGray9Color,
      borderRadius: 10,
      width: 40,
      height: 38,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonPressOtherFriends: {
      backgroundColor: lightGray9Color,
      borderRadius: 10,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: 92,
      height: 41,
    },
    textButton: {
      fontFamily: Satoshi500,
      fontSize: RFValue(14, 812),
      color: whiteColor,
    },
    textCountFriends: {
      fontFamily: Satoshi400,
      fontSize: RFValue(16, 812),
      color: whiteColor,
      borderColor: lightGray9Color,
      borderWidth: 1,
      borderRadius: 10,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: 92,
      height: 41,
      paddingVertical: 6,
      marginHorizontal: screenWidth / 38,
    },
    textCount: {
      fontFamily: Satoshi500,
      padding: 8,
      textAlign: 'center',
      marginHorizontal: 10,
      width: 40,
      height: 38,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: lightGray9Color,
      fontSize: RFValue(14, 812),
      color: whiteColor,
    },
  });
};

export default useStyles;
