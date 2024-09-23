import {Dimensions, Platform} from 'react-native';

const isIos: boolean = Platform.OS === 'ios';
const isAndroid: boolean = Platform.OS === 'android';
const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;
const ANY_DAY = 'any_day';
const ALL = 'all';
const TODAY = 'today';
const THIS_WEEKEND = 'this_weekend';
const THIS_MONTH = 'this_month';
const APPROVED_STATUS = 'approved';
const ACCEPTED_STATUS = 'accepted';

export {isIos, isAndroid, screenWidth, screenHeight, ANY_DAY, TODAY, THIS_WEEKEND, ALL, THIS_MONTH, APPROVED_STATUS, ACCEPTED_STATUS};
