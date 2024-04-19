import {StyleSheet} from 'react-native';
import {black2Color, blackColor, lightGreenColor, whiteColor} from 'constants/colors.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: black2Color,
    height: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingHorizontal: screenWidth / 10.5,
  },
  wrapperCancelEvent: {
    backgroundColor: black2Color,
    height: '65%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingHorizontal: screenWidth / 10.5,
  },
  wrapperOnTheWay: {
    backgroundColor: black2Color,
    height: '55%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingHorizontal: screenWidth / 10.5,
  },
  whiteLine: {
    backgroundColor: whiteColor,
    height: 2,
    width: 40,
    marginTop: screenHeight / 50,
    marginBottom: screenHeight / 48,
    borderRadius: 10,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenHeight / 85,
    width: '100%',
    justifyContent: 'space-between',
  },
  cancelEventImage: {
    width: 84,
    height: 84,
    borderRadius: 50,
  },
  textYouCantGoToThisEvent: {
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(18, 812),
    marginTop: screenHeight / 85,
    opacity: 0.8,
  },
  textCity: {
    marginRight: 5,
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(14, 812),
  },
  title: {
    marginRight: 5,
    color: whiteColor,
    fontFamily: Satoshi500,
    fontSize: RFValue(20, 812),
  },
  userPhoto: {
    width: 84,
    height: 84,
    borderRadius: 50,
  },
  userName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  greenCircle: {
    borderWidth: 2,
    borderColor: blackColor,
    width: 19,
    height: 19,
    backgroundColor: lightGreenColor,
    borderRadius: 50,
    position: 'absolute',
    bottom: 5,
    right: 0,
  },
  textDate: {
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(12, 812),
    marginLeft: 4,
  },
  textGirlInvitation: {
    color: whiteColor,
    fontFamily: Satoshi400,
    textAlign: 'center',
    fontSize: RFValue(12, 812),
  },
  textAreYouSure: {
    color: whiteColor,
    fontFamily: Satoshi400,
    textAlign: 'center',
    fontSize: RFValue(24, 812),
    marginTop: screenHeight / 28,
  },
  button: {
    width: '100%',
    marginTop: screenHeight / 23,
    marginBottom: 6,
  },
  transparentButton: {
    width: '100%',
  },
  textDescription: {
    color: whiteColor,
    fontFamily: Satoshi400,
    textAlign: 'center',
    opacity: 0.8,
    fontSize: RFValue(18, 812),
    marginTop: screenHeight / 85,
  },
  eventImage: {
    marginTop: 5,
    width: 301,
    height: 165,
    borderRadius: 12,
  },
  fdr: {
    flexDirection: 'row',
  },
  modalStyles: {
    margin: 0,
    justifyContent: 'flex-end',
    zIndex: 999,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  starMargin: {
    marginRight: 5,
  },
});
