import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ModalConfirmPhone from './ModalConfirmPhone';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('ModalConfirmPhone Components', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        require('hooks/useModalDeleteMyAccount').useModalDeleteMyAccount.mockReturnValue({
            ref: { current: null },
            code: '',
            props: {},
            setCode: jest.fn(),
            CELL_COUNT: 6,
            getCellOnLayoutHandler: jest.fn(),
            handleConfirm: mockHandleConfirm,
            });
      });
      afterEach(() => {
        jest.clearAllMocks();
    });

    const queryClient = new QueryClient();
    const mockOnClose = jest.fn()
    const mockHandleConfirm = jest.fn()
    const mockSetCode = jest.fn();

    it('renders correct title', () => {
        const {getByText} = render(
        <QueryClientProvider client={queryClient}>
            <ModalConfirmPhone isVisible={true} onClose={mockOnClose} verificationId="" />
        </QueryClientProvider>
        );
        expect(getByText('Please confirm that this is your account')).toBeTruthy()
    })
    it('renders correct code field', () => {
        const {getByTestId} = render(
          <QueryClientProvider client={queryClient}>
            <ModalConfirmPhone isVisible={true} onClose={mockOnClose} verificationId="" />
          </QueryClientProvider>
        );
        const codeField = getByTestId('code-field')
        expect(codeField).toBeTruthy()
        fireEvent.changeText(codeField, '123456');
    });

    it('renders correct Confirm button', () => {
        const {getByText} = render(
          <QueryClientProvider client={queryClient}>
            <ModalConfirmPhone isVisible={true} onClose={mockOnClose} verificationId="" />
          </QueryClientProvider>
        );
        
        const confirmButton = getByText('Confirm')
        expect(confirmButton).toBeTruthy();
        fireEvent.press(confirmButton);
        expect(mockHandleConfirm).toHaveBeenCalled();
    });

    it('renders correct Cancel button', () => {
        const {getByText} = render(
          <QueryClientProvider client={queryClient}>
            <ModalConfirmPhone isVisible={true} onClose={mockOnClose} verificationId="" />
          </QueryClientProvider>
        );
        
        const closeButton = getByText('Cancel')
        expect(closeButton).toBeTruthy();
        fireEvent.press(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
    });
})