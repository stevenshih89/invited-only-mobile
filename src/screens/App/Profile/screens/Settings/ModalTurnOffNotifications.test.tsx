import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ModalTurnOffNotifications from './ModalTurnOffNotifications';

describe('ModalTurnOffNotifications Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });
      afterEach(() => {
        jest.clearAllMocks();
      });

    const mockOnConfirm = jest.fn();
    const mockOnClose = jest.fn();

    it('correctly render title', () => {
        const {getByText} = render(<ModalTurnOffNotifications isVisible={true} onConfirm={mockOnConfirm} onClose={mockOnClose}/>)
        expect(getByText('Are you sure you want turn off all notifications')).toBeTruthy();
    });

    it('correctly render secondary test', () => {
        const {getByText} = render(<ModalTurnOffNotifications isVisible={true} onConfirm={mockOnConfirm} onClose={mockOnClose}/>)
        expect(getByText('You will not receive any notifications')).toBeTruthy();
    });

    it('correctly render accept button', () => {
        const {getByText} = render(<ModalTurnOffNotifications isVisible={true} onConfirm={mockOnConfirm} onClose={mockOnClose}/>);
        const acceptButton = getByText('Yes, turn off')
        expect(acceptButton).toBeTruthy();
        fireEvent.press(acceptButton);
        expect(mockOnConfirm).toHaveBeenCalled();
    });

    it('correctly render close modal button', () => {
        const {getByText} = render(<ModalTurnOffNotifications isVisible={true} onConfirm={mockOnConfirm} onClose={mockOnClose}/>);
        const acceptButton = getByText('Cancel')
        expect(acceptButton).toBeTruthy();
        fireEvent.press(acceptButton);
        expect(mockOnClose).toHaveBeenCalled();
    });
});