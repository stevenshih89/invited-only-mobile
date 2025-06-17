import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import DeleteEventModal from '../DeleteEventModal';
import {BackendApiContext} from 'contexts/BackendApiContex';

const mockBackendApi = {
    useMutation: () => ({
        mutate: jest.fn(),
        isPending: false,
    }),
};

const renderComponent = (props: any = {}) => {
    return render(
        <NavigationContainer>
            <QueryClientProvider client={new QueryClient()}>
                <BackendApiContext.Provider value={mockBackendApi as any}>
                    <DeleteEventModal isVisible={true} onClose={props.onClose} eventId="123" {...props} />
                </BackendApiContext.Provider>
            </QueryClientProvider>
        </NavigationContainer>,
    );
};

describe('DeleteEventModal', () => {
    const mockEventId = '123';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly when visible', () => {
        const {getByText} = renderComponent();

        expect(getByText('Delete Event')).toBeTruthy();
        expect(getByText('Are you sure you want to delete this event?')).toBeTruthy();
        expect(getByText('Delete')).toBeTruthy();
    });

    it('does not render when not visible', () => {
        const {queryByText} = renderComponent({isVisible: false});

        expect(queryByText('Delete Event')).toBeNull();
        expect(queryByText('Are you sure you want to delete this event?')).toBeNull();
        expect(queryByText('Delete')).toBeNull();
    });

    it('calls onClose when close button is pressed', () => {
        const mockOnClose = jest.fn();
        const {getByTestId} = renderComponent({onClose: mockOnClose});

        fireEvent.press(getByTestId('close-button'));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
