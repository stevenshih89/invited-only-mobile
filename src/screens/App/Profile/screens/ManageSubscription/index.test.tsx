import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Linking} from 'react-native';
import ManageSubscription from './index';

const mockGoToMyPaymentPath = jest.fn();

jest.mock('hooks/useManageSubscription', () => ({
  useManageSubscription: () => ({
    subscriptionName: 'Premium',
    currentSubscriptions: {activeSubscriptions: ['io_29_1m']},
    lastSubscriptionData: new Date(),
    purchaseDates: new Date(),
    formateDateFun: (date: Date) => date.toDateString(),
    goToMyPaymentPath: mockGoToMyPaymentPath,
  }),
}));

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

describe('ManageSubscription Component', () => {
  it('renders correctly with subscription details', () => {
    const {getByText} = render(<ManageSubscription />);
    expect(getByText('You subscribed on iOS')).toBeTruthy();
  });

  it('opens app settings when link is pressed', () => {
    const {getByText} = render(<ManageSubscription />);
    const link = getByText('here');

    fireEvent.press(link);

    expect(Linking.openURL).toHaveBeenCalledWith('app-settings:');
  });

  it('calls goToMyPaymentPath when Upgrade button is pressed', () => {
    const {getByText} = render(<ManageSubscription />);
    const upgradeButton = getByText('Upgrade');

    fireEvent.press(upgradeButton);

    expect(mockGoToMyPaymentPath).toHaveBeenCalled();
  });
});
