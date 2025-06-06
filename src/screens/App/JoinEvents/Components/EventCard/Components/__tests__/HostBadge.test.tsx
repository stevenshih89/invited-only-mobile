import React from 'react';
import {render} from '@testing-library/react-native';
import HostBadge from '../HostBadge';

describe('HostBadge', () => {
  const mockProps = {
    imageUrl: 'https://example.com/host.jpg',
    totalGuests: 5,
  };

  it('renders host badge with all elements', () => {
    const {getByTestId} = render(<HostBadge {...mockProps} />);

    expect(getByTestId('host-badge-container')).toBeTruthy();
    expect(getByTestId('host-badge')).toBeTruthy();
    expect(getByTestId('host-info-row')).toBeTruthy();
    expect(getByTestId('host-image')).toBeTruthy();
    expect(getByTestId('host-name')).toBeTruthy();
    expect(getByTestId('guest-count-badge')).toBeTruthy();
    expect(getByTestId('guest-count-text')).toBeTruthy();
  });

  it('displays correct guest count', () => {
    const {getByTestId} = render(<HostBadge {...mockProps} />);
    const guestCountText = getByTestId('guest-count-text');

    expect(guestCountText.props.children).toBe(5);
  });

  it('does not render guest count when withGuestCount is false', () => {
    const {queryByTestId} = render(<HostBadge {...mockProps} withGuestCount={false} />);

    expect(queryByTestId('guest-count-badge')).toBeNull();
    expect(queryByTestId('guest-count-text')).toBeNull();
  });
});
