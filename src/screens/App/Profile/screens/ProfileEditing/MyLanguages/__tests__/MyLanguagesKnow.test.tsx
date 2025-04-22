import React from 'react';
import {render} from '@testing-library/react-native';
import MyLanguagesKnow from '../MyLanguagesKnow';

describe('MyLanguagesKnow Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<MyLanguagesKnow />);

    expect(getByText('Languages')).toBeTruthy();
    expect(getByText('Choose the languages you know')).toBeTruthy();
  });
});
