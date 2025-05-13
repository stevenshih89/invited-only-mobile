import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';

export const AdditionalPhotosContainer = styled.View`
  margin-top: 24px;
  gap: 34px;
`;

export const AdditionalPhoto = styled(FastImage)`
  aspect-ratio: 9/16;
  border-radius: 20px;
  width: 100%;
`;
export const Container = styled.View`
  display: flex;
  flex: 1;
`;

export const ActivityIndicatorStyle = StyleSheet.create({
  indicator: {
    alignSelf: 'center',
    marginTop: -10,
    position: 'absolute',
    top: '50%',
    zIndex: 1
  }
}).indicator;