import {renderHook, act} from '@testing-library/react-hooks';
import useCardSwipe from '../useCardSwipe';
import {mockGuests} from '../../guestMocks';

// Mock setTimeout
jest.useFakeTimers();

describe('useCardSwipe Hook', () => {
  it('handles empty guests array', () => {
    const {result} = renderHook(() => useCardSwipe({cardsData: []}));

    expect(result.current.hasCards).toBe(false);
    expect(result.current.hasMoreCards).toBe(false);
  });

  it('sets hasMoreCards to true when there are cards', () => {
    const {result} = renderHook(() => useCardSwipe({cardsData: mockGuests}));

    expect(result.current.hasMoreCards).toBe(true);
  });

  it('sets hasMoreCards to false when all cards have been swiped', () => {
    const {result} = renderHook(() => useCardSwipe({cardsData: mockGuests}));

    // Swipe through all cards
    act(() => {
      result.current.handleSwipeLeft();
      jest.runAllTimers();

      result.current.handleSwipeRight();
      jest.runAllTimers();

      result.current.handleSuperInvite();
      jest.runAllTimers();
    });

    expect(result.current.hasMoreCards).toBe(false);
  });
});
