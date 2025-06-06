import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import DeleteEventModal from '../DeleteEventModal';

jest.mock('hooks/useAppNavigation', () => ({
  useAppNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('src/api/backend-api', () => ({
  __esModule: true,
  default: {
    useMutation: () => ({
      mutate: jest.fn(),
      isPending: false,
    }),
  },
}));

jest.mock('helpers/showToast', () => ({
  showToast: jest.fn(),
}));

jest.mock('src/assets/images/icons/close-circle.svg', () => 'CloseIcon');

describe('DeleteEventModal', () => {
  const mockOnClose = jest.fn();
  const mockEventId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const {getByText} = render(<DeleteEventModal isVisible={true} onClose={mockOnClose} eventId={mockEventId} />);

    expect(getByText('Delete Event')).toBeTruthy();
    expect(getByText('Are you sure you want to delete this event?')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const {queryByText} = render(<DeleteEventModal isVisible={false} onClose={mockOnClose} eventId={mockEventId} />);

    expect(queryByText('Delete Event')).toBeNull();
    expect(queryByText('Are you sure you want to delete this event?')).toBeNull();
    expect(queryByText('Delete')).toBeNull();
  });

  it('calls onClose when close button is pressed', () => {
    const {getByTestId} = render(<DeleteEventModal isVisible={true} onClose={mockOnClose} eventId={mockEventId} />);

    fireEvent.press(getByTestId('close-button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
