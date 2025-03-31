import {renderHook, act} from '@testing-library/react-hooks';
import useCardSwipe from '../useCardSwipe';

// Mock setTimeout
jest.useFakeTimers();

describe('useCardSwipe Hook', () => {
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
    {
      id: '3',
      name: 'Bob',
      age: 26,
      image: ['https://example.com/image3.jpg'],
      bio: 'Test bio 3',
    },
  ];

  it('initializes with correct values', () => {
    const {result} = renderHook(() => useCardSwipe({guests: mockGuests}));

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.visibleCards).toEqual(mockGuests.slice(0, 4));
    expect(result.current.hasCards).toBe(true);
    expect(result.current.hasMoreCards).toBe(true);
  });

  it('increments currentIndex after handleSwipeLeft', () => {
    const {result} = renderHook(() => useCardSwipe({guests: mockGuests}));

    act(() => {
      result.current.handleSwipeLeft();
    });

    // Fast-forward timers to execute the setTimeout callback
    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.visibleCards).toEqual(mockGuests.slice(1, 5));
  });

  it('increments currentIndex after handleSwipeRight', () => {
    const {result} = renderHook(() => useCardSwipe({guests: mockGuests}));

    act(() => {
      result.current.handleSwipeRight();
    });

    // Fast-forward timers to execute the setTimeout callback
    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.visibleCards).toEqual(mockGuests.slice(1, 5));
  });

  it('handles empty guests array', () => {
    const {result} = renderHook(() => useCardSwipe({guests: []}));

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.visibleCards).toEqual([]);
    expect(result.current.hasCards).toBe(false);
    expect(result.current.hasMoreCards).toBe(false);
  });

  it('sets hasMoreCards to false when all cards have been swiped', () => {
    const {result} = renderHook(() => useCardSwipe({guests: mockGuests}));

    // Swipe through all cards
    act(() => {
      result.current.handleSwipeLeft();
      jest.runAllTimers();

      result.current.handleSwipeRight();
      jest.runAllTimers();

      result.current.handleSuperInvite();
      jest.runAllTimers();
    });

    expect(result.current.currentIndex).toBe(3);
    expect(result.current.visibleCards).toEqual([]);
    expect(result.current.hasMoreCards).toBe(false);
  });
});
