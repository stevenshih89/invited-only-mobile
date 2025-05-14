import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import Bio from '../ProfileBio';

describe('ProfileBio', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Bio bio="Hello world!" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Bio section and text', () => {
    const {getByText} = render(<Bio bio="Hello world!" />);
    expect(getByText('Bio')).toBeTruthy();
    expect(getByText('Hello world!')).toBeTruthy();
  });

  it('renders nothing if bio is empty', () => {
    const {queryByText} = render(<Bio bio="" />);
    expect(queryByText('Bio')).toBeNull();
  });
});
