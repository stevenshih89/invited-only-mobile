import styled from 'styled-components/native';
import { blackColor } from 'constants/colors';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

const dropdownBackgroundColor = 'rgb(0, 0, 0)';

export const DropdownContainer = styled.View`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${dropdownBackgroundColor};
  border-radius: 8px;
  margin-top: 4px;
  z-index: 10;
  padding: 8px 0;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;

`;

export const DropdownItem = styled.TouchableOpacity`
  padding: 12px 16px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${blackColor};
  margin: 4px 0;
`;

export const InvitationStepAndStatusContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 14px;

`;
export const InvitationStatusTextContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`;

export const InvitationStepContainer = styled.View`
    display: flex;
    width: 36px;
    height: 36px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.24);
    border-radius: 36px;

`;

export const InvitationStepText = styled.Text`
    font-family: ${Satoshi500};
    font-size: 16px;
    line-height: 120%;
    color:rgb(251, 251, 251);
`;

export const InvitationStatusText = styled.Text`
    font-family: ${Satoshi500};
    font-size: 16px;
    line-height: 120%;
    color:rgb(251, 251, 251);
`;

export const InvitationStatusDescription = styled.Text`
    font-family: ${Satoshi400};
    font-size: 12px;
    line-height: 120%;
    color:rgba(255, 255, 255, 0.5);
`;