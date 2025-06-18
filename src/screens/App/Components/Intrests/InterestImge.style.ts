import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {whiteColor} from 'constants/colors';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import CheckedIcon from 'src/assets/images/icons/checked-interest-icon.svg';
import UncheckedIcon from 'src/assets/images/icons/unchecked-interest-icon.svg';

export const InterestImageContainer = styled.ImageBackground`
    width: 100%;
    height: 100%;
    display: flex;
`;
export const InterestImageOverlay = styled.View<{isSelected: boolean}>`
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    ${({isSelected}: {isSelected: boolean}) =>
        isSelected &&
        `
    border-radius: 20px;
    border-color: ${whiteColor};
    border-width: 1px;
  `}
`;

export const LeftContainer = styled.View`
    height: 100%;
    width: 70%;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 10px;
`;

export const InterestText = styled.Text`
    color: ${whiteColor};
    font-size: 16px;
    font-family: ${Satoshi700};
`;

export const WhiteTextInfo = styled.Text`
    font-family: ${Satoshi500};
    font-size: ${RFValue(16, 932)}px;
    color: ${whiteColor};
`;

export const RightContainer = styled.View`
    flex: 1;
    width: 30%;
    height: 100%;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 10px;
`;

export const CheckedIconStyled = styled(CheckedIcon)`
    width: 24px;
    height: 24px;
`;

export const UncheckedIconStyled = styled(UncheckedIcon)`
    width: 24px;
    height: 24px;
`;

export const InterestsContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 20px;
    gap: 8px;
    flex-wrap: wrap;
`;
export const CardLabel = styled.Text`
    font-family: ${Satoshi500};
    color: ${whiteColor};
    opacity: 0.5;
`;

export const RoundedTextViewContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 5px;
    padding-right: 8px;
    flex-direction: row;
    background-color: #1c1c1c;
`;

export const InterestImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

export const InterestImageRoundSmall = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 20px;
    margin-right: 5px;
`;
