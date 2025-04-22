import React from 'react';
import {render} from '@testing-library/react-native';
import ModalDefault from './ModalDefault';

describe('ModalDefault', () => {
  const mockProps = {
    isVisible: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    title: 'Test Title',
    description: 'Test Description',
  };

  it('renders correctly with all props', () => {
    const {getByText} = render(<ModalDefault {...mockProps} />);

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });
});
