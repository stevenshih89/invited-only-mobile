import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi700, Satoshi500} from 'constants/fonts';
import {black1Color, black2Color, grayColor, lightGrayColor, lightGreenColor, whiteColor} from 'constants/colors';
import Flags from 'screens/App/Components/Flags/Flgas';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  width: 382px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.04);
  padding: 20px;
  gap: 15px;
`;

export const CardLabel = styled.Text`
  font-family: ${Satoshi500};
  color: ${whiteColor};
  opacity: 0.5;
`;
export const Title = styled.Text`
  font-family: ${Satoshi700};
  font-size: ${RFValue(16)}px;
  color: ${grayColor};
  margin-bottom: 10px;
`;

export const LanguagesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap; /* Allows pills to wrap to the next line */
  align-items: flex-start;
`;

export const LanguagePill = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${lightGrayColor};
  border-radius: 15px; /* Make it pill-shaped */
  padding: 8px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  gap: 8px;
`;

export const LanguageText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(12)}px;
  color: ${grayColor};
`;

export const LanguageFlag = styled(Flags)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

export const FlagContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  background-color: rgba(0, 0, 0, 0.08);
`;
