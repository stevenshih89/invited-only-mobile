import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Switch} from '@rneui/themed';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';

export const Container = styled.View`
  flex: 1;
`;

export const InnerContainer = styled.View`
  background-color: ${blackColor};
  flex: 1;
  padding-horizontal: 20px;
  padding-bottom: 40px;
`;

export const StyledScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 34,
    paddingBottom: 50,
  },
})`
  flex: 1;
`;

export const ContactSection = styled.View`
  padding: 20px;
  border-radius: 10px;
  background-color: #0e0e0e;
`;

export const ContactTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  margin-bottom: 24px;
`;

export const PhoneLabel = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
`;

export const PhoneContainer = styled.View`
  margin-top: 26px;
  margin-bottom: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PhoneNumberContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PhoneNumberText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(18, 932)}px;
  font-family: ${Satoshi500};
  margin-left: 4px;
`;

export const ChangePhoneButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: {top: 20, left: 10, right: 10, bottom: 10},
})`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const ChangeButtonText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
`;

export const EmailLabel = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
  margin-bottom: 8px;
`;

export const EmailInput = styled.TextInput.attrs({
  placeholder: 'Enter your email',
  placeholderTextColor: 'rgba(255, 255, 255, 0.3)',
  editable: false,
})`
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 100px;
  padding: 16px;
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
`;

export const LocationSection = styled.View`
  flex-direction: column;
  padding: 16px;
  background-color: #0e0e0e;
  border-radius: 20px;
  margin-top: 8px;
`;

export const LocationHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const LocationTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
`;

export const LocationDescription = styled.Text`
  font-family: ${Satoshi400};
  color: #727579;
  font-size: ${RFValue(14, 932)}px;
`;

export const DeleteAccountButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #0e0e0e;
  padding: 20px;
  margin-top: 8px;
`;

export const DeleteAccountContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.View`
  background-color: #141414;
  border-radius: 15px;
  padding: 8px;
`;

export const DeleteAccountText = styled.Text`
  color: ${whiteColor};
  margin-left: 10px;
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
`;

export const StyledSwitch = styled(Switch)`
  transform: scale(0.7);
`;
