import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute, RouteProp } from '@react-navigation/native'; // To get eventId from params

import { components } from '@invited-only/invited-only-api';
import * as S from './ManageEvent.style';
import ManageEventConnections from './ManageEventConnections/ManageEventConnections';
import ManageEventInfo from './ManageEventInfo/ManageEventInfo';
import { Satoshi500 } from 'constants/fonts';
import { useAppNavigation } from 'src/hooks/useAppNavigation';

type ManageEventRouteParams = {
    ManageEvent: {
        event: components['schemas']['EventData'];
    };
};

const Tab = createMaterialTopTabNavigator();

export const ManageEvent = () => {
    const route = useRoute<RouteProp<ManageEventRouteParams, 'ManageEvent'>>();
    const { event } = route.params;
    const navigation = useAppNavigation();

    return (
        <S.Container>
            <S.HeaderContainer>
                <S.BackButton onPress={() => navigation.goBack()}>
                    <S.StyledBackButtonIcon />
                </S.BackButton>
                <S.HeaderTitle>Manage Event</S.HeaderTitle>
                <S.EditButton onPress={() => navigation.navigate('/event-creating-stack', { isEditing: true, event: event })}>
                    <S.StyledEditButtonText>Edit</S.StyledEditButtonText>
                </S.EditButton>
            </S.HeaderContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 16, textTransform: 'capitalize', fontFamily: Satoshi500 },
                    tabBarStyle: { backgroundColor: 'black' },
                    tabBarIndicatorStyle: { backgroundColor: 'white' },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'gray',
                    sceneStyle: { paddingTop: 20 },
                }}
            >
                <Tab.Screen name="Guest List">
                    {(props) => <ManageEventConnections {...props} eventId={event.uid} />}
                </Tab.Screen>
                <Tab.Screen name="Event Info">
                    {(props) => <ManageEventInfo {...props} eventId={event.uid} />}
                </Tab.Screen>
            </Tab.Navigator>
        </S.Container>
    );
};

export default ManageEvent;   