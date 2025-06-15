import React, { useContext } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Formik } from 'formik';
import { components } from '@invited-only/invited-only-api';
import PreviewEventStep from '../PreviewEventStep';
import { useAuthStore } from 'src/store/authStore';
import { BackendApiContext } from 'contexts/BackendApiContex';

jest.mock('src/store/authStore');
jest.mock('contexts/BackendApiContex', () => ({
  useQuery: jest.fn(),
}));
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-fast-image', () => 'FastImage');

const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;
const mockUseQuery = jest.fn();

describe('PreviewEventStep', () => {
  const mockHandleNextStep = jest.fn();
  const mockHandleBackStep = jest.fn();

  const mockInitialValues: Partial<components['schemas']['EventData']> = {
    name: 'Test Event',
    date: '2024-03-20',
    hour: '12:00',
    description: 'Test Description',
    placeName: 'Test Place',
    address: 'Test Address',
    meetingSpot: 'Test Meeting Spot',
    photos: [
      { id: 1, image: 'https://example.com/photo1.jpg' },
      { id: 2, image: 'https://example.com/photo2.jpg' },
      { id: 3, image: 'https://example.com/photo3.jpg' },
    ],
    maleFriend: 2,
    femaleFriend: 3,
  };

  const mockValidationSchema = {
    validate: () => ({}),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuthStore.mockReturnValue({
      userMetadata: { uid: 'test-uid' },
    } as any);
    mockUseQuery.mockReturnValue({
      data: {
        photos: [{ image: 'https://example.com/user-photo.jpg' }],
      },
    });
    (useContext(BackendApiContext) as any).useQuery = mockUseQuery;
  });

  const renderWithFormik = (initialValues = mockInitialValues, isEditing = false) => {
    return render(
      <Formik initialValues={initialValues} validationSchema={mockValidationSchema} onSubmit={jest.fn()}>
        <PreviewEventStep handleNextStep={mockHandleNextStep} handleBackStep={mockHandleBackStep} isEditing={isEditing} />
      </Formik>,
    );
  };

  it('renders event preview correctly', () => {
    const { getByText } = renderWithFormik();

    expect(getByText('Test Event')).toBeTruthy();
  });

  it('displays correct button text based on isEditing prop', () => {
    const { getByText, rerender } = renderWithFormik();

    expect(getByText('Create Event')).toBeTruthy();

    rerender(
      <Formik initialValues={mockInitialValues} validationSchema={mockValidationSchema} onSubmit={jest.fn()}>
        <PreviewEventStep handleNextStep={mockHandleNextStep} handleBackStep={mockHandleBackStep} isEditing={true} />
      </Formik>,
    );

    expect(getByText('Update Event')).toBeTruthy();
  });

  it('handles navigation buttons correctly', () => {
    const { getByText } = renderWithFormik();

    fireEvent.press(getByText('Cancel'));
    expect(mockHandleBackStep).toHaveBeenCalled();

    fireEvent.press(getByText('Create Event'));
    expect(mockHandleNextStep).toHaveBeenCalled();
  });

  it('handles missing photos gracefully', () => {
    const { getByText } = renderWithFormik({
      ...mockInitialValues,
      photos: [],
    });

    expect(getByText('Test Event')).toBeTruthy();
  });

  it('handles missing user photo gracefully', () => {
    mockUseQuery.mockReturnValue({
      data: {
        photos: [],
      },
    });

    const { getByText } = renderWithFormik();

    expect(getByText('Test Event')).toBeTruthy();
  });
});
