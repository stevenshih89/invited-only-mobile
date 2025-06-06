import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Formik} from 'formik';
import {components} from '@invited-only/invited-only-api';
import GuestInvitationStep from '../GuestInvitationStep';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-fast-image', () => 'FastImage');

describe('GuestInvitationStep', () => {
  const mockHandleNextStep = jest.fn();

  const mockInitialValues: Partial<components['schemas']['EventData']> = {
    name: 'Test Event',
    date: '2024-03-20',
    hour: '12:00',
    description: 'Test Description',
    placeName: 'Test Place',
    address: 'Test Address',
    meetingSpot: 'Test Meeting Spot',
    photos: [],
    maleFriend: 0,
    femaleFriend: 0,
  };

  const mockValidationSchema = {
    validate: () => ({}),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithFormik = (initialValues = mockInitialValues) => {
    return render(
      <Formik initialValues={initialValues} validationSchema={mockValidationSchema} onSubmit={jest.fn()}>
        <GuestInvitationStep handleNextStep={mockHandleNextStep} />
      </Formik>,
    );
  };

  it('renders all form fields correctly', () => {
    const {getByText} = renderWithFormik();

    expect(getByText('How many Guests would you like to invite?')).toBeTruthy();
    expect(getByText('Woman')).toBeTruthy();
    expect(getByText('Male')).toBeTruthy();
  });

  it('handles navigation buttons correctly', () => {
    const {getByText} = renderWithFormik();

    fireEvent.press(getByText('Continue'));
    expect(mockHandleNextStep).toHaveBeenCalled();
  });

  it('does not display error message when guests are selected', () => {
    const {getByText, queryByText} = renderWithFormik({
      ...mockInitialValues,
      maleFriend: 1,
      femaleFriend: 0,
    });

    fireEvent.press(getByText('Continue'));

    expect(queryByText('At least one guest is required')).toBeNull();
  });
});
