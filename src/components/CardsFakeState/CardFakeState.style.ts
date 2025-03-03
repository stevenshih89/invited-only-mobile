import styled from 'styled-components/native';
import { blackColor, lightGray6Color, transparentWhite16Color, transparentWhite56Color, whiteColor } from 'constants/colors';
import { screenHeight } from 'constants/common';
import { Satoshi400, Satoshi700 } from 'constants/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

export const BorderButton = styled.View`
    background-color: ${transparentWhite56Color};
    width: 100%;
    height: 100%;
    border-radius: 50px;
    position: absolute;
`;

export const RoundButton = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${blackColor};
    border-radius: 50px;
    z-index: 10;
    justify-content: center;
    align-items: center;
`;

export const WrapperFakeCard = styled.View`
    background-color: ${blackColor};
`;

export const BioWrapper = styled.View`
    border-radius: 11px;
    padding-vertical: ${screenHeight / 38}px;
`;
export const TitleSection = styled.Text`
    color: ${whiteColor};
    font-family: ${Satoshi700};
    font-size: ${RFValue(18, 812)};
`;

export const WrapperInterestsTags = styled.View`
    flex: 1;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const InterestsTags = styled.View`
    border-radius: 50px;
    background-color: transparent;
    height: 43px;
    width: 96px;
    border-color: ${lightGray6Color};
    border-width: 1px;
    border-style: solid;
    margin-top: ${screenHeight / 50}px;
    justify-content: center;
    align-items: center;
`;

export const TextTagsInterests = styled.Text`
    color: ${whiteColor};
    font-family: ${Satoshi400};
    font-size: ${RFValue(15, 812)}px;
`;

export const WrapperTextTags = styled.View`
    flex: 1;
    position: relative;
    right: 18px;
`;

export const TextTagsAboutMe = styled.Text`
    align-items: center;
    text-align: center;
    color: ${whiteColor};
    font-family: ${Satoshi400};
    font-size: ${RFValue(16, 812)}px;
    margin-top: ${screenHeight / 55}px;
`;

export const WrapperInterests = styled.View`
    border-top-width: 1px;
    border-style: solid;
    border-top-color: ${transparentWhite16Color};
    margin-top: ${screenHeight / 44}px;
    padding-top: ${screenHeight / 44}px;
`;

export const WrapperImageSectionFaceGirl = styled.View`
    align-items: center,
`;

export const WrapperButtonsFooter = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: ${screenHeight / 17}px;
    margin-top: 34px;
`;

export const ButtonCloseOrCheck = styled.TouchableOpacity`
    background-color: black;
    border-radius: 50px;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-horizontal: 1px;
`;

export const ButtonFlash = styled.View`
  width: 61px;
  height: 61px;
  background-color: black;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;
