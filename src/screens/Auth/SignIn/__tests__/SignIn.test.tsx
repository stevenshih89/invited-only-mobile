import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from '../SignIn';

describe('SignIn', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
