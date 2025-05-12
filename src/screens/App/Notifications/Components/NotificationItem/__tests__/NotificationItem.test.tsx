import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NotificationItem, { Notification } from '../NotificationItem';

// Mock date-fns to control time-based outputs
jest.mock('date-fns', () => ({
    ...jest.requireActual('date-fns'), // Import and retain default behavior
    formatDistance: jest.fn(() => 'some time ago'), // Mock specific function
}));

describe.skip('NotificationItem', () => {
    const mockNotification: Notification = {
        id: '1',
        title: 'Test Notification Title',
        body: 'This is a test notification body.',
        image: 'https://example.com/image.png',
        createdAt: new Date().toISOString(), // Changed to string
        mark: 'unread',
    };

    const mockNotificationWithoutImage: Notification = {
        id: '2',
        title: 'Another Title',
        body: 'Notification body here.',
        createdAt: new Date().toISOString(), // Test with string date
    };

    it('renders correctly with all props', () => {
        const { getByText, getByRole } = render(<NotificationItem notification={mockNotification} isJoinedEvents={false} handleDeleteNotification={() => { }} />);
        expect(getByText('Test Notification Title')).toBeTruthy();
        expect(getByText('This is a test notification body.')).toBeTruthy();
        expect(getByText('some time ago')).toBeTruthy();
        // Check for image by accessibility role or testID if added to AvatarImage
        // For example, if AvatarImage had accessibilityRole="image"
        // expect(getByRole('image')).toBeTruthy(); 
    });

    it('renders correctly without an image', () => {
        const { getByText, queryByRole } = render(<NotificationItem notification={mockNotificationWithoutImage} isJoinedEvents={false} handleDeleteNotification={() => { }} />);
        expect(getByText('Another Title')).toBeTruthy();
        expect(getByText('Notification body here.')).toBeTruthy();
        // Ensure image is not rendered
        // expect(queryByRole('image')).toBeNull();
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<NotificationItem notification={mockNotification} isJoinedEvents={false} handleDeleteNotification={() => { }} onPress={onPressMock} />);

        fireEvent.press(getByText('Test Notification Title'));
        expect(onPressMock).toHaveBeenCalledWith(mockNotification);
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('renders timestamp correctly', () => {
        const { getByText } = render(<NotificationItem notification={mockNotification} isJoinedEvents={false} handleDeleteNotification={() => { }} />);
        expect(getByText('some time ago')).toBeTruthy();
        // Check if formatDistance was called correctly (optional, more of an integration test with date-fns mock)
        expect(require('date-fns').formatDistance).toHaveBeenCalled();
    });

    // Add more tests as needed, e.g., for different notification types or unread indicators
}); 