import React from 'react';
import {render} from '@testing-library/react-native';
import UnderMaintenance from './UnderMaintenance';

describe('UnderMaintenance Component', () => {
  it('renders correctly', () => {
    const data = {isMaintenance: true, approximatelyTime: null};
    const {getByTestId} = render(<UnderMaintenance data={data} />);
    expect(getByTestId('maintenance-title')).toBeTruthy();
  });

  it('displays the correct maintenance text without approximate time', () => {
    const data = {isMaintenance: true, approximatelyTime: null};
    const {getByTestId} = render(<UnderMaintenance data={data} />);
    expect(getByTestId('maintenance-text')).toBeTruthy();
  });

  it('displays the correct maintenance text with approximate time', () => {
    const data = {isMaintenance: true, approximatelyTime: '2 hours'};
    const {getByText} = render(<UnderMaintenance data={data} />);
    expect(getByText(`We’re working on it. Please check back soon! Thank you for your patience! (approximately 2 hours)`)).toBeTruthy();
  });
});
