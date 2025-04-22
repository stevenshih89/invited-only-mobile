import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MyInterests from './MyInterests';

// Mock the ArrowRight icon
jest.mock('assets/images/icons/arrow-right-s-line.svg', () => 'ArrowRight');

describe('MyInterests', () => {
  const mockInterests = [
    {id: 1, title: 'Sports', image: null, isSelected: true},
    {id: 2, title: 'Music', image: null, isSelected: true},
    {id: 3, title: 'Art', image: null, isSelected: true},
  ];

  const mockProps = {
    listOfInterests: mockInterests,
    loading: false,
    setIsVisibleInterestsModal: jest.fn(),
  };

  it('renders loading indicator when loading', () => {
    const {getByTestId} = render(<MyInterests {...mockProps} loading={true} />);

    expect(getByTestId('my-interests-loading-indicator')).toBeTruthy();
  });

  it('renders interests correctly', () => {
    const {getByText} = render(<MyInterests {...mockProps} />);

    expect(getByText('Interests')).toBeTruthy();
    expect(getByText('Sports')).toBeTruthy();
    expect(getByText('Music')).toBeTruthy();
    expect(getByText('+1')).toBeTruthy();
  });

  it('opens modal on press', () => {
    const {getByTestId} = render(<MyInterests {...mockProps} />);
    const openButton = getByTestId('open-interests-modal');

    fireEvent.press(openButton);
    expect(mockProps.setIsVisibleInterestsModal).toHaveBeenCalledWith(true);
  });
});
