import React from 'react';
import {render} from '@testing-library/react-native';
import HostButton from '../HostButton';

jest.mock('hooks/useAppNavigation');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('src/assets/images/icons/arrow-right-s-line.svg', () => 'ArrowRightIcon');

describe('HostButton', () => {
  const mockHostName = 'John Doe';
  const mockHostImage = 'https://example.com/profile.jpg';
  const mockHostId = 'host123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Component = () => <HostButton hostName={mockHostName} hostImage={mockHostImage} hostId={mockHostId} />;

  it('renders host information correctly', () => {
    const {getByText, getByTestId} = render(<Component />);

    expect(getByText(mockHostName)).toBeTruthy();
    expect(getByText('Host')).toBeTruthy();
    expect(getByTestId('host-profile-image')).toBeTruthy();
  });

  it('renders profile image with correct source', () => {
    const {getByTestId} = render(<Component />);
    const image = getByTestId('host-profile-image');

    expect(image.props.source.uri).toBe(mockHostImage);
  });
});
