import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Formik} from 'formik';
import {components} from '@invited-only/invited-only-api';
import EventPlaceStep from '../EventPlaceStep';
import useAddModalPhotos from '../AddPhotoMoald/hooks/useAddPhotoModal';

jest.mock('../AddPhotoMoald/hooks/useAddPhotoModal');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-fast-image', () => 'FastImage');

const mockUseAddModalPhotos = useAddModalPhotos as jest.MockedFunction<typeof useAddModalPhotos>;

describe('EventPlaceStep', () => {
  const mockHandleNextStep = jest.fn();
  const mockHandleBackStep = jest.fn();
  const mockHandleOpenPhotoModal = jest.fn();
  const mockHandleAddPlaceholderPhoto = jest.fn();
  const mockHandleOpenCamera = jest.fn();
  const mockHandleOpenLibrary = jest.fn();
  const mockCloseModal = jest.fn();

  const mockInitialValues: Partial<components['schemas']['EventData']> = {
    name: '',
    date: '2024-03-20',
    hour: '12:00',
    description: '',
    placeName: '',
    address: '',
    meetingSpot: '',
    photos: [],
  };

  const mockValidationSchema = {
    validate: () => ({}),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAddModalPhotos.mockReturnValue({
      handleAddPlaceholderPhoto: mockHandleAddPlaceholderPhoto,
      handleOpenCamera: mockHandleOpenCamera,
      handleOpenLibrary: mockHandleOpenLibrary,
      handleOpenPhotoModal: mockHandleOpenPhotoModal,
      isPhotoModalVisible: false,
      closeModal: mockCloseModal,
    });
  });

  const renderWithFormik = (initialValues = mockInitialValues) => {
    return render(
      <Formik initialValues={initialValues} validationSchema={mockValidationSchema} onSubmit={jest.fn()}>
        <EventPlaceStep handleNextStep={mockHandleNextStep} handleBackStep={mockHandleBackStep} />
      </Formik>,
    );
  };

  it('renders all form fields correctly', () => {
    const {getByPlaceholderText, getByText} = renderWithFormik();

    expect(getByText('Overview')).toBeTruthy();
    expect(getByPlaceholderText('Enter event name')).toBeTruthy();
    expect(getByPlaceholderText('Enter description')).toBeTruthy();

    expect(getByText('Location')).toBeTruthy();
    expect(getByPlaceholderText('Enter place name')).toBeTruthy();
    expect(getByPlaceholderText('Enter address')).toBeTruthy();
    expect(getByPlaceholderText('Enter meeting spot')).toBeTruthy();

    expect(getByText('Event Photos')).toBeTruthy();
    expect(getByText('Main')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('handles photo modal interactions', () => {
    const {getByText} = renderWithFormik();

    fireEvent.press(getByText('Main'));
    expect(mockHandleOpenPhotoModal).toHaveBeenCalledWith(1);

    fireEvent.press(getByText('2'));
    expect(mockHandleOpenPhotoModal).toHaveBeenCalledWith(2);
    fireEvent.press(getByText('3'));
    expect(mockHandleOpenPhotoModal).toHaveBeenCalledWith(3);
  });

  it('handles navigation buttons correctly', () => {
    const {getByText} = renderWithFormik();

    fireEvent.press(getByText('Cancel'));
    expect(mockHandleBackStep).toHaveBeenCalled();
    fireEvent.press(getByText('Continue'));
    expect(mockHandleNextStep).toHaveBeenCalled();
  });
});
