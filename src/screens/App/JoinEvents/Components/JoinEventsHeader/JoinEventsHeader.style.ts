import styled from 'styled-components/native';
import {blackColor, grayColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const HeaderContainer = styled.View`
  display: flex;
  background-color: ${blackColor};
  border-bottom-width: 1px;
  border-bottom-color: ${grayColor}20;
  padding-top: 12px;
`;

export const TabContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 35px;
`;

export const TabButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 8px;
  position: relative;
`;

export const TabText = styled.Text`
  color: rgba(255, 255, 255, 0.64);
  text-align: center;
  font-family: ${Satoshi500};
  font-size: 16px;
  font-style: normal;
`;

export const ActiveTabText = styled(TabText)`
  color: #ffffff;
`;

export const Underline = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #ffffff;
`;
