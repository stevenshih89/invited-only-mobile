import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ManageEvent} from '../ManageEvent';

jest.mock('../ManageEventConnections/ManageEventConnections', () => {
  function MockManageEventConnections() {
    return <div>Connections</div>;
  }
  MockManageEventConnections.displayName = 'MockManageEventConnections';
  return MockManageEventConnections;
});
jest.mock('../ManageEventInfo/ManageEventInfo', () => {
  function MockManageEventInfo() {
    return <div>Info</div>;
  }
  MockManageEventInfo.displayName = 'MockManageEventInfo';
  return MockManageEventInfo;
});
jest.mock('src/hooks/useAppNavigation', () => ({useAppNavigation: () => ({goBack: jest.fn()})}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({params: {event: {uid: '1'}}}),
}));

describe('ManageEvent', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <NavigationContainer>
          <ManageEvent />
        </NavigationContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the header title', () => {
    const {getByText} = render(
      <NavigationContainer>
        <ManageEvent />
      </NavigationContainer>,
    );
    expect(getByText('Manage Event')).toBeTruthy();
  });

  it('renders the Edit button', () => {
    const {getByText} = render(
      <NavigationContainer>
        <ManageEvent />
      </NavigationContainer>,
    );
    expect(getByText('Edit')).toBeTruthy();
  });
});
