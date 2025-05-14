import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import Languages from '../ProfileLanguages';

jest.mock('country-flag-icons/unicode', () => () => '🏳️');

describe('ProfileLanguages', () => {
  const baseProps = {
    languages: [
      {flag: 'us', title: 'English'},
      {flag: 'fr', title: 'French'},
    ],
  };

  it('matches snapshot', () => {
    const tree = renderer.create(<Languages {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Languages section and languages', () => {
    const {getByText} = render(<Languages {...baseProps} />);
    expect(getByText('Languages')).toBeTruthy();
    expect(getByText('English')).toBeTruthy();
    expect(getByText('French')).toBeTruthy();
  });

  it('renders nothing if languages is empty', () => {
    const {queryByText} = render(<Languages languages={[]} />);
    expect(queryByText('Languages')).toBeNull();
  });
});
