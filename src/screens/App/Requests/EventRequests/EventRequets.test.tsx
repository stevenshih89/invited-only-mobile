import React from 'react';
import {render} from '@testing-library/react-native';
import EventRequets from './EventRequets';

const renderComponent = (item: any, list: any) => render(<EventRequets item={item} list={list} />);

describe.skip('EventRequets Component', () => {
  it('renders correctly', () => {
    const item = {
      uid: 'test-uid',
      name: 'Test User',
      gender: 'male',
      userPhoto: 'https://example.com/photo.jpg',
      photos: [{image: 'https://example.com/photo.jpg'}],
      hostImage: 'https://example.com/host.jpg',
      hostName: 'Host Name',
      placeName: 'Test Place',
      date: '01.01.2024',
      superInvite: true,
    };

    const list = {
      female: 1,
      femaleFriend: 0,
      male: 1,
      maleFriend: 0,
      usersList: [],
      requestsList: [item],
    };
    const {getByText} = renderComponent(item, list);
    expect(getByText('Test Place')).toBeTruthy();
  });

  it('renders super invite', () => {
    const item = {
      uid: 'test-uid',
      name: 'Test User',
      gender: 'male',
      userPhoto: 'https://example.com/photo.jpg',
      photos: [{image: 'https://example.com/photo.jpg'}],
      hostImage: 'https://example.com/host.jpg',
      hostName: 'Host Name',
      placeName: 'Test Place',
      date: '01.01.2024',
      superInvite: true,
    };

    const list = {
      female: 1,
      femaleFriend: 0,
      male: 1,
      maleFriend: 0,
      usersList: [],
      requestsList: [item],
    };
    const {getByText} = renderComponent(item, list);
    expect(getByText('Super invite you')).toBeTruthy();
  });

  it('renders without super invite', () => {
    const item = {
      uid: 'test-uid',
      name: 'Test User',
      gender: 'male',
      userPhoto: 'https://example.com/photo.jpg',
      photos: [{image: 'https://example.com/photo.jpg'}],
      hostImage: 'https://example.com/host.jpg',
      hostName: 'Host Name',
      placeName: 'Test Place',
      date: '01.01.2024',
      superInvite: false,
    };

    const list = {
      female: 1,
      femaleFriend: 0,
      male: 1,
      maleFriend: 0,
      usersList: [],
      requestsList: [item],
    };
    const {queryByText} = renderComponent(item, list);
    expect(queryByText('Super invite you')).toBeFalsy();
  });

  it('renders 10x Women invitation', () => {
    const item = {
      uid: 'test-uid',
      name: 'Test User',
      gender: 'male',
      userPhoto: 'https://example.com/photo.jpg',
      photos: [{image: 'https://example.com/photo.jpg'}],
      hostImage: 'https://example.com/host.jpg',
      hostName: 'Host Name',
      placeName: 'Test Place',
      date: '01.01.2024',
      superInvite: false,
      female: 10,
      male: 10,
    };

    const list = {
      female: 10,
      femaleFriend: 0,
      male: 10,
      maleFriend: 0,
      usersList: [],
      requestsList: [item],
    };
    const {getByText} = renderComponent(item, list);
  });
});
