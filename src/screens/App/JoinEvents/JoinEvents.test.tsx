import React from 'react';
import {render} from '@testing-library/react-native';
import JoinEvents from './JoinEvents';
import {NavigationContainer} from '@react-navigation/native';

const mockEvents = [
  {
    uid: 'event-123',
    id: 'event-123',
    name: 'Test Event',
    placeName: 'Test Place',
    photos: [{id: 1, image: 'https://example.com/photo.jpg'}],
    hour: '20:00',
    date: new Date().toISOString(),
    usersList: [{uid: 'user-1', status: 'accepted'}],
    activeType: 1,
    description: 'Test event description',
    maxGuests: 10,
    minGuests: 2,
    price: 100,
    status: 'active',
    type: 'public',
    location: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    host: {
      uid: 'host-123',
      name: 'Host Name',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const renderComponent = () =>
  render(
    <JoinEvents
      events={mockEvents.map(event => ({
        ...event,
        address: '123 Test St',
        meetingSpot: 'Test Spot',
        eventReviewed: false,
        isCancelled: false,
        isFinished: false,
        isStarted: false,
        isUserJoined: false,
        isUserPending: false,
        isUserRejected: false,
        isUserWaiting: false,
        statusEvent: false,
        hostName: 'Test Host',
        hostImage: 'https://example.com/host.jpg',
        hostFcmToken: 'test-fcm-token',
        hostEmail: 'test@example.com',
        hostPhone: '+1234567890',
        hostVerified: true,
        male: 0,
        maleFriend: 0,
        female: 0,
        femaleFriend: 0,
      }))}
    />,
  );

describe.skip('JoinEvents Component', () => {
  it('renders correctly', () => {
    const {getByText} = renderComponent();
    expect(getByText('Join Coming soon')).toBeTruthy();
  });
});
