import React from 'react';
import {render} from '@testing-library/react-native';
import EventSlider from '../EventSlider';

jest.mock('react-native-fast-image', () => 'FastImage');
jest.mock('assets/images/icons/check-star-white.svg', () => 'CheckIcon');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('EventSlider', () => {
  const mockProps = {
    event: {
      uid: '123',
      showModalAccept: true,
      hostId: '123',
      name: 'John',
      photos: [
        {
          id: 1,
          image: 'photo1.jpg',
        },
      ],
      meetingSpot: '123',
      placeName: 'John',
      location: '123',
      male: 1,
      female: 1,
      maleFriend: 1,
      femaleFriend: 1,
      hostImage: 'photo1.jpg',
      hostName: 'John',
      date: '2021-01-01',
      createdAt: '2021-01-01',
      eventReviewed: true,
      hour: '12:00',
      eventsListVisit: ['123'],
      description: 'John',
      address: '123',
      isCancelled: true,
      statusEvent: true,
      priority: 0,
    },
  };

  it('renders correctly', () => {
    const {getByText} = render(<EventSlider event={mockProps.event} />);

    expect(getByText('John')).toBeTruthy();
  });

  it('renders correct number of dots', () => {
    const {getAllByTestId} = render(<EventSlider event={mockProps.event} />);
    const dots = getAllByTestId('slider-dot');

    expect(dots).toHaveLength(mockProps.event.photos.length);
  });

  it('shows first photo as active initially', () => {
    const {getAllByTestId} = render(<EventSlider event={mockProps.event} />);
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
