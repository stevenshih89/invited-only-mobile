import styled from 'styled-components/native';
import { blackColor, whiteColor } from 'constants/colors';
import { Satoshi500 } from 'constants/fonts';


export const PersonContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 8px 0px;
    gap: 16px;
    height: 72px;
    align-self: stretch;
    width: 100%;
    flex-grow: 0;
`;



export const ProfileImageContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    background-color: ${blackColor};
    border-radius: 60px; 
    overflow: hidden; 
    flex-shrink: 0; 
`;

export const ProfileImage = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px; 
`;

export const TextInfoContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 18px;
    height: 46px; 
    flex-grow: 1;
    flex-shrink: 1;
`;

export const NameAgeContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    /* width: 164px; */ /* Removed fixed width */
    height: 46px; /* Fixed height from CSS */
    flex-grow: 1; /* Allow growing */
    flex-shrink: 1; /* Allow shrinking */
    justify-content: center; /* Vertically center name/age */
`;

export const NameText = styled.Text`
    /* width: 48px; */ /* Dynamic width */
    /* height: 22px; */ /* Dynamic height */
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px; /* 16 * 1.4 */
    color: #FFFFFF;
    flex-grow: 0;
`;

// Container for Age Text (Frame 2087328954 in CSS seems primarily for layout)
export const AgeTextContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px; /* If an icon was intended */
    /* width: 79px; */ /* Dynamic width */
    height: 20px; /* Fixed height from CSS */
    flex-grow: 0;
`;

export const AgeText = styled.Text`
    /* width: 79px; */ /* Dynamic width */
    /* height: 20px; */ /* Dynamic height */
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px; /* 14 * 1.4 */
    color: rgba(255, 255, 255, 0.72);
    flex-grow: 0;
`;

export const ApproveButtonContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    gap: 8px;
    width: 70px; /* Fixed width from CSS */
    height: 32px; /* Fixed height from CSS */
    background-color: #FFFFFF; /* backdrop-filter not standard RN */
    border-radius: 100px; /* High value for rounded ends */
    flex-shrink: 0; /* Prevent shrinking */
`;
export const ApproveButtonText = styled.Text`
    /* width: 54px; */ /* Dynamic width */
    /* height: 17px; */ /* Dynamic height */
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px; /* 14 * 1.21 */
    color: #010101;
    flex-grow: 0;
`;
export const WaitingContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 100px;
    background-color: rgba(12, 12, 12, 1);
    padding: 4px 10px;
    gap: 8px;
    width: 92px;
    height: 32px;
    border: 1px solid rgba(255, 255, 255, 0.5);

`;

export const WaitingText = styled.Text`
    font-family: ${Satoshi500};
    font-size: 12px;
    line-height: 16.94px;
    color:${whiteColor};
`;