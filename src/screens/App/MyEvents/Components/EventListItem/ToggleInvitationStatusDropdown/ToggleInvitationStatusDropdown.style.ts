import styled from 'styled-components/native';

import { Satoshi400, Satoshi500 } from 'constants/fonts';


export const DropdownContainer = styled.View`
  background-color: rgba(12, 12, 12, 1);
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;
`;

export const DropdownItem = styled.TouchableOpacity`
  padding: 14px 16px;
  position: relative;
`;

export const Separator = styled.View`
  height: 1px;

  margin: 4px 0;
`;

export const InvitationStepAndStatusContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 14px;
`;

export const ConnectingLine = styled.View<{ isCompleted?: boolean }>`
    position: absolute;
    left: 33px;
    top: 50px;
    bottom: -25px;
    width: 2px;
    background-color: ${({ isCompleted }: { isCompleted?: boolean }) => isCompleted ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.24)'};
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
    background-color: rgb(60, 60, 60);
    border-radius: 36px;
    overflow: hidden;
`;

export const InvitationStepText = styled.Text`
    font-family: ${Satoshi500};
    font-size: 16px;
    line-height: 16.94px;
    color:rgb(251, 251, 251);
`;

export const InvitationStatusText = styled.Text`
    font-family: ${Satoshi500};
    font-size: 16px;
    line-height: 16.94px;
    color:rgb(251, 251, 251);
`;

export const InvitationStatusDescription = styled.Text`
    font-family: ${Satoshi400};
    font-size: 12px;
    line-height: 16.94px;
    color:rgba(255, 255, 255, 0.5);
`;