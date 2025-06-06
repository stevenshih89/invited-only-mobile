import React from 'react';
import {render} from '@testing-library/react-native';
import {Formik} from 'formik';
import EventDatePicker from '../EventDatePicker';

jest.mock('react-native-date-picker', () => ({
  __esModule: true,
  default: 'DatePicker',
}));

describe('EventDatePicker', () => {
  const mockInitialValues = {
    date: '2024-03-20',
    hour: '12:00',
  };

  const mockValidationSchema = {
    validate: () => ({}),
  };

  const renderWithFormik = (initialValues = mockInitialValues) => {
    return render(
      <Formik initialValues={initialValues} validationSchema={mockValidationSchema} onSubmit={jest.fn()}>
        <EventDatePicker />
      </Formik>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders date and time fields', () => {
    const {getByText, getByPlaceholderText} = renderWithFormik();

    expect(getByText('Date *')).toBeTruthy();
    expect(getByText('Hour *')).toBeTruthy();
    expect(getByPlaceholderText('MM/DD/YY')).toBeTruthy();
    expect(getByPlaceholderText('00:00')).toBeTruthy();
  });

  it('displays formatted date', () => {
    const {getByDisplayValue} = renderWithFormik();

    expect(getByDisplayValue('03/20/24')).toBeTruthy();
  });

  it('displays formatted time', () => {
    const {getByDisplayValue} = renderWithFormik();

    expect(getByDisplayValue('12:00')).toBeTruthy();
  });
});
