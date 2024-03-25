import {Dimensions, Platform} from 'react-native';

const isIos: boolean = Platform.OS === 'ios';
const isAndroid: boolean = Platform.OS === 'android';
const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;
const ANY_DAY = 'any_day';
const TODAY = 'today';
const THIS_WEEKEND = 'this_weekend';

export {isIos, isAndroid, screenWidth, screenHeight, ANY_DAY, TODAY, THIS_WEEKEND};
