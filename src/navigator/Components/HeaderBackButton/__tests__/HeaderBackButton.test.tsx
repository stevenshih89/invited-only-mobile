import React from 'react';
import {render} from '@testing-library/react-native';
import HeaderBackButton from '../HeaderBackButton';

jest.mock('assets/images/icons/arrow-left.svg', () => ({
  __esModule: true,
  default: () => null,
}));

describe('HeaderBackButton', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<HeaderBackButton />);
    const backButton = getByTestId('header-back-button');

    expect(backButton).toBeTruthy();
  });
});
