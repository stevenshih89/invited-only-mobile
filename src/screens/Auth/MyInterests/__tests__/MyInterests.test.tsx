import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import MyInterests from '../MyInterests';

describe('MyInterests', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<MyInterests />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the title', () => {
    const {getByTestId} = render(<MyInterests />);
    expect(getByTestId('interests-title')).toBeTruthy();
  });

  it('renders at least one interest item', () => {
    const {getByTestId} = render(<MyInterests />);
    expect(getByTestId('interest-item-0')).toBeTruthy();
  });

  it('renders all interest items', () => {
    const {getAllByTestId} = render(<MyInterests />);
    expect(getAllByTestId('image-of-interest')).toHaveLength(16);
  });

  it('renders the continue button', () => {
    const {getByTestId} = render(<MyInterests />);
    expect(getByTestId('continue-button')).toBeTruthy();
  });
  it('renders the skip button', () => {
    const {getByTestId} = render(<MyInterests />);
    expect(getByTestId('skip-button')).toBeTruthy();
  });
});
