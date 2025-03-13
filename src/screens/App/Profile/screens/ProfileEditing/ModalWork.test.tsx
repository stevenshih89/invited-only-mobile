import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ModalWork from './ModalWork';

const mockSetShowWork = jest.fn();
const mockSetTextNameWork = jest.fn();
const mockSetTextDescription = jest.fn();
const mockSaveUserInfo = jest.fn();
const mockOnClose = jest.fn();

const defaultProps = {
  isVisible: true,
  onClose: mockOnClose,
  showWork: false,
  setShowWork: mockSetShowWork,
  saveUserInfo: mockSaveUserInfo,
  textNameWork: '',
  setTextNameWork: mockSetTextNameWork,
  textDescription: '',
  setTextDescription: mockSetTextDescription,
};

describe('ModalWork Component', () => {
  it('renders correctly with title and inputs', () => {
    const {getByText, getByPlaceholderText} = render(<ModalWork {...defaultProps} />);
    expect(getByText('What do you do for living?')).toBeTruthy();
    expect(getByPlaceholderText('Enter your title')).toBeTruthy();
    expect(getByPlaceholderText('Enter company (or just industry)')).toBeTruthy();
  });

  it('updates textNameWork state on input', () => {
    const {getByPlaceholderText} = render(<ModalWork {...defaultProps} />);
    const titleInput = getByPlaceholderText('Enter your title');

    fireEvent.changeText(titleInput, 'Software Engineer');

    expect(mockSetTextNameWork).toHaveBeenCalledWith('Software Engineer');
  });

  it('updates textDescription state on input', () => {
    const {getByPlaceholderText} = render(<ModalWork {...defaultProps} />);
    const descriptionInput = getByPlaceholderText('Enter company (or just industry)');

    fireEvent.changeText(descriptionInput, 'Tech Company');

    expect(mockSetTextDescription).toHaveBeenCalledWith('Tech Company');
  });

  it('toggles showWork state on switch change', () => {
    const {getByRole} = render(<ModalWork {...defaultProps} />);
    const switchElement = getByRole('switch');

    fireEvent(switchElement, 'onChange', true);

    expect(mockSetShowWork).toHaveBeenCalledWith(true);
  });

  it('calls saveUserInfo and closes modal on Save button press', () => {
    const {getByText} = render(<ModalWork {...defaultProps} />);
    const saveButton = getByText('Save');

    fireEvent.press(saveButton);

    expect(mockSaveUserInfo).toHaveBeenCalledWith('Work');
    expect(mockOnClose).toHaveBeenCalled();
  });
});
