import {StyleSheet} from 'react-native';
import {black1Color, black2Color, blackColor, errorColor, lightGray2Color, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import { screenHeight } from 'constants/common';

const useStyles = () => {
  return StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blackColor,
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    firstCircle: {
        // width: 390,
        // height: 390,
        position: 'absolute',
        backgroundColor: '#222222',
        // backgroundColor: 'red',
        // top: screenHeight /2 - 390,
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: 'center',
        // top: screenHeight / 2 - 390
    },
    secondCircle: {
        // width: 370,
        // height: 370,
        // top: screenHeight /2 - 380,
        position: 'absolute',
        backgroundColor: '#454545',
        // backgroundColor: 'green',
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: 'center'
    },
    whiteCircle: {
        // width: 340,
        // height: 340,
        // top: screenHeight /2 - 365,
        backgroundColor: whiteColor,
        borderRadius: 170,
        position: 'absolute',
        // transform: [{
        //     translateY: -85
        // }],
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWrapper: {
        backgroundColor: whiteColor,
        borderRadius: 17,
        paddingHorizontal: 22,
        paddingVertical: 11,
        marginTop: 2
    },
    textInner: {
        color: blackColor,
        fontSize: RFValue(20, 812),
        fontFamily: Satoshi500,
    }
  });
};

export default useStyles;
