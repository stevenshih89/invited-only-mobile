import React from 'react';
import {render} from '@testing-library/react-native';
import UpdateAvailable from './UpdateAvailableScreen';

describe('UpdateAvailable Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<UpdateAvailable />);
    expect(getByText('Update Available')).toBeTruthy();
  });

  it('displays the correct update text with version and build', () => {
    const data = {
      lastAvailableVersion: '1.2.3',
      lastAvailableBuild: '456',
    };
    const {getByText} = render(<UpdateAvailable data={data} />);
    expect(getByText('Update Version to 1.2.3 (456) for enhanced performance and new features!')).toBeTruthy();
  });

  it('displays the correct update text with version only', () => {
    const data = {
      lastAvailableVersion: '1.2.3',
    };
    const {getByText} = render(<UpdateAvailable data={data} />);
    expect(getByText('Update Version to 1.2.3 for enhanced performance and new features!')).toBeTruthy();
  });
});
