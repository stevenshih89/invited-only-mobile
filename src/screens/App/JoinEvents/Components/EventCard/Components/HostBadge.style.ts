import styled from 'styled-components/native';
import { Satoshi500 } from 'constants/fonts';

export const HostBadgeContainer = styled.View`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  left: calc(50% - 143px / 2 + 0.5px);
  z-index: 10;
`;

export const HostBadge = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 143px;
  height: 40px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 100px;

`;

export const HostInfoRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 111px;
  height: 24px;
`;

export const HostImage = styled.Image`
  width: 24px;
  height: 24px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
`;

export const HostName = styled.Text`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 121%;
  color: #ffffff;
`;

export const GuestCountBadge = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.4);
  background-blend-mode: overlay;
  border-radius: 38px;
`;

export const GuestCountText = styled.Text`
  font-family: ${Satoshi500};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 121%;
  display: flex;
  align-items: center;
  color: #ffffff;
`;
