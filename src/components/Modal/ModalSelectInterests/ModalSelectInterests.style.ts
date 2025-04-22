import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {black2Color, lightGray2Color, whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';

export const StyledModal = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
  z-index: 999;
`;

export const Wrapper = styled.View`
  background-color: ${black2Color};
  height: 90%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  align-items: center;
  padding-horizontal: 24px;
`;

export const WhiteLine = styled.View`
  margin-top: ${screenHeight / 50}px;
  margin-bottom: ${screenHeight / 48}px;
  background-color: ${whiteColor};
  height: 2px;
  width: 40px;
  border-radius: 10px;
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(24, 932)}px;
  color: ${whiteColor};
  text-align: center;
  margin-bottom: 24px;
`;

export const SearchContainer = styled.View`
  width: 100%;
  margin-bottom: 34px;
  align-items: center;
  border-radius: 100px;
`;

export const SearchIconContainer = styled.View`
  position: absolute;
  z-index: 20;
  left: 24px;
  top: 18px;
`;

export const SearchInput = styled.TextInput`
  padding-vertical: 16px;
  padding-left: 56px;
  padding-right: 44px;
  background-color: ${lightGray2Color};
  border-radius: 100px;
  width: 100%;
  font-size: ${RFValue(18, 932)}px;
  font-family: ${Satoshi400};
  color: ${whiteColor};
`;

export const ListContainer = styled.View`
  height: ${screenHeight * 0.7}px;
  width: 100%;
`;

export const InterestGrid = styled.FlatList`
  width: 100%;
`;

export const InterestItem = styled.TouchableOpacity`
  width: 48%;
  margin-horizontal: 1%;
  margin-bottom: 16px;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
`;

export const InterestImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export const InterestOverlay = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const InterestTitle = styled.Text`
  font-family: ${Satoshi700};
  font-size: ${RFValue(20, 932)}px;
  color: ${whiteColor};
  padding: 16px;
`;

export const SelectionIndicator = styled.View<{isSelected: boolean}>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: 'rgba(255,255,255, 0.6)';
  background-color: ${(props: {isSelected: boolean}) => (props.isSelected ? whiteColor : 'rgba(0,0,0, 0.5)')};
  position: absolute;
  top: 12px;
  right: 12px;
  justify-content: center;
  align-items: center;
`;

export const SaveButtonWrapper = styled.View`
  position: absolute;
  bottom: 48px;
  width: 100%;
`;
