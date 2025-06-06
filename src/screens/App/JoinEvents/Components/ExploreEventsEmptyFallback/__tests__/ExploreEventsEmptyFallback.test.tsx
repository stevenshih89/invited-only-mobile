import React from 'react';
import {render} from '@testing-library/react-native';
import ExploreEventsEmptyFallback from '../ExploreEventsEmptyFallback';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
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

    const title = getByTestId('empty-state-title');
    const description = getByTestId('empty-state-description');

    expect(title.props.children).toBe('Build Your Profile,\nGet More Invites');
    expect(description.props.children).toBe('Add details to attract invites!');
  });
});
