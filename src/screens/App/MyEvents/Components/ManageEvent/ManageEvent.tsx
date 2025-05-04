import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute, RouteProp } from '@react-navigation/native'; // To get eventId from params

import * as S from './ManageEvent.style';
import ManageEventConnections from './ManageEventConnections/ManageEventConnections';
import ManageEventInfo from './ManageEventInfo/ManageEventInfo';
import { Satoshi500 } from 'constants/fonts';
import { useAppNavigation } from 'src/hooks/useAppNavigation';

type ManageEventRouteParams = {
    ManageEvent: {
        eventId: string;
    };
};

const Tab = createMaterialTopTabNavigator();

export const ManageEvent = () => {
    const route = useRoute<RouteProp<ManageEventRouteParams, 'ManageEvent'>>();
    const { eventId } = route.params;
    const navigation = useAppNavigation();

    return (
        <S.Container>
            <S.HeaderContainer>
                <S.BackButton onPress={() => navigation.goBack()}>
                    <S.StyledBackButtonIcon />
                </S.BackButton>
                <S.HeaderTitle>Manage Event</S.HeaderTitle>
                <S.EditButton>
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
                    {(props) => <ManageEventConnections {...props} eventId={eventId} />}
                </Tab.Screen>
                <Tab.Screen name="Event Info">
                    {(props) => <ManageEventInfo {...props} eventId={eventId} />}
                </Tab.Screen>
            </Tab.Navigator>
        </S.Container>
    );
};

export default ManageEvent;   