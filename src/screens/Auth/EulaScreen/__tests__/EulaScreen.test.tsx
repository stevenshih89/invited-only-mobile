import React from 'react';
import {render} from '@testing-library/react-native';
import EulaScreen from '../EulaScreen';

jest.mock('../hooks/useEulaData', () => ({
  useEulaData: jest.fn(),
}));
const {useEulaData} = require('../hooks/useEulaData');

describe('EulaScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the loading', () => {
    useEulaData.mockReturnValue({loading: true, eula: '', onAgree: jest.fn()});
    const {getByTestId} = render(<EulaScreen />);
    expect(getByTestId('eula-loading')).toBeTruthy();
  });
  it('renders the title', () => {
    useEulaData.mockReturnValue({loading: false, eula: '', onAgree: jest.fn()});
    const {getByTestId} = render(<EulaScreen />);
    expect(getByTestId('eula-title')).toBeTruthy();
  });
});
