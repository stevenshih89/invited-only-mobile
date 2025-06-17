import { Alert, Linking } from 'react-native';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';
import { isIos } from 'constants/common';

export const useCameraPermission = () => {
  const requestCameraPermission = async (): Promise<boolean> => {
    if (!isIos) {
      return true;
    }

    try {
      const currentStatus = await check(PERMISSIONS.IOS.CAMERA);

      if (currentStatus === RESULTS.GRANTED || currentStatus === RESULTS.LIMITED) {
        return true;
      }

      if (currentStatus === RESULTS.BLOCKED) {
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

      if (currentStatus === RESULTS.DENIED) {
        const result = await request(PERMISSIONS.IOS.CAMERA);

        if (result === RESULTS.BLOCKED) {
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

        return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
      }

      return false;
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
