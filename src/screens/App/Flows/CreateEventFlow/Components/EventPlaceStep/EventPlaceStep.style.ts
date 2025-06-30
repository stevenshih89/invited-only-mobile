import styled from 'styled-components/native';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, lightRedColor, whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const Container = styled.View`
    display: flex;
    width: 100%;
    flex: 1;
`;

export const ScrollContainer = styled(ScrollView)`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding-top: 16px;
`;

export const Card = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 16px;
    gap: 24px;
    width: 100%;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    margin-bottom: 16px;
`;

export const CardTitle = styled(Text)`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
`;

export const FieldContainer = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 100%;
`;

export const FieldLabel = styled(Text)`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
`;

export const Input = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    gap: 10px;
    width: 100%;
    height: 56px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 99px;
`;

export const StyledTextInput = styled(TextInput)`
    color: #ffffff;
    width: 100%;
    font-family: 'Satoshi';
    font-size: 18px;
    line-height: 24px;
`;

export const InputText = styled(Text)`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: #767676;
`;

export const RowContainer = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
    width: 100%;
`;

export const HalfFieldContainer = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 48%;
`;

export const PhotosContainer = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 14px;
`;

export const MainPhotoContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 180px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
`;

export const SmallPhotoContainer = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 48%;
    height: 180px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
`;

export const PhotosRow = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 14px;
    width: 100%;
    height: 180px;
`;

export const AddPhotoButton = styled(TouchableOpacity)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 60px;
`;

export const AddPhotoText = styled(Text)`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: #ffffff;
`;

export const EventImage = styled.Image`
    height: 100%;
    width: 100%;
    border-radius: 5px;
`;

export const ErrorText = styled.Text`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: ${lightRedColor};
    margin-top: 4px;
`;

export const ButtonsContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 12px;
    margin-bottom: 16px;
`;

export const ContinueButton = styled.TouchableOpacity<{disabled: boolean}>`
    flex: 2;
    justify-content: center;
    align-items: center;
    background-color: ${({disabled}: {disabled: boolean}) => (disabled ? 'rgba(255, 255, 255, 0.5)' : whiteColor)};
    border-radius: 100px;
    height: 48px;
    margin-right: 12px;
    margin-left: 12px;
`;

export const ContinueButtonText = styled.Text`
    color: ${blackColor};
    font-family: ${Satoshi500};
`;

export const CancelButton = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 100px;
    height: 48px;
`;

export const CancelButtonText = styled.Text`
    color: ${whiteColor};
    font-family: ${Satoshi500};
`;

export const EventTypeImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

export const EventTypeImageRoundSmall = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 20px;
    margin-right: 5px;
`;

export const RoundedTextViewContainer = styled.TouchableOpacity<{isActive: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 100px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 5px;
    padding-right: 8px;
    flex-direction: row;
    background-color: ${({isActive}: {isActive: boolean}) => (isActive ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.05)')};
`;

export const WhiteTextInfo = styled.Text`
    font-family: ${Satoshi500};
    font-size: ${RFValue(16, 932)}px;
    color: ${whiteColor};
`;
