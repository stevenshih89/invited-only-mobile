import styled from 'styled-components/native';

import {BlurView} from '@react-native-community/blur';
import {TouchableOpacity, View, ImageBackground, ScrollView} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Animated from 'react-native-reanimated';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {blackColor, errorColor, whiteColor} from 'constants/colors';

export const Wrapper = styled.View`
    flex: 1;
`;

export const Content = styled.View`
    flex: 1;
    padding-horizontal: 24px;
    margin-bottom: 16px;
`;

export const Container = styled.ImageBackground`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    aspect-ratio: 9/14;
    border-radius: 10px;
    overflow: hidden;
`;
export const CardContent = styled.View`
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    z-index: 3;
`;

export const BadgeContainer = styled.View`
    display: flex;
    gap: 8px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: 14px;
    background-color: #232323;
    border-radius: 100px;
    margin-top: 24px;
`;

export const ButtonsContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    gap: 12px;
    padding-left: 12px;
    padding-right: 12px;
`;

export const ContinueButton = styled.TouchableOpacity`
    flex: 2;
    justify-content: center;
    align-items: center;
    background-color: ${whiteColor};
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

export const PhotosRow = styled(View)`
    width: 100%;
    flex-direction: row;
`;

export const MainPhotoContainer = styled(View)`
    width: 100%;
    aspect-ratio: 9/14;
    margin-bottom: 16px;
    padding-horizontal: 24px;
`;

export const SmallPhotoColumn = styled(View)`
    flex: 1;
    margin-left: 6px;
`;

export const SmallPhotoTop = styled(View)`
    flex: 1;
    margin-bottom: 6px;
`;

export const SmallPhotoBottom = styled(View)`
    flex: 1;
    margin-top: 6px;
`;

export const ImageWrapper = styled(View)`
    position: relative;
    flex: 1;
    border-radius: 10px;
    overflow: hidden;
`;

export const PhotoBackground = styled(ImageBackground).attrs({
    resizeMode: 'cover',
})`
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

export const CloseButton = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7,
    hitSlop: {left: 15, bottom: 10},
})`
    width: 26px;
    height: 26px;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    border-radius: 50px;
    background-color: ${errorColor};
    margin-right: 10px;
    margin-top: 10px;
`;

export const AddPhotoButtonMain = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7,
})`
    flex: 1;
    background-color: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
`;

export const AddPhotoButtonSmall = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7,
})`
    flex: 1;
    background-color: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
`;

export const ContinueButtonContainer = styled(View)`
    margin-bottom: 4px;
`;

export const PhotoContainer = styled(Animated.View)`
    width: 48%;
    aspect-ratio: 7/8;
    border-radius: 10px;
    overflow: hidden;
`;

export const ImageContainer = styled.View`
    position: relative;
    flex: 1;
    border-radius: 10px;
    overflow: hidden;
`;

export const StyledImageBackground = styled(ImageBackground)`
    width: 100%;
    height: 100.3%;
    justify-content: space-between;
`;

export const ButtonWrapper = styled.View<{backgroundColor?: string}>`
    position: relative;
    width: 36px;
    height: 36px;

    margin-top: 10px;
    background-color: ${({backgroundColor}: {backgroundColor?: string}) => backgroundColor || '#232323'};
    border-radius: 100px;
`;

export const ButtonBlur = styled(BlurView)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    overflow: hidden;
`;

export const Button = styled(TouchableOpacity)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
`;

export const LabelContainer = styled.View`
    background-color: rgba(35, 35, 35, 0.5);
    border-radius: 42px;
    padding-horizontal: 16px;
    align-self: center;
    justify-content: center;
    align-items: center;
    padding-vertical: 2px;
    position: absolute;
    bottom: 6px;
    overflow: hidden;
`;

export const LabelBlur = styled(BlurView)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const LabelText = styled.Text`
    font-family: ${Satoshi700};
    font-size: ${RFValue(14, 932)}px;
    color: ${whiteColor};
`;

export const ScrollContainer = styled(ScrollView)`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding-top: 16px;
`;
