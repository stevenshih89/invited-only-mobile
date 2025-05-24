import {FC, ReactElement, useState} from 'react';

import {components} from '@invited-only/invited-only-api';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import JoinEventsHeader from './Components/JoinEventsHeader/JoinEventsHeader';
import ExploreEvents from './screens/ExploreEvents/ExploreEvents';
import Invites from './screens/Invites/Invites';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import ModalWelcomeAboard from 'components/Modal/ModalWelcomeAboard/ModalWelcomeAboard';

interface Props {
  events: components['schemas']['EventData'][];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
}

const JoinEvents: FC<Props> = ({events, hasNextPage, fetchNextPage, isLoading}): ReactElement => {
  const [activeTab, setActiveTab] = useState<'explore' | 'invites'>('explore');

  return (
    <BottomSheetModalProvider>
      <JoinEventsHeader activeTab={activeTab} handleTabChange={setActiveTab} />
      {activeTab === 'explore' && (
        <ExploreEvents events={events} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isLoading={isLoading} />
      )}
      {activeTab === 'invites' && <Invites />}
      <ModalLockedAccount />
      <ModalWelcomeAboard />
    </BottomSheetModalProvider>
  );
};

export default JoinEvents;
