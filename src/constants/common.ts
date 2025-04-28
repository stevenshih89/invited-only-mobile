import { Dimensions, Platform } from 'react-native';

const isIos: boolean = Platform.OS === 'ios';
const isAndroid: boolean = Platform.OS === 'android';
const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;
const HOST = 'host';
const GUEST = 'guest';
const ANY_DAY = 'any_day';
const ALL = 'all';
const TODAY = 'today';
const THIS_WEEK = 'this_week';
const THIS_MONTH = 'this_month';
const LIKED = 'liked';
const APPROVED_STATUS = 'approved';
const ACCEPTED_STATUS = 'accepted';
const INVITE_MATCH_STATUS = 'invite_match';
const NOT_ACCEPTED_STATUS = 'notAccepted';
const CANCEL_STATUS = 'cancel';

export {
  isIos,
  isAndroid,
  screenWidth,
  screenHeight,
  ANY_DAY,
  TODAY,
  THIS_WEEK,
  ALL,
  THIS_MONTH,
  LIKED,
  APPROVED_STATUS,
  ACCEPTED_STATUS,
  INVITE_MATCH_STATUS,
  NOT_ACCEPTED_STATUS,
  CANCEL_STATUS,
  HOST,
  GUEST,
};
