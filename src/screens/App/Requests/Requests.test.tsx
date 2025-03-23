import {render} from '@testing-library/react-native';
import React from 'react';
import Requests from './Requests';
import {NavigationContainer} from '@react-navigation/native';

describe('Requests Component', () => {
  it('correctly render', () => {
    const {} = render(
      <NavigationContainer>
        <Requests />
      </NavigationContainer>,
    );
  });
});
