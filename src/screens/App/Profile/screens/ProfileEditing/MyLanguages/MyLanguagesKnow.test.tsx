import React from 'react';
import {render} from '@testing-library/react-native';
import MyLanguagesKnow from './MyLanguagesKnow';
import {Language} from 'components/Modal/ModalSelectLanguages/ModalSelectLanguages';

describe('MyLanguagesKnow Component', () => {
  it('renders correctly', () => {
    const languages: Language[] = [
      {id: '1', title: 'English', flag: 'US'},
      {id: '2', title: 'Spanish', flag: 'ES'},
    ];
    const {getByText} = render(<MyLanguagesKnow languages={languages} setLanguages={() => {}} />);

    expect(getByText('Languages')).toBeTruthy();
    expect(getByText('Choose the languages you know')).toBeTruthy();
  });
});
