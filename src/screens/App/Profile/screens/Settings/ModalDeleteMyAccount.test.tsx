import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import ModalDeleteMyAccount from './ModalDeleteMyAccount';

describe('ModalDeleteMyAccount Components', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const mockOnClose = jest.fn();
    const mockSendVerificationCode = jest.fn();
    const mockSetIsVisibleConfirmPhoneModal = jest.fn();

    it('renders correct title', () => {
        const { getByText } = render(
            <ModalDeleteMyAccount isVisible={true} onClose={mockOnClose} sendVerificationCode={mockSendVerificationCode} />
        );
        expect(getByText('Are you sure you want to delete your account?')).toBeTruthy();
    });

    it('renders correct secondary text', () => {
        const { getByText } = render(
            <ModalDeleteMyAccount isVisible={true} onClose={mockOnClose} sendVerificationCode={mockSendVerificationCode} />
        );
        expect(getByText('You can register a new account. Your events and purchases will not be restored')).toBeTruthy();
    });

    it('renders correct user info', () => {
        const { getByText } = render(
            <ModalDeleteMyAccount isVisible={true} onClose={mockOnClose} sendVerificationCode={mockSendVerificationCode} />
        );
        expect(getByText('Host')).toBeTruthy();
        expect(getByText('John, 25')).toBeTruthy();
    });

    it('renders correct accept delete button and triggers deletion', async () => {
        const { getByText } = render(
            <ModalDeleteMyAccount
                isVisible={true}
                onClose={mockOnClose}
                sendVerificationCode={mockSendVerificationCode}
                setIsVisibleConfirmPhoneModal={mockSetIsVisibleConfirmPhoneModal}
            />
        );

        const deleteButton = getByText('Yes, delete');
        expect(deleteButton).toBeTruthy();

        fireEvent.press(deleteButton);

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        await waitFor(() => {
            expect(mockSendVerificationCode).toHaveBeenCalled();
        });

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        await waitFor(() => {
            expect(mockSetIsVisibleConfirmPhoneModal).toHaveBeenCalledWith(true);
        });
    });

    it('renders correct cancel button', async () => {
        const { getByText } = render(
            <ModalDeleteMyAccount isVisible={true} onClose={mockOnClose} sendVerificationCode={mockSendVerificationCode} />
        );

        const cancelButton = getByText('Cancel')
        expect(cancelButton).toBeTruthy();
        fireEvent.press(cancelButton);
        expect(mockOnClose).toHaveBeenCalled();
    });
});
