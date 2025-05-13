import styled from 'styled-components/native';
import { Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { lightRedColor } from 'constants/colors';

const { height } = Dimensions.get('window');

export const Container = styled.View`
  display: flex;
  width: 100%;
`;

export const ScrollContainer = styled(ScrollView)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: ${height * 0.6}px;

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
