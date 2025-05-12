import React from 'react';
import {render} from '@testing-library/react-native';
import {ManageEventGuestInfo} from '../ManageEventGuestInfo';

jest.mock('src/api/backend-api', () => ({
  __esModule: true,
  default: {
    useQuery: jest.fn(),
  },
}));
const invitedOnlyBackendApi = require('src/api/backend-api').default;

describe('ManageEventGuestInfo', () => {
  const baseProps = {
    request: {guestId: '1'},
    title: 'New Connections',
    handleOpenModalManageUserOnEvent: jest.fn(),
  };

  it('renders user name', () => {
    invitedOnlyBackendApi.useQuery.mockReturnValue({isLoading: false, data: {name: 'Kristin', photos: [{image: 'img'}]}});
    const {getByText} = render(<ManageEventGuestInfo {...baseProps} />);
    expect(getByText('Kristin')).toBeTruthy();
  });

  it('shows Approve button if title is New Connections', () => {
    invitedOnlyBackendApi.useQuery.mockReturnValue({isLoading: false, data: {name: 'Kristin', photos: [{image: 'img'}]}});
    const {getByText} = render(<ManageEventGuestInfo {...baseProps} />);
    expect(getByText('Approve')).toBeTruthy();
  });
});
