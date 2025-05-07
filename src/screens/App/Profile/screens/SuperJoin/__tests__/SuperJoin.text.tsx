import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import SuperJoin from '../SuperJoin';

describe('SuperJoin', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<SuperJoin />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the title', () => {
    const {getByText} = render(<SuperJoin />);
    expect(getByText('Super Joins')).toBeTruthy();
  });

  it('shows default button text', () => {
    const {getByText} = render(<SuperJoin />);
    expect(getByText(/Get 15 Super Joins for/)).toBeTruthy();
  });
});
