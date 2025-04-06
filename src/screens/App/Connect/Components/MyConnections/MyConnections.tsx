import React from 'react';
import {Text} from 'react-native';
import {Container} from './MyConnections.style';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

const MyConnections = () => {
  return (
    <DefaultBackground>
      <Container>
        <Text>My Connections Screen</Text>
      </Container>
    </DefaultBackground>
  );
};

export default MyConnections;
