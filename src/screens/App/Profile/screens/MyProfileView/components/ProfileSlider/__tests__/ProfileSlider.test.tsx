import React from 'react';
import { render} from '@testing-library/react-native';
import ProfileSlider from '../ProfileSlider';

jest.mock('react-native-fast-image', () => 'FastImage');
jest.mock('assets/images/icons/check-star-white.svg', () => 'CheckIcon');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('ProfileSlider', () => {
  const mockProps = {
    photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
    userName: 'John',
    userAge: '25',
    isConfirmed: true,
  };

  it('renders correctly', () => {
    const {getByText} = render(<ProfileSlider {...mockProps} />);

    expect(getByText('John,')).toBeTruthy();
    expect(getByText('25')).toBeTruthy();
  });

  it('renders correct number of dots', () => {
    const {getAllByTestId} = render(<ProfileSlider {...mockProps} />);
    const dots = getAllByTestId('slider-dot');

    expect(dots).toHaveLength(mockProps.photos.length);
  });

  it('shows first photo as active initially', () => {
    const {getAllByTestId} = render(<ProfileSlider {...mockProps} />);
    const dots = getAllByTestId('slider-dot');

    expect(dots[0].props.style).toEqual({
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      height: 6,
      opacity: 1,
      width: 6,
    });
  });
});
