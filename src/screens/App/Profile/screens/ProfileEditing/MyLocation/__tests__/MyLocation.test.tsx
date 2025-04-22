import React from 'react';
import {render} from '@testing-library/react-native';
import MyLocation from '../MyLocation';

jest.mock('assets/images/icons/lock-02.svg', () => 'LockIcon');
jest.mock('react-native-radial-gradient', () => 'RadialGradient');

describe('MyLocation', () => {
  const mockProps = {
    country: 'United States',
    setCountry: jest.fn(),
    homeAddress: '123 Main St',
    setHomeAddress: jest.fn(),
  };

  it('renders correctly', () => {
    const {getByText} = render(<MyLocation {...mockProps} />);

    expect(getByText('Location')).toBeTruthy();
    expect(getByText('Country')).toBeTruthy();
    expect(getByText('City')).toBeTruthy();
    expect(getByText('Dubai')).toBeTruthy();
    expect(getByText('Company or industry')).toBeTruthy();
  });
});
