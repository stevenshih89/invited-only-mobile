import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import InvitationCode from './InvitationCode';
import {AuthContext} from 'contexts/AuthContext';

const mockRoute = {
  params: {
    cameFromSummary: true,
  },
};

const mockAuthContext = {
  onBoarding: [
    {name: 'John Doe'},
    {email: 'john.doe@example.com'},
    {accountType: 'host'},
    {date: '2024-01-01'},
    {gender: 'man'},
    {photos: [{image: 'https://example.com/photo.jpg'}]},
    {facePhoto: 'https://example.com/face.jpg'},
  ],
  user: [],
  setUser: jest.fn(),
  setOnBoarding: jest.fn(),
};

const renderComponent = (props = {}) =>
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <InvitationCode {...props} />
    </AuthContext.Provider>,
  );

describe('InvitationCode Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    const {getByText} = renderComponent();
    expect(getByText('Do you have an invitation code?')).toBeTruthy();
  });

  it('handles invitation code input', () => {
    const {getByTestId} = renderComponent();
    const input = getByTestId('invitation-code-input');
    fireEvent.changeText(input, 'TESTCODE');
    expect(input.props.value).toBe('TESTCODE');
  });

  it('handles Apply code button press', async () => {
    const {getByTestId} = renderComponent();
    const input = getByTestId('invitation-code-input');
    fireEvent.changeText(input, 'TESTCODE');

    const button = getByTestId('apply-code-button');
    fireEvent.press(button);
    await waitFor(() => {
      expect.anything();
    });
  });
});
