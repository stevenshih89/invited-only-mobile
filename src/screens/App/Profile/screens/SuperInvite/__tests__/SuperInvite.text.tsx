import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import SuperInvite from '../SuperInvite';

describe('SuperInvite', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<SuperInvite />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the title', () => {
    const {getByText} = render(<SuperInvite />);
    expect(getByText('Super Invites')).toBeTruthy();
  });

  it('shows default button text', () => {
    const {getByText} = render(<SuperInvite />);
    expect(getByText(/Get 15 Super Invites for/)).toBeTruthy();
  });
});
