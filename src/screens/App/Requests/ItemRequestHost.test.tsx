import {render} from '@testing-library/react-native';
import React from 'react';
import ItemRequestHost from './ItemRequestHost';
import {MatchData} from '../IO/screens/Match/Match';

describe('ItemRequestHost Component', () => {
  it('correctly render', () => {
    const {} = render(
      <ItemRequestHost
        item={{uid: 'test-uid', name: 'test-name'}}
        handleOpenMatch={function (value: MatchData): void {
          console.log(value);
        }}
        setIsVisibleModalFullEvent={function (value: Boolean): void {
          console.log(value);
        }}
        fetchHostRequests={function (): void {
          console.log('Fetching host data');
        }}
      />,
    );
  });
});
