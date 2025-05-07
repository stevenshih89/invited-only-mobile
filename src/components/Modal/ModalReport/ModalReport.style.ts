import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { black2Color, whiteColor } from 'constants/colors';
import { screenHeight } from 'constants/common';
import { Satoshi500 } from 'constants/fonts';
import Button from 'components/Button/Button';

export const StyledModal = styled(Modal)`
  margin: 0;
  padding: 0;
  justify-content: flex-end;
  z-index: 999;
`;

export const Wrapper = styled(BottomSheetView)`
  flex: 1;
  align-items: center;
  background-color: ${black2Color};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-bottom: 100px;
`;

export const WhiteLine = styled.View`
  background-color: ${whiteColor};
  border-radius: 10px;
  height: 2px;
  margin-top: ${screenHeight / 50}px;
  margin-bottom: ${screenHeight / 48}px;
  width: 40px;
`;

export const TextReport = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(24, 932)}px;
  margin-bottom: 34px;
  text-align: center;
`;

export const ReportList = styled(FlatList as new () => FlatList<any>)`
  width: 100%;
`;

export const Separator = styled.View`
  height: 4px;
`;
export const ModalBackground = styled.View`
  background-color: ${black2Color};
  flex: 1;
`;
export const ReportButton = styled.TouchableOpacity<{ active?: boolean }>`
  align-items: center;
  flex-direction: row;
  padding-vertical: 12px;
  padding-horizontal: 24px;
  width: 100%;
  background-color: ${({ active }: { active: boolean }) => (active ? '#181818' : 'transparent')};
`;

export const IconWrapper = styled.View<{ active?: boolean }>`
  width: 32px;
  height: 32px;
  opacity: ${({ active }: { active: boolean }) => (active ? 1 : 0.4)};
`;

export const ReportText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  line-height: ${RFValue(19, 932)}px;
  margin-left: 10px;
`;

export const ButtonWrapper = styled.View`
  padding-horizontal: 24px;
  width: 100%;
`;

export const StyledButton = styled(Button).attrs({
  buttonStyle: {
    width: '100%',
  },
})``;
