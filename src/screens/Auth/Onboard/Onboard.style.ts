import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {lightGray19Color, whiteColor} from 'constants/colors';

export const OnBoardingTextTitle = styled.Text`
  color: white;
  text-align: center;
  word-spacing: 120px;
  width: 300px;
  font-family: ${Satoshi700};
  font-size: ${RFValue(22, 812)}px;
`;

export const BgCardImage = styled.Image`
  width: 400px;
  height: 414px;
`;

export const OnBoardingTopViewContainer = styled.View`
  gap: 20px;
  display: flex;
  justify-content: center;
  width: 400px;
  height: 800px;
  align-items: center;
`;

export const BackgroundDottedLineLeft = styled.Image`
  position: absolute;
  width: 300px;
  height: 220px;
  top: 50px;
  background-color: transparent;
`;

export const BackgroundDottedLineRight = styled.Image`
  position: absolute;
  width: 280px;
  top: 20px;
  height: 300px;
  left: 210px;
`;

export const GetAccessContainer = styled.View`
  margin-bottom: ${Dimensions.get('window').height / 30}px;
  margin-top: 10px;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const AcceptPolicyTop = styled.Text`
  font-family: ${Satoshi700};
  font-weight: 100;
  font-size: ${RFValue(14, 932)}px;
  color: ${lightGray19Color};
`;

export const AcceptPolicyMid = styled.Text`
  font-family: ${Satoshi700};
  font-weight: 500;
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
`;

export const AcceptPolicyBottom = styled.Text`
  font-family: ${Satoshi700};
  font-weight: 500;
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
`;

export const AccountQuestionText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
`;

export const SignInText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(14, 932)}px;
`;
