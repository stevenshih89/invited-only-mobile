import React, { useState } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { components } from '@invited-only/invited-only-api';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import EventRequests from '../MyEvents/Components/EventRequests/EventRequests';
import usePersistentCardSwipe from './hooks/usePersistentCardSwipe';
import { useEventGuests } from './hooks/useEventGuests';
import IoHeader from './components/IoHeader/IoHeader';
import InviteGuestsEvent from './components/InviteGuestsEvent/InviteGuestsEvent';
import * as S from './IO.style';
import useEventAttendes from './hooks/useEventAttendes';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import ModalStartInviting from 'components/Modal/ModalStartInviting/ModalStartInviting';

type GuestUser = components['schemas']['User'];

interface Props {
    events: components['schemas']['EventData'][];
}

const IO = ({ events }: Props) => {
  const [selectedEvent, setSelectedEvent] = useState<components['schemas']['EventData']>(events[0]);


    type IoTabs = {
        '/io/invite': RouteProp<ParamListBase, '/io/invite'>;
        '/io/requests': RouteProp<ParamListBase, '/io/requests'>;
    };

  const Tab = createMaterialTopTabNavigator<IoTabs>();
  const { guests, isLoading: isGuestsLoading, isFetchingNextPage, hasNextPage, fetchNextPage, status } = useEventGuests(selectedEvent?.uid);
  const { attendingGuests } = useEventAttendes(selectedEvent?.uid);
  const {
    cards: currentEventCards,
    hasCards,
    handleSwipeLeft,
    handleSwipeRight,
    handleSuperInvite,
    resetDeck,
  } = usePersistentCardSwipe<GuestUser>({
    cardsData: guests,
    eventId: selectedEvent?.uid,
  });
    const handleEventSelect = (event: components['schemas']['EventData']) => {
        setSelectedEvent(event);
    };

    if (!hasCards && status === 'success' && hasNextPage) {
        resetDeck(selectedEvent?.uid ?? '');
        fetchNextPage();
    }

    const CustomTabBar = (props: MaterialTopTabBarProps) => (
        <>
            <IoHeader
                events={events}
                selectedEvent={selectedEvent}
                onEventSelect={handleEventSelect}
                onRequestPress={() => props.navigation.navigate('/io/requests')}
                onDropdownChange={() => props.navigation.navigate('/io/invite')}
                attendingGuests={attendingGuests || []}
            />
        </>
    );

    return (
        <BottomSheetModalProvider>
            <DefaultBackground>
                <S.IoContainer>
                    <Tab.Navigator
                        style={S.tabNavigatorStyle}
                        initialRouteName="/io/invite"
                        tabBar={props => <CustomTabBar {...props} />}
                        screenOptions={{
                            swipeEnabled: false,
                        }}>
                        <Tab.Screen name="/io/invite">
                            {() => (
                                <InviteGuestsEvent
                                    isLockedProfile={false}
                                    selectedEvent={selectedEvent}
                                    cardsToShow={currentEventCards}
                                    allCards={guests}
                                    isLoading={isGuestsLoading || isFetchingNextPage}
                                    onSwipeLeft={handleSwipeLeft}
                                    onSwipeRight={handleSwipeRight}
                                    onSuperInvite={handleSuperInvite}
                                />
                            )}
                        </Tab.Screen>
                        <Tab.Screen name="/io/requests">{() => <EventRequests eventId={selectedEvent?.uid || ''} />}</Tab.Screen>
                    </Tab.Navigator>
                </S.IoContainer>
                <ModalStartInviting />
                {/* {isGuestsLoading || isFetchingNextPage || (!hasCards && guests.length > 0) ? null : <ModalLockedAccount />} */}
                <ModalLockedAccount />
            </DefaultBackground>
        </BottomSheetModalProvider>
    );
};

export default gestureHandlerRootHOC(IO);
