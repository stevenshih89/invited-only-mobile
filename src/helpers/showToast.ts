import Toast from 'react-native-toast-message';
import {screenWidth} from 'constants/common.ts';
export type UseToastType = 'success' | 'pending' | 'warning' | 'cancel' | 'customToast' | 'warningGrey'| 'inviteMatch';

export const showToast = (type: UseToastType, message: string, title?: string, props?: any) => {  
  if (!title) {
    if (type === 'success') {
      title = 'Event successfully created';
    }
    if (type === 'pending') {
      title = 'Your event in review.';
    }
    if (type === 'cancel') {
      title = '';
    }
    if (type === 'warning') {
      title = '';
    }
    if (type === 'warningGrey') {
      title = '';
    }
  }

  Toast.hide();
  setTimeout(() => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      topOffset: screenWidth > 377 ? 86 : 46,
      props
    });
  }, 300);
};
