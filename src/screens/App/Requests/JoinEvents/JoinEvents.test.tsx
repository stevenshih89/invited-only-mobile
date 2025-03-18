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

describe('JoinEvents Component', () => {
  it('renders correctly', () => {
    const {getByText} = renderComponent();
    expect(getByText("You don't have any requests")).toBeTruthy();
  });

  it('shows message when there are no requests', () => {
    const {getByText} = renderComponent();
    expect(getByText('Get started to join events and begin receiving event requests.')).toBeTruthy();
  });
});
