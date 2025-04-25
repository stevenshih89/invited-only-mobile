import React from 'react';
import { render, screen } from '@testing-library/react-native';
import MyProfileView from './MyProfileView';
import { useGenderSpecs } from 'hooks/useGenderSpecs';
import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext';
// Mock hooks
jest.mock('hooks/useGenderSpecs');
// Use require inside the factory function for the API mock
jest.mock('src/api/backend-api', () => require('jest/mocks/backendApi.mock').default);

describe.skip('MyProfileView', () => {
  const mockUserInfo = {
    name: 'Test User',
    gender: 'male',
    location: 'New York',
    homeAddress: 'Brooklyn',
    work: { title: 'Developer' },
    bio: 'Test bio',
    languages: [{ flag: 'us', title: 'English' }],
    interests: [{ id: '1', title: 'Coding' }],
    uid: '123',
    accountConfirmed: true,
  };

  beforeEach(() => {

    (useGenderSpecs as jest.Mock).mockReturnValue({
      genderIcon: '♂',
      genderText: 'Male',
    });
  });

  it('renders loading state correctly', () => {


    render(<MyProfileView />);
    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders user information correctly', () => {
    render(<MyProfileView />);

    expect(screen.getByText('Test User')).toBeTruthy();
    expect(screen.getByText('Test bio')).toBeTruthy();
    expect(screen.getByText('New York')).toBeTruthy();
    expect(screen.getByText('Brooklyn')).toBeTruthy();
    expect(screen.getByText('Developer')).toBeTruthy();
    expect(screen.getByText('English')).toBeTruthy();
    expect(screen.getByText('Coding')).toBeTruthy();
  });

  it('renders without bio when bio is not provided', () => {
    render(
      <FirebaseCollectionsContext.Provider value={{
        userInfo: 'test', adminChats: 'adminChats', admins: 'admins',
        appSettings: 'appSettings',
        messages: 'messages',
        report: 'report',
        unfinishedRegistrationUsers: 'unfinishedRegistrationUsers',
        events: 'events',
        userPhoneUids: 'userPhoneUids',
      }}
      >
        <MyProfileView />
      </FirebaseCollectionsContext.Provider>);
    expect(screen.queryByText('Test bio')).toBeNull();
  });

  it('renders without location when location is not provided', () => {
    render(<MyProfileView />);

    render(<MyProfileView />);
    expect(screen.queryByText('New York')).toBeNull();
  });
});
