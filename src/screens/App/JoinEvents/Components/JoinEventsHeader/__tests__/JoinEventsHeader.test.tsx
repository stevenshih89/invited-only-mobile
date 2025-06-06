import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import JoinEventsHeader from '../JoinEventsHeader';

describe('JoinEventsHeader', () => {
  const mockProps = {
    onMyEventsPress: jest.fn(),
    onJoinEventsPress: jest.fn(),
    activeTab: 'explore' as const,
    handleTabChange: jest.fn(),
  };

  it('renders header with all elements', () => {
    const {getByTestId} = render(<JoinEventsHeader {...mockProps} />);

    expect(getByTestId('header-container')).toBeTruthy();
    expect(getByTestId('tab-container')).toBeTruthy();
    expect(getByTestId('explore-tab')).toBeTruthy();
    expect(getByTestId('invites-tab')).toBeTruthy();
  });

  it('displays correct tab text', () => {
    const {getByTestId} = render(<JoinEventsHeader {...mockProps} />);

    expect(getByTestId('explore-active-text').props.children).toBe('Explore events');
    expect(getByTestId('invites-text').props.children).toBe('Invites');
  });

  it('calls handleTabChange and onMyEventsPress when explore tab is pressed', () => {
    const {getByTestId} = render(<JoinEventsHeader {...mockProps} />);
    const exploreTab = getByTestId('explore-tab');

    fireEvent.press(exploreTab);
    expect(mockProps.handleTabChange).toHaveBeenCalledWith('explore');
    expect(mockProps.onMyEventsPress).toHaveBeenCalled();
  });

  it('calls handleTabChange and onJoinEventsPress when invites tab is pressed', () => {
    const {getByTestId} = render(<JoinEventsHeader {...mockProps} />);
    const invitesTab = getByTestId('invites-tab');

    fireEvent.press(invitesTab);
    expect(mockProps.handleTabChange).toHaveBeenCalledWith('invites');
    expect(mockProps.onJoinEventsPress).toHaveBeenCalled();
  });

  it('handles optional callbacks', () => {
    const propsWithoutCallbacks = {
      activeTab: 'explore' as const,
      handleTabChange: jest.fn(),
    };

    const {getByTestId} = render(<JoinEventsHeader {...propsWithoutCallbacks} />);
    const exploreTab = getByTestId('explore-tab');
    const invitesTab = getByTestId('invites-tab');

    fireEvent.press(exploreTab);
    fireEvent.press(invitesTab);

    expect(propsWithoutCallbacks.handleTabChange).toHaveBeenCalledTimes(2);
  });
});
