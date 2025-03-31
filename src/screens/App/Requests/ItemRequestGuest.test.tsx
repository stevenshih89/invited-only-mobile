import {render, waitFor} from '@testing-library/react-native';
import React, {ReactNode} from 'react';
import ItemRequestGuest from './ItemRequestGuest';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';

// Mock any dependencies that might be causing issues
jest.mock('react-native-modal', () => {
  const {View} = require('react-native');
  return ({children, isVisible}: {children: ReactNode; isVisible: boolean}) => (isVisible ? <View>{children}</View> : null);
});

// Create a wrapper component to ensure we have something to snapshot
const TestWrapper = ({children}: {children: ReactNode}) => (
  <View testID="test-wrapper">{children || <Text>No children rendered</Text>}</View>
);

describe('ItemRequestGuest Component', () => {
  it('correctly renders the component tree', async () => {
    // Use more complete mock data
    const mockList = {
      photos: [{uri: 'https://example.com/photo.jpg'}],
      uid: 'event-123',
      hour: '20:00',
      date: new Date().toISOString(),
      name: 'Test Event',
      usersList: [{uid: 'user-1', status: 'accepted'}],
      activeType: 1,
      placeName: 'Test Place',
      id: 'event-123',
    };

    const mockItem = {
      gender: 'man',
      name: 'test-user',
      status: 'accepted',
      superInvite: true,
      userPhoto: 'https://example.com/user.jpg',
      uid: 'test-uid',
      id: 'user-123',
    };

    const mockHandleOpenMatch = jest.fn();

    const {toJSON, debug} = render(
      <TestWrapper>
        <NavigationContainer>
          <ItemRequestGuest list={mockList} item={mockItem} handleOpenMatch={mockHandleOpenMatch} index={0} />
        </NavigationContainer>
      </TestWrapper>,
    );

    // Debug output to see what's being rendered
    debug();

    // Create a snapshot of the actual component tree
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
