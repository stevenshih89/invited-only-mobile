import {Dimensions, Platform} from 'react-native';

const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export {isIos, isAndroid, screenWidth, screenHeight};
