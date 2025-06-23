import { FC, ReactElement, useState } from 'react';

import { components } from '@invited-only/invited-only-api';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import JoinEventsHeader from './Components/JoinEventsHeader/JoinEventsHeader';
import ExploreEvents from './screens/ExploreEvents/ExploreEvents';
import Invites from './screens/Invites/Invites';
import useGetUserEvents from './hooks/useGetUserEvents';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import ModalWelcomeAboard from 'components/Modal/ModalWelcomeAboard/ModalWelcomeAboard';
import useUser from 'hooks/user/useUser';

const JoinEvents: FC = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<'explore' | 'invites'>('explore');
  const { user } = useUser();
  const isLocked = user?.uid && !user?.accountReviewed;
  const { events, isLoading, hasNextPage, fetchNextPage } = useGetUserEvents();

  return (
    <BottomSheetModalProvider>
      {!isLocked && <JoinEventsHeader activeTab={activeTab} handleTabChange={setActiveTab} />}
      {activeTab === 'explore' && (
        <ExploreEvents events={events} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isLoading={isLoading} />
      )}
      {activeTab === 'invites' && <Invites fromJoinEvents={true} />}
      <ModalLockedAccount />
      <ModalWelcomeAboard />
    </BottomSheetModalProvider>
  );
};

export default JoinEvents;
