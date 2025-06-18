import styled from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';
import { RFValue } from 'react-native-responsive-fontsize';
import CountDown from 'react-native-countdown-component';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import { whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

export const Container = styled.View`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

`;

export const ModalWrapper = styled.View`
  margin-top: auto;
  width: 100%;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  align-self: center;
  position: relative;
`;

export const ContentWrapper = styled.View`
  width: 100%;
  align-items: center;
  padding: 24px;
`;

export const StyledBlurView = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  overflow: hidden;
`;

export const LockBadgeContainer = styled.View`
  align-items: center;
`;


export const LockText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  color: ${whiteColor};
  margin-top: 8px;
`;

export const Description = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
  opacity: 0.8;
  align-self: center;
  text-align: center;
  margin-top: 8px;
`;

export const CountdownContainer = styled.View`
  width: 100%;
  margin-top: 24px;
`;

export const CountdownWrapper = styled.View`
  padding-bottom: 12px;
  border-radius: 10px;
  width: 100%;

`;

export const StyledCountDown = styled(CountDown).attrs({

  digitStyle: {
    backgroundColor: 'transparent',
    height: 64,
  },
  separatorStyle: {
    color: 'rgba(255, 255, 255, 0.64)',
  },
  digitTxtStyle: {
    color: whiteColor,
    fontFamily: Satoshi500,
    fontSize: RFValue(56, 932),
  },
  timeLabelStyle: {
    fontFamily: Satoshi400,
    fontSize: RFValue(12, 932),
    marginTop: 0,
  },
})``;

export const StyledRadialGradient = styled(RadialGradient).attrs({
  colors: ['rgba(26,26,26,0.4)', 'rgba(0,0,0,0)'],
  stops: [0, 0.695],
  center: [0.5, 0.5], // center of the view
  radius: 300, // will be set in the component for full coverage
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  z-index: 2;
  overflow: hidden;
`;
