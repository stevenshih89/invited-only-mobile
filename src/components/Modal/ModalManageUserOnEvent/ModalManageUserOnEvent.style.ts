import styled from 'styled-components/native';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import {black2Color, whiteColor} from 'constants/colors';
import {Satoshi500, Satoshi400} from 'constants/fonts';

export const ModalBackground = styled.View`
  background-color: ${black2Color};
  flex: 1;
`;

export const Wrapper = styled(BottomSheetView)`
  flex: 1;
  align-items: center;
  background-color: ${black2Color};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-bottom: 100px;
`;

export const ButtonContainer = styled.View`
  margin-vertical: 24px;
`;

export const MenuList = styled.FlatList`
  width: 100%;
`;

export const MenuListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  justify-content: flex-start;
  width: 100%;
`;

export const MenuListIcon = styled.View``;

export const MenuListTextBlock = styled.View`
  gap: 4px;
`;

export const MenuListTitle = styled.Text`
  color: ${whiteColor};
  font-size: 16px;
  font-family: ${Satoshi500};
`;

export const MenuListDescription = styled.Text`
  color: rgba(255, 255, 255, 0.72);
  font-family: ${Satoshi400};
  font-size: 14px;
`;

export const MenuListSeparator = styled.View`
  height: 16px;
`;

export const ButtonContentWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const ButtonText = styled.Text`
  color: ${whiteColor};
  font-size: 14px;
  font-family: ${Satoshi500};
`;

export const Container = styled.View`
  padding-horizontal: 24px;
  width: 100%;
`;

export const StyledImage = styled(FastImage)`
  width: 56px;
  height: 56px;
  border-radius: 100px;
`;
