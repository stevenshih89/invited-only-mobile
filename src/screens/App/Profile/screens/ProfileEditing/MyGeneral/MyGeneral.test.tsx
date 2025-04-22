import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyGeneral from './MyGeneral';

describe('MyGeneral Component', () => {
  const mockProps = {
    work: '',
    date: '',
    gender: '',
    showAge: false,
    setShowAge: jest.fn(),
    setShowGender: jest.fn(),
    setIsVisibleGenderModal: jest.fn(),
    setIsVisibleHeightModal: jest.fn(),
    setIsVisibleBirthdayModal: jest.fn(),
    setDate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with empty values', () => {
    const { getByText, getByTestId } = render(<MyGeneral name={'Test User'} {...mockProps} />);

    expect(getByText('General')).toBeTruthy();
    expect(getByText('Gender')).toBeTruthy();
    expect(getByText('Date of birthday*')).toBeTruthy();
  });



  it('displays filled values correctly', () => {
    const filledProps = {
      ...mockProps,
      gender: 'man',
      date: '01.01.1990',
    };

    const { getByText } = render(<MyGeneral name={'Test User'} {...filledProps} />);

    expect(getByText('man')).toBeTruthy();
  });
});
