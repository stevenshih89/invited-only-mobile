import React from 'react';
import { render } from '@testing-library/react-native';
import SuccessfullySubmitted from '../SuccessfullySubmitted';

jest.mock('hooks/user/useUser', () => jest.fn(() => ({
  user: {
    name: 'John Doe',
    photos: [{ image: 'https://example.com/photo.jpg' }],
  },
})));

describe('SuccessfullySubmitted', () => {
  it('renders correctly with user data', () => {
    const { getByText, getByTestId } = render(<SuccessfullySubmitted />);

    expect(getByText('You Got Access')).toBeTruthy();
    expect(getByText('Congratulations and welcome aboard!')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByTestId('user-image')).toHaveProp('source', {
      uri: 'https://example.com/photo.jpg',
    });
  });
});
