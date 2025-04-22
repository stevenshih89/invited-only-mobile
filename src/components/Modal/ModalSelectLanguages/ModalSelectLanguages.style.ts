import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';
import {Switch} from '@ant-design/react-native';
import RadialGradient from 'react-native-radial-gradient';
import {black2Color, whiteColor, lightGray2Color} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {screenHeight} from 'constants/common';

interface StyledProps {
  isActive: boolean;
}

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
  background-color: ${whiteColor};
  height: 2px;
  width: 40px;
  margin-top: ${screenHeight / 50}px;
  margin-bottom: ${screenHeight / 48}px;
  border-radius: 10px;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(24, 932)}px;
  text-align: center;
  margin-bottom: 24px;
`;

export const ShowProfileRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  width: 100%;
`;

export const ShowProfileText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
`;

export const StyledSwitch = styled(Switch)`
  transform: scale(0.7);
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
  height: 70%;
  width: 100%;
`;

export const ListSeparator = styled.View`
  height: 4px;
`;

export const LanguageButton = styled.TouchableOpacity<StyledProps>`
  border-style: solid;
  border-radius: 100px;
  border-color: ${({isActive}: {isActive: boolean}) => (isActive ? whiteColor : 'transparent')};
  overflow: hidden;
`;

export const LanguageContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LanguageText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(18, 932)}px;
  margin-left: 10px;
  font-family: ${Satoshi500};
`;

export const CheckboxContainer = styled.View<StyledProps>`
  width: 20px;
  height: 20px;
  border-width: 1px;
  border-color: ${({isActive}: {isActive: boolean}) => (isActive ? whiteColor : 'rgba(255, 255, 255, 0.6)')};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const StyledRadialGradient = styled(RadialGradient)`
  width: 100%;
  height: auto;
  border-radius: 100px;
  overflow: hidden;
  align-items: flex-start;
  padding-horizontal: 20px;
  padding-vertical: 18px;
  flex-direction: row;
  justify-content: space-between;
`;
