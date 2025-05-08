import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { whiteColor, blackColor, grayColor } from 'constants/colors';
import { Satoshi400, Satoshi500, Satoshi700 } from 'constants/fonts';
import { screenHeight, screenWidth } from 'constants/common';

export const Container = styled.View`
    flex-direction: row;
    padding: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #333;
    width: 100%;
    background-color: ${blackColor};
`;

export const NarrowLeftContainer = styled.View`
    margin-right: 10px;
    align-items: center;
    justify-content: center;
`;

export const AvatarContainer = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    overflow: hidden;
`;

export const AvatarImage = styled(FastImage)`
    width: 100%;
    height: 100%;
`;

export const WideRightContainer = styled.View`
    flex: 1;
    justify-content: center;
`;

export const InnerRowContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
`;

export const TitleAndTimestampContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const TitleText = styled.Text`
    font-family: ${Satoshi700};
    font-size: 16px;
    color: ${whiteColor};
    flex-shrink: 1;
`;

export const TimestampText = styled.Text`
    font-family: ${Satoshi400};
    font-size: 12px;
    color: ${grayColor};
    margin-left: 8px;
`;

export const BodyText = styled.Text`
    font-family: ${Satoshi500};
    font-size: 14px;
    color: ${whiteColor};
    margin-top: 4px;
`;

export const UnreadIndicator = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: blue;
    margin-right: 8px;
`;

export const ActionButtonContainer = styled.View`
    margin-top: 10px;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`;

export const ActionButtonPrimary = styled.TouchableOpacity`
    background-color: ${whiteColor};
    width: ${screenWidth * 0.25};
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    height: ${screenHeight * 0.04};
`;

export const ActionButtonSecondary = styled.TouchableOpacity`
    background-color: ${grayColor};
    border-radius: 20px;
    width: ${screenWidth * 0.25};
    align-items: center;
    justify-content: center;
    height: ${screenHeight * 0.04};
`;

export const ActionButtonTextPrimary = styled.Text`
    font-family: ${Satoshi500};
    font-size: 14px;
    color: ${blackColor};
`;

export const ActionButtonTextSecondary = styled.Text`
    font-family: ${Satoshi500};
    font-size: 14px;
    color: ${whiteColor};
`;

export const SwipeContainer = styled.View`
    width: 100%;
    position: relative;
    background-color: #FF3B30;
    overflow: hidden;
`;

export const SwipeDeleteView = styled.View`
    background-color: #FF3B30;
    justify-content: center;
    align-items: flex-end;
    padding-right: 20px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const SwipeDeleteText = styled.Text`
    color: ${whiteColor};
    font-family: ${Satoshi700};
    font-size: 14px;
`;

