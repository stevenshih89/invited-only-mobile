import React from 'react';
import {render} from '@testing-library/react-native';
import TabsList from '../TabsList';

describe('TabsList', () => {
  it('renders all menu items correctly', () => {
    const {getByText} = render(<TabsList />);

    expect(getByText('Edit Profile')).toBeTruthy();
    expect(getByText('My Plan')).toBeTruthy();
    expect(getByText('Invitations')).toBeTruthy();
    expect(getByText('Account Setting')).toBeTruthy();
    expect(getByText('Notification Setting')).toBeTruthy();
    expect(getByText('Help & Security')).toBeTruthy();
    expect(getByText('FAQs')).toBeTruthy();
  });

  it('renders correct number of items', () => {
    const {getAllByTestId} = render(<TabsList />);
    const menuItems = getAllByTestId('menu-item');

    expect(menuItems).toHaveLength(7);
  });
});
