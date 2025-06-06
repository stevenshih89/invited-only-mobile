import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {components} from '@invited-only/invited-only-api';
import IoHeader from '../IoHeader';

jest.mock('../hooks/useGetEventRequests', () => ({
  __esModule: true,
  default: () => ({
    requests: [],
  }),
}));

jest.mock('../../../../components/EventsDropdown/EventsDropdown', () => ({
  EventsDropdown: () => null,
}));

jest.mock('../Components/CreateEventButton/CreateEventButton', () => ({
  __esModule: true,
  default: () => null,
}));

describe('IoHeader', () => {
  const mockEvents: components['schemas']['EventData'][] = [
    {
      uid: '1',
      id: '1',
      name: 'Test Event 1',
      placeName: 'Test Place',
      address: 'Test Address',
      date: '2024-03-20',
      hour: '12:00',
      description: 'Test Description 1',
      meetingSpot: 'Test Meeting Spot',
      activeType: 1,
      eventReviewed: false,
      isCancelled: false,
      statusEvent: true,
      hostName: 'Test Host',
      hostImage: 'test-image.jpg',
      photos: [],
      hostFcmToken: 'test-token',
      male: 5,
      maleFriend: 2,
      female: 5,
      femaleFriend: 2,
      rejectsList: [],
      rejectsByGuestsList: [],
      requestsList: [],
      usersList: [],
      createdAt: '2024-03-19',
    },
  ];

  const mockSelectedEvent = mockEvents[0];
  const mockAttendingGuests: components['schemas']['ConnectionRequest'][] = [];

  const defaultProps = {
    onRequestPress: jest.fn(),
    events: mockEvents,
    selectedEvent: mockSelectedEvent,
    onEventSelect: jest.fn(),
    onDropdownChange: jest.fn(),
    attendingGuests: mockAttendingGuests,
  };

  it('renders correctly with events', () => {
    const {getByText} = render(<IoHeader {...defaultProps} />);
    expect(getByText('Requests')).toBeTruthy();
  });

  it('renders correctly without events', () => {
    const {getByTestId} = render(<IoHeader {...defaultProps} events={[]} />);
    expect(getByTestId('header-container')).toBeTruthy();
  });

  it('calls onRequestPress when request button is pressed', () => {
    const {getByText} = render(<IoHeader {...defaultProps} />);
    const requestButton = getByText('Requests');
    fireEvent.press(requestButton);
    expect(defaultProps.onRequestPress).toHaveBeenCalled();
  });
});
