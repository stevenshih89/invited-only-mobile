import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ModalHeight from './ModalHeight';

// Mock BackHandler to prevent test errors
jest.mock('react-native/Libraries/Utilities/BackHandler', () => ({
  addEventListener: jest.fn(() => ({remove: jest.fn()})),
  removeEventListener: jest.fn(),
}));

const mockSetShowHeight = jest.fn();
const mockSetHeight = jest.fn();
const mockSaveUserInfo = jest.fn();
const mockOnClose = jest.fn();

const heightsList = [
  {id: 1, value: 150, label: '150 cm'},
  {id: 2, value: 160, label: '160 cm'},
  {id: 3, value: 170, label: '170 cm'},
];

const defaultProps = {
  isVisible: true,
  onClose: mockOnClose,
  showHeight: false,
  setShowHeight: mockSetShowHeight,
  height: '170 cm',
  setHeight: mockSetHeight,
  heightsList: heightsList,
  saveUserInfo: mockSaveUserInfo,
};

describe('ModalHeight Component', () => {
  it('toggles showHeight state on switch change', () => {
    const {getByRole} = render(<ModalHeight {...defaultProps} />);
    const switchElement = getByRole('switch');

    fireEvent(switchElement, 'onChange', true);

    expect(mockSetShowHeight).toHaveBeenCalledWith(true);
  });

  it('calls saveUserInfo and closes modal on Save button press', () => {
    const {getByText} = render(<ModalHeight {...defaultProps} />);
    const saveButton = getByText('Save');

    fireEvent.press(saveButton);

    expect(mockSaveUserInfo).toHaveBeenCalledWith('Height');
    expect(mockOnClose).toHaveBeenCalled();
  });
});
