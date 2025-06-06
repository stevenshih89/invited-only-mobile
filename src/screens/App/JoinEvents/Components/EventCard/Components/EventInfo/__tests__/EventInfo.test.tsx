import React from 'react';
import {render} from '@testing-library/react-native';
import {components} from '@invited-only/invited-only-api';
import EventInfo from '../EventInfo';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('EventInfo', () => {
  const mockEvent: components['schemas']['EventData'] = {
    uid: '1',
    name: 'Test Event',
    date: '2024-03-20',
    hour: '12:00',
    description: 'Test Description',
    placeName: 'Test Place',
    location: 'Test Location',
    female: 5,
    male: 3,
    photos: [],
  };

  const Component = () => <EventInfo event={mockEvent} />;

  it('renders event name correctly', () => {
    const {getByText} = render(<Component />);
    expect(getByText('Test Event')).toBeTruthy();
  });

  it('renders formatted date correctly', () => {
    const {getByText} = render(<Component />);
    expect(getByText('March 20')).toBeTruthy();
  });

  it('renders time correctly', () => {
    const {getByText} = render(<Component />);
    expect(getByText('12:00')).toBeTruthy();
  });

  it('renders location and address when provided', () => {
    const {getByText} = render(<Component />);
    expect(getByText('Test Location')).toBeTruthy();
    expect(getByText('Test Place')).toBeTruthy();
  });

  it('handles missing location and placeName', () => {
    const eventWithoutLocation = {
      ...mockEvent,
      location: undefined,
      placeName: undefined,
    };

    const {queryByText} = render(<EventInfo event={eventWithoutLocation} />);
    expect(queryByText('Location')).toBeNull();
    expect(queryByText('Address')).toBeNull();
  });

  it('handles missing female and male counts', () => {
    const eventWithoutCounts = {
      ...mockEvent,
      female: undefined,
      male: undefined,
    };

    const {getByText} = render(<EventInfo event={eventWithoutCounts} />);
    expect(getByText('0')).toBeTruthy();
  });

  it('handles invalid date format', () => {
    const eventWithInvalidDate = {
      ...mockEvent,
      date: 'invalid-date',
    };

    const {getByText} = render(<EventInfo event={eventWithInvalidDate} />);
    expect(getByText('invalid-date')).toBeTruthy();
  });
});
