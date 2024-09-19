import {RFValue} from 'react-native-responsive-fontsize';

export const getFontSize = (name: string) => {
  const baseSize = 20;
  const maxLength = 8;
  const lengthOffset = Math.max(0, name.length - maxLength);

  return RFValue(baseSize - Math.min(lengthOffset, 7), 812);
};
