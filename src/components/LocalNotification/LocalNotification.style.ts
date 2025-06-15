import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {lightGray3Color, whiteColor, blackColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';

export const Success = styled.View`
  background-color: ${lightGray3Color};
  border-left-color: ${lightGray3Color};
  align-self: center;
  margin-right: 0;
  height: 84px;
  opacity: 0.94;
`;

export const Pending = styled.View`
  border-left-color: ${lightGray3Color};
  background-color: ${lightGray3Color};
  align-self: center;
  margin-right: 0;
  height: 84px;
  opacity: 0.94;
`;

export const Icon = styled.View`
  position: absolute;
  left: 10px;
  top: 10px;
`;

export const IconPending = styled.View`
  position: absolute;
  left: 13.5px;
  top: 13.5px;
`;

export const IconCancel = styled.View`
  position: absolute;
  left: 10.5px;
  top: 10.5px;
`;

export const Warning = styled.View`
  border-width: 1px;
  border-left-color: ${lightGray3Color};
  background-color: ${lightGray3Color};
  align-self: center;
  margin-right: 0;
  height: 84px;
  opacity: 0.94;
`;

export const Cancel = styled.View`
  border-width: 1px;
  border-left-color: ${lightGray3Color};
  background-color: ${lightGray3Color};
  align-self: center;
  margin-right: 0;
  height: 84px;
  opacity: 0.94;
`;

export const CustomToast = styled.View`
  height: 60px;
  width: 200px;
  align-self: flex-end;
  z-index: 2000;
`;

export const Text1 = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(16, 812)}px;
`;

export const WrapperIcon = styled.View`
  position: relative;
  left: 14.5px;
  top: 22px;
`;

export const Text2 = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 812)}px;
  margin-top: 5px;
`;

export const InviteMatchTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
`;

export const InviteMatchContainer = styled.View`
  padding-horizontal: 24px;
  width: 100%;
`;

export const InviteMatchInnerContainer = styled.View`
  background-color: #1c1c1c;
  padding: 16px;
  border-radius: 18px;
  width: 100%;
`;

export const InviteMatchRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const InviteMatchImage = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
`;

export const InviteMatchTextContainer = styled.View`
  margin-left: 16px;
  flex: 1;
`;

export const InviteMatchTextRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const InviteMatchText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 932)}px;
  line-height: ${RFValue(21, 932)}px;
  flex: 1;
  flex-wrap: wrap;
  margin-right: 8px;
`;

export const InviteMatchStatusContainer = styled.View`
  border-radius: 100px;
  background-color: ${blackColor};
`;

export const InviteMatchStatusText = styled.Text`
  font-size: ${RFValue(12, 812)}px;
  color: ${whiteColor};
  font-family: ${Satoshi500};
  padding-horizontal: 8px;
  padding-vertical: 4px;
  border-radius: 100px;
`;

export const InviteMatchSubText = styled.Text`
  color: ${whiteColor};
  margin-top: 6px;
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Satoshi400};
  line-height: ${RFValue(21, 932)}px;
`;
