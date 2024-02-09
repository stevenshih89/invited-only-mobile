import {Dimensions, Platform} from 'react-native';

const isIos: boolean = Platform.OS === 'ios';
const isAndroid: boolean = Platform.OS === 'android';
const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;

export {isIos, isAndroid, screenWidth, screenHeight};
