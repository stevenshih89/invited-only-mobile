import React from 'react';
import { render } from '@testing-library/react-native';
import InvitationCode from '../InvitationCode';
import { useInvitationCode } from '../hooks/useInvitationCode';

jest.mock('../hooks/useInvitationCode', () => ({
  useInvitationCode: jest.fn(),
}));

describe('InvitationCode', () => {
  const mockInvitationCode = {
    isSuccessfullySubmitted: false,
    code: '',
    setCode: jest.fn(),
    ref: { current: null },
    props: {},
    getCellOnLayoutHandler: jest.fn(),
    isIncorrectCode: false,
    cellCount: 6,
    handleSubmit: jest.fn(),
  };

  beforeEach(() => {
    (useInvitationCode as jest.Mock).mockReturnValue(mockInvitationCode);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial state correctly', () => {
    const { getByText } = render(<InvitationCode />);

    expect(getByText('Do not have an invitation code?')).toBeTruthy();
    expect(getByText('Share socials for invite')).toBeTruthy();
  });
});
