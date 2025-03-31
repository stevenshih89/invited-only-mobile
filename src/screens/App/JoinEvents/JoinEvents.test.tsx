import React from 'react';
import {render} from '@testing-library/react-native';
import JoinEvents from './JoinEvents';
import {NavigationContainer} from '@react-navigation/native';

const renderComponent = () =>
  render(
    <NavigationContainer>
      <JoinEvents />
    </NavigationContainer>,
  );

describe.skip('JoinEvents Component', () => {
  it('renders correctly', () => {
    const {getByText} = renderComponent();
    expect(getByText('Join Coming soon')).toBeTruthy();
  });
});
