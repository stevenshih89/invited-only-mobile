import React from 'react';
import {render} from '@testing-library/react-native';
import ModalLockedEvent from '../ModalLockedEvent';
import {useAppNavigation} from 'hooks/useAppNavigation';

jest.mock('hooks/useAppNavigation', () => ({
  useAppNavigation: jest.fn(),
}));

describe('ModalLockedEvent', () => {
  const mockNavigate = jest.fn();
  const mockEvent = {
    id: '123',
    uid: '123',
    eventReviewed: false,
  };

  beforeEach(() => {
    (useAppNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when event is under review', () => {
    const {getByText} = render(<ModalLockedEvent event={mockEvent} />);

    expect(getByText('Under Review')).toBeTruthy();
    expect(getByText('Event Under Review')).toBeTruthy();
    expect(getByText("Thank you for your patience. Your event is being reviewed. We'll notify you once it's approved.")).toBeTruthy();
  });

  it('does not render when event is reviewed', () => {
    const {queryByText} = render(<ModalLockedEvent event={{...mockEvent, eventReviewed: true}} />);

    expect(queryByText('Under Review')).toBeNull();
  });

  it('does not render when eventReviewed is undefined', () => {
    const {queryByText} = render(<ModalLockedEvent event={{...mockEvent, eventReviewed: undefined}} />);

    expect(queryByText('Under Review')).toBeNull();
  });
});
