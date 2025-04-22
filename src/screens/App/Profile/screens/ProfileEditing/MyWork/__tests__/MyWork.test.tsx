import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Work from '../MyWork';

describe('Work Component', () => {
  const mockProps = {
    textNameWork: '',
    setTextNameWork: jest.fn(),
    textDescription: '',
    setTextDescription: jest.fn(),
    isVisibleWorkModal: true,
    setIsVisibleWorkModal: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<Work {...mockProps} />);

    expect(getByText('Work')).toBeTruthy();
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Company or industry')).toBeTruthy();
    expect(getByPlaceholderText('Enter your title')).toBeTruthy();
    expect(getByPlaceholderText('Enter company or industry')).toBeTruthy();
  });

  it('handles title input changes', () => {
    const {getByPlaceholderText} = render(<Work {...mockProps} />);
    const titleInput = getByPlaceholderText('Enter your title');

    fireEvent.changeText(titleInput, 'Software Engineer');
    expect(mockProps.setTextNameWork).toHaveBeenCalledWith('Software Engineer');
  });

  it('handles company input changes', () => {
    const {getByPlaceholderText} = render(<Work {...mockProps} />);
    const companyInput = getByPlaceholderText('Enter company or industry');

    fireEvent.changeText(companyInput, 'Tech Industry');
    expect(mockProps.setTextDescription).toHaveBeenCalledWith('Tech Industry');
  });

  it('displays existing work information', () => {
    const filledProps = {
      ...mockProps,
      textNameWork: 'Developer',
      textDescription: 'IT Company',
    };

    const {getByDisplayValue} = render(<Work {...filledProps} />);

    expect(getByDisplayValue('Developer')).toBeTruthy();
    expect(getByDisplayValue('IT Company')).toBeTruthy();
  });
});
