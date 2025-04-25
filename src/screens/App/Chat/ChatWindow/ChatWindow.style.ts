import styled from "styled-components/native";
import { ScrollView } from "react-native-gesture-handler";
import { Satoshi400 } from "src/constants/fonts";
import { blackColor } from "constants/colors";
import { screenHeight } from "constants/common";

interface IsOwnProps {
    isOwn: boolean;
}

export const Container = styled.View`
    display: flex;
    height: ${screenHeight * 0.9}px;
    flex-direction: column;
    background-color: ${blackColor};
    padding-top: 16px;
    /* border: 3px solid blue; // Removed border */
`;

export const ContentContainer = styled.View`
    flex: 1;
    margin-top: 10px;
    margin-bottom: 10px;
    /* border: 3px solid limegreen; // Removed border */
`;

export const TimeBadge = styled.View`
    align-self: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 8px 16px;
    border-radius: 20px;
    margin-bottom: 16px;
`;

export const TimeText = styled.Text`
    color: white;
    font-family: ${Satoshi400};
    font-size: 12px;
`;

export const MessageContainer = styled.View<IsOwnProps>`
    margin-bottom: 16px;
    align-self: ${(props: IsOwnProps) => props.isOwn ? 'flex-end' : 'flex-start'};
    width: 100%;
`;

export const MessageRow = styled.View<IsOwnProps>`
    flex-direction: row;
    align-items: flex-start;
    justify-content: ${(props: IsOwnProps) => props.isOwn ? 'flex-end' : 'flex-start'};
    gap: 8px;
`;

export const Avatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
`;

export const MessageBubble = styled.View<IsOwnProps>`
    max-width: 80%;
    padding: 12px 16px;
    border-radius: 12px;
    background-color: ${(props: IsOwnProps) => props.isOwn ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
`;

export const MessageText = styled.Text`
    color: white;
    font-family: ${Satoshi400};
    font-size: 14px;
    line-height: 20px;
`;

export const SenderInfo = styled.View<IsOwnProps>`
    margin-top: 4px;
    margin-left: ${(props: IsOwnProps) => props.isOwn ? '0' : '40px'};
    align-items: ${(props: IsOwnProps) => props.isOwn ? 'flex-end' : 'flex-start'};
`;

export const SenderText = styled.Text`
    color: rgba(255, 255, 255, 0.6);
    font-family: ${Satoshi400};
    font-size: 12px;
`;

export const MessagesList = styled(ScrollView)`
`;

export const InputContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4px 4px 4px 24px;
    gap: 10px;
    width: 100%;
    height: 56px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 49px;
    margin-top: 16px;
`;

export const InputField = styled.TextInput`
    flex: 1;
    height: 22px;
    font-family: ${Satoshi400};
    font-size: 16px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.5);
`;

export const SendButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background: #000000;
    border-radius: 51px;
`;