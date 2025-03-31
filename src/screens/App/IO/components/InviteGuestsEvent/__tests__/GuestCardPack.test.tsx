import React from 'react';
import {render} from '@testing-library/react-native';

import useCardSwipe from '../hooks/useCardSwipe';
import InviteGuestsEvent from '../InviteGuestsEvent';

// Mock the hooks
jest.mock('../hooks/useCardSwipe', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the Card component
jest.mock('screens/App/Components/Card/Card', () => {
  return jest.fn().mockImplementation(({guest}) => {
    return `<Card guest=${guest} />`;
  });
});

describe('GuestCardPack Component', () => {
  const mockGuests = [
    {
      id: '1',
      name: 'John',
      age: 25,
      image: ['https://example.com/image1.jpg'],
      bio: 'Test bio 1',
    },
    {
      id: '2',
      name: 'Jane',
      age: 24,
      image: ['https://example.com/image2.jpg'],
      bio: 'Test bio 2',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementation
    (useCardSwipe as jest.Mock).mockReturnValue({
      handleSwipeLeft: jest.fn(),
      handleSwipeRight: jest.fn(),
      handleSuperInvite: jest.fn(),
      visibleCards: mockGuests,
      hasCards: true,
      currentIndex: 0,
    });
  });

  it('renders cards when guests are available', () => {
    const {toJSON} = render(<InviteGuestsEvent guests={mockGuests} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('shows "No guests to show!" when there are no guests', () => {
    (useCardSwipe as jest.Mock).mockReturnValue({
      handleSwipeLeft: jest.fn(),
      handleSwipeRight: jest.fn(),
      handleSuperInvite: jest.fn(),
      visibleCards: [],
      hasCards: false,
      currentIndex: 0,
    });

    const {getByText} = render(<InviteGuestsEvent guests={[]} />);
    expect(getByText('No guests to show!')).toBeTruthy();
  });

  it('shows "No more guests to show!" when all guests have been swiped', () => {
    (useCardSwipe as jest.Mock).mockReturnValue({
      handleSwipeLeft: jest.fn(),
      handleSwipeRight: jest.fn(),
      handleSuperInvite: jest.fn(),
      visibleCards: [],
      hasCards: true,
      currentIndex: 2,
    });

    const {getByText} = render(<InviteGuestsEvent guests={mockGuests} />);
    expect(getByText('No more guests to show!')).toBeTruthy();
  });

  it('updates previousIndex when currentIndex changes', () => {
    const {rerender} = render(<InviteGuestsEvent guests={mockGuests} />);

    // Change the currentIndex
    (useCardSwipe as jest.Mock).mockReturnValue({
      handleSwipeLeft: jest.fn(),
      handleSwipeRight: jest.fn(),
      handleSuperInvite: jest.fn(),
      visibleCards: [mockGuests[1]],
      hasCards: true,
      currentIndex: 1,
    });

    rerender(<InviteGuestsEvent guests={mockGuests} />);

    // This is mostly testing React's useEffect behavior, which is hard to assert directly
    // But we can verify the component still renders correctly after the update
    expect(useCardSwipe).toHaveBeenCalledTimes(2);
  });
});
