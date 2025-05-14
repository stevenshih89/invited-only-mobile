import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import ProfileBasics from '../ProfileBasics';

jest.mock('hooks/useGenderSpecs', () => ({
  useGenderSpecs: (gender: string) => ({
    genderIcon: () => <svg data-testid="gender-icon" />,
    genderText: gender === 'man' ? 'Man' : gender === 'woman' ? 'Woman' : 'Other',
  }),
}));
jest.mock('screens/App/Components/Intrests/InterestImageSmallList', () => {
  const MockComponent = () => <div>InterestList</div>;
  MockComponent.displayName = 'InterestImageSmallList';
  return MockComponent;
});

describe('ProfileBasics', () => {
  const baseProps = {
    location: 'Los Angeles',
    homeAddress: 'New York',
    work: {title: 'Engineer'},
    gender: 'man' as 'man',
    listOfInterestsImages: [{id: 1, name: 'Music'}],
  };

  it('matches snapshot', () => {
    const tree = renderer.create(<ProfileBasics {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Basics section', () => {
    const {getByText} = render(<ProfileBasics {...baseProps} />);
    expect(getByText('Basics')).toBeTruthy();
  });

  it('renders gender text', () => {
    const {getByText} = render(<ProfileBasics {...baseProps} />);
    expect(getByText('Man')).toBeTruthy();
  });

  it('renders home address', () => {
    const {getByText} = render(<ProfileBasics {...baseProps} />);
    expect(getByText('New York')).toBeTruthy();
  });

  it('renders location', () => {
    const {getByText} = render(<ProfileBasics {...baseProps} />);
    expect(getByText('Los Angeles')).toBeTruthy();
  });

  it('renders work title', () => {
    const {getByText} = render(<ProfileBasics {...baseProps} />);
    expect(getByText('Engineer')).toBeTruthy();
  });

  it('renders Interests section if interests exist', () => {
    const {getByText} = render(<ProfileBasics {...baseProps} />);
    expect(getByText('Interests')).toBeTruthy();
  });

  it('does not render Interests section if interests empty', () => {
    const {queryByText} = render(<ProfileBasics {...baseProps} listOfInterestsImages={[]} />);
    expect(queryByText('Interests')).toBeNull();
  });
});
