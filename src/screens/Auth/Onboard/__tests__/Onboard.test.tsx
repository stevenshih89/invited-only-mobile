import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import Onboard from '../Onboard';

describe('Onboard', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Onboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the Sign In button', () => {
    const {getByText} = render(<Onboard />);
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('renders the bg card image', () => {
    const {getByTestId} = render(<Onboard />);
    expect(getByTestId('bg-card-image')).toBeTruthy();
  });
});
