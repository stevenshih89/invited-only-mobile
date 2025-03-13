import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MyPlan from './MyPlan';
import {useMyPlan} from 'hooks/useMyPlan';

const mockGoToPaymentPath = jest.fn();
const mockGoToSuperInvitePay = jest.fn();

const completeUserInfo = {
  accountType: 'host',
  superInvites: 2,
  weeklySuperInvites: 3,
};

jest.mock('hooks/useMyPlan', () => {
  const originalModule = jest.requireActual('hooks/useMyPlan');
  return {
    ...originalModule,
    useMyPlan: jest.fn(() => ({
      loaderVisible: false,
      goToPaymentPath: mockGoToPaymentPath,
      goToSuperInvitePay: mockGoToSuperInvitePay,
      userInfo: completeUserInfo,
    })),
  };
});

describe('MyPlan Component', () => {
  it('renders correctly with plan details', () => {
    const {getByText} = render(<MyPlan />);
    expect(getByText('Super Invite (5)')).toBeTruthy();
    expect(getByText('Unlimited Events Creation')).toBeTruthy();
  });

  it('calls goToSuperInvitePay when Add more button is pressed', () => {
    const {getByText} = render(<MyPlan />);
    const addMoreButton = getByText('Add more');

    fireEvent.press(addMoreButton);

    expect(mockGoToSuperInvitePay).toHaveBeenCalled();
  });

  it('calls goToPaymentPath when Subscriptions button is pressed', () => {
    const {getByText} = render(<MyPlan />);
    const subscriptionsButton = getByText('Subscriptions');

    fireEvent.press(subscriptionsButton);

    expect(mockGoToPaymentPath).toHaveBeenCalled();
  });

  it('renders different content based on account type', () => {
    jest.mocked(useMyPlan).mockReturnValueOnce({
      loaderVisible: false,
      goToPaymentPath: mockGoToPaymentPath,
      goToSuperInvitePay: mockGoToSuperInvitePay,
      userInfo: {
        ...completeUserInfo,
        accountType: 'guest',
        superInvites: 1,
        weeklySuperInvites: 1,
      } as any,
    });

    const {getByText} = render(<MyPlan />);
    expect(getByText('Super Join (2)')).toBeTruthy();
  });
});
