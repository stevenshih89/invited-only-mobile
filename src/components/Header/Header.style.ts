import styled from 'styled-components/native';
import { blackColor } from 'constants/colors';
import { screenWidth } from 'constants/common';

export const Container = styled.View`
  background-color: ${blackColor};
  padding-horizontal: ${screenWidth / 15.5}px;
  padding-vertical: 10px;
`;

export const WrapperHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const NotificationButton = styled.TouchableOpacity`
  padding-right: 6px;
  border-radius: 50px;
  background-color: #0f0f0f;
  padding: 5px;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

export const ProfileButton = styled.TouchableOpacity`
  border-radius: 50px;
  background-color: #0f0f0f;
  padding: 5px;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

export const BadgeStyle = {
  position: 'absolute' as 'absolute',
  borderColor: '#590000',
  top: -30,
  right: -18,
  backgroundColor: '#590000',
}

export const UnreadBadgeStyle = {
  position: 'absolute' as 'absolute',
  borderColor: '#ff0000',
  borderWidth: 2,
  top: -30,
  right: -18,
  backgroundColor: '#ff0000',
}