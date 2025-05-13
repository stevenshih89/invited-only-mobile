import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import GuestBioCard from '../GuestBioCard';

describe('GuestBioCard', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<GuestBioCard bio="Hello world!" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Bio section and text', () => {
    const {getByText} = render(<GuestBioCard bio="Hello world!" />);
    expect(getByText('Bio')).toBeTruthy();
    expect(getByText('Hello world!')).toBeTruthy();
  });

  it('renders nothing if bio is empty', () => {
    const {queryByText} = render(<GuestBioCard bio="" />);
    expect(queryByText('Bio')).toBeNull();
  });
});
