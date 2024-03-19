import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';

export const uploadImage = async (imagePath: {image: string | null; id: number}, userId: string | null) => {
  const uploadUri = Platform.OS === 'ios' ? imagePath?.replace('file://', '') : imagePath;
  const filename = `${userId}_${new Date().getTime()}`;
  const storageRef = storage().ref(`images/${filename}`);
  const task = storageRef.putFile(uploadUri);
  try {
    await task;
    // Get the URL to the uploaded image
    const url = await storageRef.getDownloadURL();
    return url;
  } catch (e) {
    console.error(e);
    return null;
  }
};
