import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import {ManageEvent} from '../ManageEvent';

jest.mock('../ManageEventConnections/ManageEventConnections', () => () => <div>Connections</div>);
jest.mock('../ManageEventInfo/ManageEventInfo', () => () => <div>Info</div>);
jest.mock('src/hooks/useAppNavigation', () => ({useAppNavigation: () => ({goBack: jest.fn()})}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({params: {eventId: '1'}}),
}));

describe('ManageEvent', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<ManageEvent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the header title', () => {
    const {getByText} = render(<ManageEvent />);
    expect(getByText('Manage Event')).toBeTruthy();
  });

  it('renders the Edit button', () => {
    const {getByText} = render(<ManageEvent />);
    expect(getByText('Edit')).toBeTruthy();
  });

  it('renders Guest List and Event Info tabs', () => {
    const {getByText} = render(<ManageEvent />);
    expect(getByText('Guest List')).toBeTruthy();
    expect(getByText('Event Info')).toBeTruthy();
  });
});
