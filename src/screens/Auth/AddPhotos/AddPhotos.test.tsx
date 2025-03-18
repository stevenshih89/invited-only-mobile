import React from 'react';
import {render} from '@testing-library/react-native';
import AddPhotos from './AddPhotos';
import {AuthContext} from 'contexts/AuthContext';
const mockAuthContext = {
  onBoarding: [],
  setOnBoarding: jest.fn(),
  user: null,
  setUser: jest.fn(),
};

const renderComponent = () =>
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <AddPhotos />
    </AuthContext.Provider>,
  );

describe('AddPhotos Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    const {getByText} = renderComponent();
    expect(getByText('My photos')).toBeTruthy();
  });
});
