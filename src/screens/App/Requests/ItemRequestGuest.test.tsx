import {render} from '@testing-library/react-native';
import React from 'react';
import ItemRequestGuest from './ItemRequestGuest';
import {MatchData} from '../IO/screens/Match/Match';
import {NavigationContainer} from '@react-navigation/native';

describe('ItemRequestGuest Component', () => {
  it('correctly render', () => {
    const {} = render(
      <NavigationContainer>
        <ItemRequestGuest
          list={{
            photos: [],
            uid: '',
            hour: undefined,
            date: undefined,
            name: '',
            usersList: [],
            activeType: 0,
            placeName: '',
          }}
          item={{gender: 'man', name: 'test-user', status: 'accepted', superInvite: true, userPhoto: '', uid: 'test-uid'}}
          handleOpenMatch={function (matchData: MatchData): void {
            console.log(matchData);
          }}
          index={0}
        />
      </NavigationContainer>,
    );
  });
});
