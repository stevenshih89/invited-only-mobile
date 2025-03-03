import MaskedView from '@react-native-masked-view/masked-view';
import {lightGray19Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const OnBoardingTextTitle = styled.Text`
  color: white;
  text-align: center;
  word-spacing: 120;
  width: 300;
  font-family: ${Satoshi700};
  font-size: ${RFValue(22, 812)};
`;

export const BgCardImageMasked = styled(MaskedView)`
  flex: 1;
  flex-direction: column;
  width: 400;
`;

export const BgCardImage = styled.Image`
  width: 400;
  height: 414;
`;

export const OnBoardingTopViewContainer = styled.View`
  gap: 20;
  display: flex;
  justify-content: center;
  width: 400;
  height: 800;
  align-items: center;
`;

export const BackgroundDottedLineLeft = styled.Image`
  position: absolute;
  width: 300;
  height: 220;
  top: 50;
  background-color: transparent;
`;

export const BackgroundDottedLineRight = styled.Image`
  position: absolute;
  width: 280;
  top: 20;
  height: 300;
  left: 210;
`;

export const GetAccessContainer = styled.View`
  margin-bottom: ${Dimensions.get('window').height / 30};
  margin-top: 10;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const AcceptPolicyTop = styled.Text`
  font-family: ${Satoshi700};
  font-weight: 100;
  font-size: ${RFValue(14, 932)};
  color: ${lightGray19Color};
`;

export const AcceptPolicyMid = styled.Text`
  font-family: ${Satoshi700};
  font-weight: 500;
  font-size: ${RFValue(14, 932)};
  color: ${whiteColor};
`;

export const AcceptPolicyBottom = styled.Text`
  font-family: ${Satoshi700};
  font-weight: 500;
  font-size: ${RFValue(14, 932)};
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
