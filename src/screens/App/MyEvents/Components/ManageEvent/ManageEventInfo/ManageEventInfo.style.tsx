import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import { blackColor, whiteColor } from "constants/colors";
import { Satoshi400, Satoshi500 } from "constants/fonts";

export const Container = styled.View`
    flex: 1;
    background-color: ${blackColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    gap: 20px;
`;


export const EventImageContainer = styled(FastImage)`
    width: 100%;
    height: 200px;
    background-color: ${blackColor};
    border-radius: 10px;
    position: relative;
`;

export const ImageOverlay = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    padding-left: 12px;
    padding-bottom: 20px;
    align-items: flex-start;
    justify-content: flex-end;
    border-radius: 10px;
    z-index: 10;
    top: 0;
    left: 0;
`;

export const StatusContainer = styled.View`
    width: 80px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.08);
`;
export const StatusText = styled.Text`
    font-size: 14px;
    font-family: ${Satoshi500};
    color: ${whiteColor};
    text-align: center;
`;

export const EventNameContainerAndDateContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
    border-radius: 20px;
    background-color: rgba(26, 26, 26, 0.8);
    padding: 15px;
`;
export const EventNameContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 5px;
`;
export const EventNameLabel = styled.Text`
    font-size: 16px;
    font-family: ${Satoshi400};
    color: rgba(255, 255, 255, 0.5);
    
`;
export const EventNameText = styled.Text`
    font-size: 16px;
    font-family: ${Satoshi500};
    color: ${whiteColor};
`;
export const EventDateContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 5px;
`;
export const EventDateLabel = styled.Text`
    font-size: 16px;
    font-family: ${Satoshi400};
    color: rgba(255, 255, 255, 0.5);
`;
export const EventDateText = styled.Text`
    font-size: 16px;
    font-family: ${Satoshi500};
    color: ${whiteColor};
`;

export const EventDescriptionContainer = styled.View`
    background-color: rgba(26, 26, 26, 0.8);
    padding: 15px;
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 5px;
`;

export const EventDescriptionLabel = styled.Text`
    font-size: 16px;
    font-family: ${Satoshi400};
    color: rgba(255, 255, 255, 0.5);
`;

export const EventDescriptionText = styled.Text`
    font-size: 16px;
    font-family: ${Satoshi500};
    color: ${whiteColor};
`;
