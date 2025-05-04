import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PlaceholderText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const ListContainer = styled(FlatList)`
  flex: 1;

`; 