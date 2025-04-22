import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ModalSelectInterests from './ModalSelectInterests';

// Mock SVG components
jest.mock('assets/images/icons/search.svg', () => 'SearchIcon');
jest.mock('assets/images/icons/Check-black.svg', () => 'CheckIcon');

// Mock Button component
jest.mock('components/Button/Button', () => {
  return function MockButton({title, onPress}: {title: string; onPress: () => void}) {
    return (
      <div data-testid="save-button" onClick={onPress}>
        {title}
      </div>
    );
  };
});

describe('ModalSelectInterests', () => {
  const mockInterests = [
    {id: 1, title: 'Sports', image: null, isSelected: false},
    {id: 2, title: 'Music', image: null, isSelected: true},
  ];

  const mockProps = {
    modalInterests: true,
    setModalInterests: jest.fn(),
    onSave: jest.fn(),
    listOfInterests: mockInterests,
    setListOfInterests: jest.fn(),
  };

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<ModalSelectInterests {...mockProps} />);

    expect(getByText('Select Interests')).toBeTruthy();
    expect(getByPlaceholderText('Search')).toBeTruthy();
  });

  it('handles search input', () => {
    const {getByPlaceholderText} = render(<ModalSelectInterests {...mockProps} />);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.changeText(searchInput, 'sport');
  });
});
