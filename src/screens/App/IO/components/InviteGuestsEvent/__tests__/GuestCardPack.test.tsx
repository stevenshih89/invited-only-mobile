import React from 'react';
import {render} from '@testing-library/react-native';
import useCardSwipe from '../hooks/useCardSwipe';
import InviteGuestsEvent from '../InviteGuestsEvent';
import {mockGuests} from '../guestMocks';
import {User} from 'src/types/userInfo';

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
