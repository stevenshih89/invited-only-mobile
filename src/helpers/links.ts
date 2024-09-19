import {Alert, Linking} from 'react-native';

export const openLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    Linking.openURL(url);
  } else {
    Alert.alert('Cannot open the link:', url);
  }
};
