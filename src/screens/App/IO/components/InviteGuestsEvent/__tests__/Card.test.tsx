import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Gesture} from 'react-native-gesture-handler';
import Card from '../../../../Components/Card/Card';
import {useCardGesture} from '../hooks/useCardGesture';

jest.mock('../hooks/useCardGesture', () => ({
  useCardGesture: jest.fn(),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = jest.requireActual('react-native-reanimated/mock');
  return {
    ...Reanimated,
    useAnimatedStyle: () => ({}),
  };
});

describe.skip('Card Component', () => {
  const mockGuest = {
    id: '1',
    name: 'John',
    age: 25,
    image: ['https://example.com/image.jpg'],
    bio: 'Test bio',
  };
  const mockProps = {
    guest: mockGuest,
    index: 0,
    isTopCard: true,
    onReject: jest.fn(),
    onSuperInvite: jest.fn(),
    onInvite: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useCardGesture as jest.Mock).mockReturnValue({
      gestureHandler: {},
      animatedStyle: {},
      likeOpacityStyle: {},
      nopeOpacityStyle: {},
      animateInvite: jest.fn(),
      animateReject: jest.fn(),
      animateSuperInvite: jest.fn(),
    });
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <Card
        distanceFromTop={0}
        uid={''}
        backgroundUrls={[]}
        children={undefined}
        gestureHandler={Gesture.Pan()}
        animatedStyle={{}}
        likeOpacityStyle={{}}
        nopeOpacityStyle={{}}
        {...mockProps}
      />,
    );

    expect(getByText('John,')).toBeTruthy();
    expect(getByText('25')).toBeTruthy();
    expect(getByText('Invite')).toBeTruthy();
    expect(getByText('Reject')).toBeTruthy();
    expect(getByText('Super Invite')).toBeTruthy();
  });

  it('calls animateReject when reject button is pressed', () => {
    const mockAnimateReject = jest.fn();
    (useCardGesture as jest.Mock).mockReturnValue({
      gestureHandler: {},
      animatedStyle: {},
      likeOpacityStyle: {},
      nopeOpacityStyle: {},
      animateInvite: jest.fn(),
      animateReject: mockAnimateReject,
      animateSuperInvite: jest.fn(),
    });

    const {getByText} = render(
      <Card
        distanceFromTop={0}
        uid={''}
        backgroundUrls={[]}
        children={undefined}
        gestureHandler={Gesture.Pan()}
        animatedStyle={{}}
        likeOpacityStyle={{}}
        nopeOpacityStyle={{}}
        {...mockProps}
      />,
    );
    fireEvent.press(getByText('Nope'));

    expect(mockAnimateReject).toHaveBeenCalledTimes(1);
  });

  it('calls animateInvite when invite button is pressed', () => {
    const mockAnimateInvite = jest.fn();
    (useCardGesture as jest.Mock).mockReturnValue({
      gestureHandler: {},
      animatedStyle: {},
      likeOpacityStyle: {},
      nopeOpacityStyle: {},
      animateInvite: mockAnimateInvite,
      animateReject: jest.fn(),
      animateSuperInvite: jest.fn(),
    });

    const {getByText} = render(
      <Card
        distanceFromTop={0}
        uid={''}
        backgroundUrls={[]}
        children={undefined}
        gestureHandler={Gesture.Pan()}
        animatedStyle={{}}
        likeOpacityStyle={{}}
        nopeOpacityStyle={{}}
        {...mockProps}
      />,
    );
    fireEvent.press(getByText('LIKE'));

    expect(mockAnimateInvite).toHaveBeenCalledTimes(1);
  });

  it('does not show buttons when not the top card', () => {
    const {queryByText} = render(
      <Card
        distanceFromTop={0}
        uid={''}
        backgroundUrls={[]}
        children={undefined}
        gestureHandler={Gesture.Pan()}
        animatedStyle={{}}
        likeOpacityStyle={{}}
        nopeOpacityStyle={{}}
        {...mockProps}
        index={1}
        isTopCard={false}
      />,
    );

    expect(queryByText('Invite')).toBeNull();
    expect(queryByText('Reject')).toBeNull();
    expect(queryByText('Super Invite')).toBeNull();
  });
});
