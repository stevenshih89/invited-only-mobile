import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import GuestBasicInfoCard from '../GuestBasicInfoCard';

jest.mock('hooks/useGenderSpecs', () => ({
  useGenderSpecs: (gender: string) => ({
    genderIcon: () => <svg data-testid="gender-icon" />,
    genderText: gender === 'man' ? 'Man' : gender === 'woman' ? 'Woman' : 'Other',
  }),
}));
jest.mock('screens/App/Components/Intrests/InterestImageSmallList', () => () => <div>InterestList</div>);

describe('GuestBasicInfoCard', () => {
  const baseProps = {
    homeAddress: 'New York',
    work: {title: 'Engineer'},
    gender: 'man' as 'man',
    listOfInterestsImages: [{id: 1, name: 'Music'}],
  };

  it('matches snapshot', () => {
    const tree = renderer.create(<GuestBasicInfoCard {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders gender text', () => {
    const {getByText} = render(<GuestBasicInfoCard {...baseProps} />);
    expect(getByText('Man')).toBeTruthy();
  });

  it('renders home address', () => {
    const {getByText} = render(<GuestBasicInfoCard {...baseProps} />);
    expect(getByText('New York')).toBeTruthy();
  });

  it('renders work title', () => {
    const {getByText} = render(<GuestBasicInfoCard {...baseProps} />);
    expect(getByText('Engineer')).toBeTruthy();
  });

  it('renders Interests section if interests exist', () => {
    const {getByText} = render(<GuestBasicInfoCard {...baseProps} />);
    expect(getByText('Interests')).toBeTruthy();
  });

  it('does not render Interests section if interests empty', () => {
    const {queryByText} = render(<GuestBasicInfoCard {...baseProps} listOfInterestsImages={[]} />);
    expect(queryByText('Interests')).toBeNull();
  });
});
