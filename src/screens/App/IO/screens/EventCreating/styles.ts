import {StyleSheet} from 'react-native';
import {lightGray6Color, lightGray9Color, transparentWhite16Color} from 'constants/colors.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi500} from 'constants/fonts.ts';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: lightGray6Color,
      paddingHorizontal: 20,
      flex: 1,
    },
    wrapperTabSelections: {
      borderTopColor: transparentWhite16Color,
      borderTopWidth: 1,
      borderStyle: 'solid',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 24,
    },
    buttonInvitedOnly: {
      marginRight: 14,
      backgroundColor: lightGray9Color,
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    buttonEventDetails: {
      backgroundColor: lightGray9Color,
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    textInvitedOnly: {
      fontSize: RFValue(16, 812),
      fontFamily: Satoshi500,
    },
    textEventDetails: {
      fontSize: RFValue(16, 812),
      fontFamily: Satoshi500,
    },
  });
};

export default useStyles;
