import { FC, ReactElement, useCallback, useRef, useState } from 'react';

import { components } from '@invited-only/invited-only-api';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import usePersistentCardSwipe from '../IO/hooks/usePersistentCardSwipe';
import JoinEventsHeader from './Components/JoinEventsHeader/JoinEventsHeader';
import ExploreEventsEmptyFallback from './Components/ExploreEventsEmptyFallback/ExploreEventsEmptyFallback';
import ExploreEvents from './screens/ExploreEvents/ExploreEvents';
import Invites from './screens/Invites/Invites';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

interface Props {
  events: components['schemas']['EventData'][];
}

const JoinEvents: FC<Props> = ({ events }): ReactElement => {


  const [activeTab, setActiveTab] = useState<'explore' | 'invites'>('explore');


  return (
    <BottomSheetModalProvider>
      <DefaultBackground>
        <JoinEventsHeader activeTab={activeTab} handleTabChange={setActiveTab} />
        {activeTab === 'explore' && <ExploreEvents events={events} />}
        {activeTab === 'invites' && <Invites events={events} />}
        <ModalLockedAccount />
      </DefaultBackground>
    </BottomSheetModalProvider>
  );
};

export default JoinEvents;
