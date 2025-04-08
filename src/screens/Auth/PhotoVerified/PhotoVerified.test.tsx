import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import PhotoVerified from './PhotoVerified';
import {AuthContext} from 'contexts/AuthContext';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';

const mockOnBoarding = [
  {name: 'John Doe'},
  {gender: 'male'},
  {email: 'john.doe@example.com'},
  {accountType: 'guest'},
  {date: '1990-01-01'},
  {photos: [{id: 0, image: 'https://example.com/photo.jpg'}]},
  {facePhoto: 'https://example.com/face.jpg'},
];

describe('PhotoVerified Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText, getByTestId} = render(
      <AuthContext.Provider
        value={{
          onBoarding: mockOnBoarding,
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <PhotoVerified />
      </AuthContext.Provider>,
    );
    expect(getByText('Congratulations! Your photo has been successfully verified. Welcome aboard!')).toBeTruthy();
    expect(getByTestId('photo-verified-image')).toBeTruthy();
  });

  it('navigates to summaryInfoPath after a delay', async () => {
    render(
      <AuthContext.Provider
        value={{
          onBoarding: mockOnBoarding,
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <PhotoVerified />
      </AuthContext.Provider>,
    );
    await waitFor(
      () => {
        expect(mockedNavigateFunction).toHaveBeenCalledWith('/summary-info');
      },
      {timeout: 4000},
    );
  });
});
