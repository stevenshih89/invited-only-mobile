import React from 'react';
import {render} from '@testing-library/react-native';
import Loading from './Loading';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const mockUserInfo = {
  photos: [{image: 'https://example.com/photo.jpg'}],
};

describe('Loading Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const {getByTestId} = render(<Loading userInfo={mockUserInfo} />);
    expect(getByTestId('first-circle')).toBeTruthy();
    expect(getByTestId('second-circle')).toBeTruthy();
    expect(getByTestId('white-circle')).toBeTruthy();
  });

  it('renders with custom text and shows check icon', () => {
    const {getByText, getByTestId} = render(<Loading userInfo={mockUserInfo} text="Loading..." showCheckIcon={true} />);
    expect(getByText('Loading...')).toBeTruthy();
    expect(getByTestId('check-star-icon')).toBeTruthy();
  });

  it('applies top position styles correctly', () => {
    const {getByTestId} = render(<Loading userInfo={mockUserInfo} topPosition={true} />);
    const animatedView = getByTestId('first-circle');
    expect(animatedView.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          top: 0,
          height: 360,
          width: 360,
        }),
      ]),
    );
  });

  it('applies animations correctly', () => {
    const {getByTestId} = render(<Loading userInfo={mockUserInfo} />);
    const animatedView = getByTestId('first-circle');
    expect(animatedView.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          transform: [{scale: expect.any(Number)}],
        }),
      ]),
    );
  });
});
