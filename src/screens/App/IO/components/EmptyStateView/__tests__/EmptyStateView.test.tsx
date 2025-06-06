import React from 'react';
import {render} from '@testing-library/react-native';
import EmptyStateView from '../EmptyStateView';

jest.mock('../../IoHeader/Components/CreateEventButton/CreateEventButton', () => 'CreateEventButton');
jest.mock('src/assets/images/app/empty-fallback-io-screen.png', () => 'CardsSwipeImage');

describe('EmptyStateView', () => {
  it('renders correctly with all required elements', () => {
    const {getByText, getByTestId} = render(<EmptyStateView />);

    expect(getByText('Create Your First Event')).toBeTruthy();
    expect(getByText('Create your first event to start inviting guests.')).toBeTruthy();
    expect(getByTestId('empty-state-image')).toBeTruthy();
  });
});
