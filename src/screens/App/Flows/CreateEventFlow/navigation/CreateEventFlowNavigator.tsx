import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import GuestInvitationStep from '../Components/GuestInvitationStep/GuestInvitationStep';
import EventPlaceStep from '../Components/EventPlaceStep/EventPlaceStep';
import PreviewEventStep from '../Components/PreviewEventStep/PreviewEventStep';
import CreateEventFlowStepper from '../Components/CreateEventFlowStepper/CreateEventFlowStepper';
import {useAppNavigation} from 'hooks/useAppNavigation';

export type CreateEventFlowStackParamList = {
  GuestInvitation: undefined;
  EventPlace: undefined;
  PreviewEvent: undefined;
};

export const CREATE_EVENT_FLOW_ROUTES = {
  GUEST_INVITATION: '/create-event-flow/guest-invitation',
  EVENT_PLACE: '/create-event-flow/event-place',
  PREVIEW_EVENT: '/create-event-flow/preview-event',
} as const;

export type CreateEventFlowTabs = {
  '/create-event-flow/guest-invitation': RouteProp<ParamListBase, '/create-event-flow/guest-invitation'>;
  '/create-event-flow/event-place': RouteProp<ParamListBase, '/create-event-flow/event-place'>;
  '/create-event-flow/preview-event': RouteProp<ParamListBase, '/create-event-flow/preview-event'>;
};

const Tab = createMaterialTopTabNavigator<CreateEventFlowTabs>();

export const CreateEventFlowNavigator = ({handleNextStep, isEditing}: {handleNextStep: (values: any) => void; isEditing: boolean}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Tab.Navigator
        initialRouteName={CREATE_EVENT_FLOW_ROUTES.GUEST_INVITATION}
        tabBar={props => <CreateEventFlowStepper currentStep={props.state.index + 1} {...props} />}
        screenOptions={{
          swipeEnabled: false,
        }}>
        <Tab.Screen name={CREATE_EVENT_FLOW_ROUTES.GUEST_INVITATION}>
          {() => {
            const navigation = useAppNavigation();
            return (
              <GuestInvitationStep
                handleNextStep={() => {
                  handleNextStep({
                    currentStep: CREATE_EVENT_FLOW_ROUTES.GUEST_INVITATION,
                    nextStep: () => {
                      navigation.navigate(CREATE_EVENT_FLOW_ROUTES.EVENT_PLACE as never);
                    },
                  });
                }}
              />
            );
          }}
        </Tab.Screen>
        <Tab.Screen name={CREATE_EVENT_FLOW_ROUTES.EVENT_PLACE}>
          {() => {
            const navigation = useAppNavigation();
            return (
              <EventPlaceStep
                handleNextStep={() => {
                  handleNextStep({
                    currentStep: CREATE_EVENT_FLOW_ROUTES.EVENT_PLACE,
                    nextStep: () => {
                      navigation.navigate(CREATE_EVENT_FLOW_ROUTES.PREVIEW_EVENT as never);
                    },
                  });
                }}
                handleBackStep={() => {
                  navigation.navigate(CREATE_EVENT_FLOW_ROUTES.GUEST_INVITATION as never);
                }}
              />
            );
          }}
        </Tab.Screen>
        <Tab.Screen name={CREATE_EVENT_FLOW_ROUTES.PREVIEW_EVENT}>
          {() => {
            const navigation = useAppNavigation();
            return (
              <PreviewEventStep
                isEditing={isEditing}
                handleNextStep={() => {
                  handleNextStep({
                    currentStep: CREATE_EVENT_FLOW_ROUTES.PREVIEW_EVENT,
                    nextStep: () => {
                      navigation.navigate(CREATE_EVENT_FLOW_ROUTES.PREVIEW_EVENT as never);
                    },
                  });
                }}
                handleBackStep={() => {
                  navigation.navigate(CREATE_EVENT_FLOW_ROUTES.EVENT_PLACE as never);
                }}
              />
            );
          }}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};
