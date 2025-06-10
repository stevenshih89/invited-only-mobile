import React from 'react';
import {render} from '@testing-library/react-native';
import ExploreEventsEmptyFallback from '../ExploreEventsEmptyFallback';

jest.mock('hooks/user/useUser', () => ({
  __esModule: true,
  default: () => ({
    user: {
      uid: '123',
      accountReviewed: true,
    },
  }),
}));

describe('ExploreEventsEmptyFallback', () => {
  it('renders empty state view with correct elements', () => {
    const {getByTestId} = render(<ExploreEventsEmptyFallback />);

    expect(getByTestId('empty-state-container')).toBeTruthy();
    expect(getByTestId('empty-state-image')).toBeTruthy();
    expect(getByTestId('empty-state-title')).toBeTruthy();
    expect(getByTestId('empty-state-description')).toBeTruthy();
  });

  it('displays correct text content', () => {
    const {getByTestId} = render(<ExploreEventsEmptyFallback />);

    const description = getByTestId('empty-state-description');

    expect(description.props.children).toBe('Add details to attract invites!');
  });
});
