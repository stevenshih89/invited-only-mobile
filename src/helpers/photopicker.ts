import {PERMISSIONS, request} from 'react-native-permissions';
import {Alert} from 'react-native';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import {isIos} from 'constants/common.ts';

export const openCamera = async (cameraType?: 'front' | 'back', onDidCancel?: () => void): Promise<Image | undefined | null> => {
  if (isIos) {
    const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);

    if (cameraPermission === 'granted') {
      try {
        const image = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: false,
          mediaType: 'photo',
          useFrontCamera: cameraType === 'front',
        });

        return image;
      } catch (error) {
        if (onDidCancel) onDidCancel();
        console.error('User cancelled the camera or an error occurred:', error);
        return null;
      }
    } else {
      Alert.alert('Camera permission not granted');
      return null;
    }
  }
};
