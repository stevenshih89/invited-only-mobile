import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MyBio from './MyBio';

const mockSetBio = jest.fn();

const mockBio = 'This is my bio.';

describe('MyBio Component', () => {
  it('renders correctly with title and text area', () => {
    const {getByText, getByPlaceholderText} = render(<MyBio bio={mockBio} setBio={mockSetBio} />);
    expect(getByText('My bio')).toBeTruthy();
    expect(getByPlaceholderText('Enter your bio')).toBeTruthy();
  });

  it('updates bio state on text input', () => {
    const {getByPlaceholderText} = render(<MyBio bio={mockBio} setBio={mockSetBio} />);
    const textArea = getByPlaceholderText('Enter your bio');

    fireEvent.changeText(textArea, 'Updated bio text');

    expect(mockSetBio).toHaveBeenCalledWith('Updated bio text');
  });

  it('applies placeholder and styles correctly', () => {
    const {getByPlaceholderText} = render(<MyBio bio={mockBio} setBio={mockSetBio} />);
    const textArea = getByPlaceholderText('Enter your bio');

    expect(textArea.props.placeholderTextColor).toBe('rgba(255, 255, 255, 0.3)');
    expect(textArea.props.style).toEqual([
      [
        {backgroundColor: '#ffffff', fontSize: 17, lineHeight: 22, paddingHorizontal: 8, textAlignVertical: 'top'},
        {color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Satoshi-Medium', fontSize: 16, margin: 10},
      ],
      {color: '#000000', paddingRight: 0},
      {height: 216},
      {backgroundColor: 'transparent', color: 'rgba(255, 255, 255, 1)'},
    ]);
  });
});
