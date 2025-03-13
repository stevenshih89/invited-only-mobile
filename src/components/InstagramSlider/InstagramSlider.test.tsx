import React from 'react';
import {render} from '@testing-library/react-native';
import InstagramSlider from './InstagramSlider';

describe('InstagramSlider Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('renders correctly with photosList', () => {
    const {getByText} = render(
      <InstagramSlider
        photosList={[
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.jpg',
          'https://example.com/photo3.jpg',
          'https://example.com/photo4.jpg',
          'https://example.com/photo5.jpg',
          'https://example.com/photo6.jpg',
          'https://example.com/photo7.jpg',
          'https://example.com/photo8.jpg',
          'https://example.com/photo9.jpg',
          'https://example.com/photo10.jpg',
          'https://example.com/photo11.jpg',
          'https://example.com/photo12.jpg',
          'https://example.com/photo13.jpg',
          'https://example.com/photo14.jpg',
          'https://example.com/photo15.jpg',
          'https://example.com/photo16.jpg',
          'https://example.com/photo17.jpg',
          'https://example.com/photo18.jpg',
        ]}
      />,
    );
    expect(getByText('18 instagram photos')).toBeTruthy();
  });

  it('displays the correct number of slides', () => {
    const {getAllByTestId} = render(
      <InstagramSlider
        photosList={[
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.jpg',
          'https://example.com/photo3.jpg',
          'https://example.com/photo4.jpg',
          'https://example.com/photo5.jpg',
          'https://example.com/photo6.jpg',
          'https://example.com/photo7.jpg',
          'https://example.com/photo8.jpg',
          'https://example.com/photo9.jpg',
          'https://example.com/photo10.jpg',
          'https://example.com/photo11.jpg',
          'https://example.com/photo12.jpg',
          'https://example.com/photo13.jpg',
          'https://example.com/photo14.jpg',
          'https://example.com/photo15.jpg',
          'https://example.com/photo16.jpg',
          'https://example.com/photo17.jpg',
          'https://example.com/photo18.jpg',
        ]}
      />,
    );
    const slides = getAllByTestId('instagram-slider-flatlist');
    expect(slides.length).toBe(5);
  });

  it('renders images correctly', () => {
    const {getAllByTestId} = render(
      <InstagramSlider
        photosList={[
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.jpg',
          'https://example.com/photo3.jpg',
          'https://example.com/photo4.jpg',
          'https://example.com/photo5.jpg',
          'https://example.com/photo6.jpg',
          'https://example.com/photo7.jpg',
          'https://example.com/photo8.jpg',
          'https://example.com/photo9.jpg',
          'https://example.com/photo10.jpg',
          'https://example.com/photo11.jpg',
          'https://example.com/photo12.jpg',
          'https://example.com/photo13.jpg',
          'https://example.com/photo14.jpg',
          'https://example.com/photo15.jpg',
          'https://example.com/photo16.jpg',
          'https://example.com/photo17.jpg',
          'https://example.com/photo18.jpg',
        ]}
      />,
    );
    const images = getAllByTestId('instagram-slider-image-unique');
    expect(images.length).toBe(30);
  });
});
