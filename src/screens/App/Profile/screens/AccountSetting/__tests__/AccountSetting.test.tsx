import React from 'react';
import {render} from '@testing-library/react-native';
import {RouteProp} from '@react-navigation/native';
import AccountSetting from '../AccountSetting';

type RootStackParamList = {
  AccountSetting: undefined;
};

const mockRoute: Partial<RouteProp<RootStackParamList, 'AccountSetting'>> = {};

describe.skip('AccountSetting', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(<AccountSetting route={mockRoute as RouteProp<RootStackParamList, 'AccountSetting'>} />);

    expect(getByText('Contact')).toBeTruthy();
    expect(getByText('Phone number')).toBeTruthy();
    expect(getByText('Change')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Share location')).toBeTruthy();
    expect(getByText('Delete my account')).toBeTruthy();
  });
});
