import styled from 'styled-components/native';
import { whiteColor } from 'constants/colors';

export const Container = styled.View`
  flex: 1;
  background-color: #000000;
  padding: 16px;
`;

export const EventImageContainer = styled.ImageBackground`
  width: 100%;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
`;

export const ImageOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: flex-end;
  padding: 16px;
`;

export const StatusContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  align-self: flex-start;
`;

export const StatusText = styled.Text`
  color: ${whiteColor};
  font-family: 'Satoshi';
  font-weight: 500;
  font-size: 14px;
`;

export const EventNameContainerAndDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const EventNameContainer = styled.View`
  flex: 1;
`;

export const EventNameLabel = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Satoshi';
  font-size: 14px;
  margin-bottom: 8px;
`;

export const EventNameText = styled.Text`
  color: ${whiteColor};
  font-family: 'Satoshi';
  font-weight: 700;
  font-size: 20px;
`;

export const EventDateContainer = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export const EventDateLabel = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Satoshi';
  font-size: 14px;
  margin-bottom: 8px;
`;

export const EventDateText = styled.Text`
  color: ${whiteColor};
  font-family: 'Satoshi';
  font-weight: 700;
  font-size: 20px;
`;

export const EventDescriptionContainer = styled.View`
  margin-bottom: 24px;
`;

export const EventDescriptionLabel = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Satoshi';
  font-size: 14px;
  margin-bottom: 8px;
`;

export const EventDescriptionText = styled.Text`
  color: ${whiteColor};
  font-family: 'Satoshi';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

// Guests section
export const GuestsContainer = styled.View`
  margin-top: 24px;
  padding: 8px 0;
  width: 100%;
`;

export const GuestsTitle = styled.Text`
  font-family: 'Satoshi';
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${whiteColor};
  margin-bottom: 16px;
`; 