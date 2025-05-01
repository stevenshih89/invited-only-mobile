import React from 'react';
import {render} from '@testing-library/react-native';
import VerifyFirstStep from '../VerifyFirstStep';
import {AuthContext} from 'contexts/AuthContext';

const mockOnBoarding = [
  {name: 'John Doe'},
  {gender: 'male'},
  {email: 'john.doe@example.com'},
  {date: '1990-01-01'},
  {photos: [{id: 0, image: 'https://example.com/photo.jpg'}]},
];

describe('VerifyFirstStep Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly with initial state', () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [...mockOnBoarding, {accountType: 'guest'}],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <VerifyFirstStep />
      </AuthContext.Provider>,
    );
    expect(getByText('Verify yourself')).toBeTruthy();
    expect(getByText('Copy this position. Your face must be clearly visible.')).toBeTruthy();
  });
});
