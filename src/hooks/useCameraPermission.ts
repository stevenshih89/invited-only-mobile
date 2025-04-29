import {Alert, Linking} from 'react-native';
import {PERMISSIONS, request, check} from 'react-native-permissions';
import {isIos} from 'constants/common';

export const useCameraPermission = () => {
  const requestCameraPermission = async (): Promise<boolean> => {
    if (!isIos) {
      return true;
    }

    try {
      const currentStatus = await check(PERMISSIONS.IOS.CAMERA);

      if (currentStatus === 'denied' || currentStatus === 'blocked') {
        await request(PERMISSIONS.IOS.CAMERA);
        return new Promise(resolve => {
          Alert.alert(
            'Camera Access Required',
            'Please allow camera access to take a selfie photo. You can change this in your device settings.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => resolve(false),
              },
              {
                text: 'Settings',
                onPress: () => {
                  Linking.openSettings();
                  resolve(false);
                },
              },
            ],
          );
        });
      }

      if (currentStatus !== 'granted' && currentStatus !== 'limited') {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        if (result === 'denied' || result === 'blocked') {
          return new Promise(resolve => {
            Alert.alert(
              'Camera Access Required',
              'Please allow camera access to take a selfie photo. You can change this in your device settings.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => resolve(false),
                },
                {
                  text: 'Settings',
                  onPress: () => {
                    Linking.openSettings();
                    resolve(false);
                  },
                },
              ],
            );
          });
        }
      }

      return true;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      Alert.alert('Error', 'Failed to access camera. Please try again.');
      return false;
    }
  };

  return {
    requestCameraPermission,
  };
};
