import React from 'react';
import {render} from '@testing-library/react-native';
import SwipeToInvite from './SwipeToInvite';
import {AuthContext} from 'contexts/AuthContext';

describe('SwipeToInvite Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly for guest account type', () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [{accountType: 'guest'}],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <SwipeToInvite />
      </AuthContext.Provider>,
    );
    expect(getByText('Join VIP Tables and exclusive events')).toBeTruthy();
    expect(getByText('Discover premier events and unlock exclusive invitations.')).toBeTruthy();
  });

  it('renders correctly for host account type', () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          onBoarding: [{accountType: 'host'}],
          setOnBoarding: jest.fn(),
          setUser: jest.fn(),
          user: {},
        }}>
        <SwipeToInvite />
      </AuthContext.Provider>,
    );
    expect(getByText('Build your guest list')).toBeTruthy();
    expect(
      getByText('Invite someone you’d love to have at your table or event! Dismiss anyone you’re not interested in inviting.'),
    ).toBeTruthy();
  });
});
