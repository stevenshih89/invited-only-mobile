import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MyBio from '../MyBio';

describe('MyBio', () => {
  const mockProps = {
    bio: '',
    setBio: jest.fn(),
  };

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<MyBio {...mockProps} />);

    expect(getByText('Bio')).toBeTruthy();
    expect(getByPlaceholderText('Enter your bio')).toBeTruthy();
  });

  it('handles text input', () => {
    const {getByPlaceholderText} = render(<MyBio {...mockProps} />);
    const input = getByPlaceholderText('Enter your bio');

    fireEvent.changeText(input, 'Hello, world!');
    expect(mockProps.setBio).toHaveBeenCalledWith('Hello, world!');
  });

  it('displays existing bio', () => {
    const propsWithBio = {
      ...mockProps,
      bio: 'Existing bio text',
    };

    const {getByDisplayValue} = render(<MyBio {...propsWithBio} />);
    expect(getByDisplayValue('Existing bio text')).toBeTruthy();
  });
});
