import {isIos} from "constants/common.ts";
import {PERMISSIONS, request} from "react-native-permissions";
import {Asset, CameraType, ImagePickerResponse, launchCamera} from "react-native-image-picker";
import {Alert} from "react-native";

export const openCamera = async (cameraType?: CameraType, onDidCancel?: () => void) : Promise<Asset | undefined | null> => {
	if (isIos) {
		const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);

		if (cameraPermission === 'granted') {
			await launchCamera(
				{
					mediaType: 'photo',
					includeBase64: false,
					quality: 0.9,
					cameraType: cameraType,
					presentationStyle: 'fullScreen',
				},
				response => {
					console.log(response)
					if (response.didCancel) {
						onDidCancel?.()
						// try {
						// 	analytics().logEvent('verify_selfie_camera_cancelled', {
						// 		name,
						// 		email,
						// 		accountType,
						// 		date,
						// 		gender,
						// 		phoneNumber: auth()?.currentUser?.phoneNumber,
						// 		createdAt: moment().format('YYYY-MM-DD HH:ss'),
						// 	});
						// } catch (e) {
						// 	console.error(e);
						// }

						console.error('User cancelled the camera');
					}

					if (response.errorCode === 'camera_unavailable') {
						Alert.alert('Camera is not available');
					}

					if (response.errorCode === 'permission') {
						Alert.alert('Permission not granted');
					}
					if (response.assets) {
						return response.assets[0];
					}
					return null;
				},
			);
		} else {
			Alert.alert('Camera permission not granted');
			return null;
		}
	}
};
