import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ModalAddPhoto from '../ModalAddPhoto';

jest.mock('assets/images/icons/plus.svg', () => 'PlusIcon');
jest.mock('assets/images/icons/image.svg', () => 'ImageIcon');
jest.mock('assets/images/icons/camera.svg', () => 'CameraIcon');

describe('ModalAddPhoto', () => {
  const mockOnClose = jest.fn();
  const mockOpenCamera = jest.fn();
  const mockOpenLibrary = jest.fn();
  const mockAddPlaceholderPhoto = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const {getByText} = render(
      <ModalAddPhoto
        isVisible={true}
        onClose={mockOnClose}
        openCamera={mockOpenCamera}
        openLibrary={mockOpenLibrary}
        addPlaceholderPhoto={mockAddPlaceholderPhoto}
      />,
    );

    expect(getByText('Event photos')).toBeTruthy();
    expect(getByText('Use a camera')).toBeTruthy();
    expect(getByText('Upload from galery')).toBeTruthy();
    expect(getByText('Use a placeholder')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const {queryByText} = render(
      <ModalAddPhoto
        isVisible={false}
        onClose={mockOnClose}
        openCamera={mockOpenCamera}
        openLibrary={mockOpenLibrary}
        addPlaceholderPhoto={mockAddPlaceholderPhoto}
      />,
    );

    expect(queryByText('Event photos')).toBeNull();
    expect(queryByText('Use a camera')).toBeNull();
    expect(queryByText('Upload from galery')).toBeNull();
    expect(queryByText('Use a placeholder')).toBeNull();
  });

  it('calls openCamera when camera option is pressed', () => {
    const {getByText} = render(
      <ModalAddPhoto
        isVisible={true}
        onClose={mockOnClose}
        openCamera={mockOpenCamera}
        openLibrary={mockOpenLibrary}
        addPlaceholderPhoto={mockAddPlaceholderPhoto}
      />,
    );

    fireEvent.press(getByText('Use a camera'));
    expect(mockOpenCamera).toHaveBeenCalledTimes(1);
  });

  it('calls openLibrary when gallery option is pressed', () => {
    const {getByText} = render(
      <ModalAddPhoto
        isVisible={true}
        onClose={mockOnClose}
        openCamera={mockOpenCamera}
        openLibrary={mockOpenLibrary}
        addPlaceholderPhoto={mockAddPlaceholderPhoto}
      />,
    );

    fireEvent.press(getByText('Upload from galery'));
    expect(mockOpenLibrary).toHaveBeenCalledTimes(1);
  });

  it('calls addPlaceholderPhoto when placeholder option is pressed', () => {
    const {getByText} = render(
      <ModalAddPhoto
        isVisible={true}
        onClose={mockOnClose}
        openCamera={mockOpenCamera}
        openLibrary={mockOpenLibrary}
        addPlaceholderPhoto={mockAddPlaceholderPhoto}
      />,
    );

    fireEvent.press(getByText('Use a placeholder'));
    expect(mockAddPlaceholderPhoto).toHaveBeenCalledTimes(1);
  });
});
