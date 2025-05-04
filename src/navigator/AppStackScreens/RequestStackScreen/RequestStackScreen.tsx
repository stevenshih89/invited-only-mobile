import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import EventRequearHeader from './EventRequearHeader/EventRequearHeader';
import { blackColor, whiteColor } from 'constants/colors';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { EventRequestsWrapper } from 'screens/App/MyEvents/Components/EventRequests/EventRequestsWrapper';
import { eventRequestStackPath } from 'constants/pathLocations';

const EventRequestStack = createStackNavigator();

const RequestStackScreen = () => {
  const navigation = useAppNavigation();
  const stackNavigationOptions: StackNavigationOptions = {
    cardStyle: {
      backgroundColor: blackColor,
    },
    headerStyle: {
      backgroundColor: blackColor,
    },
    headerTitle: 'Requests',
    headerTitleStyle: {
      color: whiteColor,
    },
    headerBackTitleStyle: {
      color: whiteColor,
    },
    headerTintColor: whiteColor,
    header: () => <EventRequearHeader title="Requests" onBackPress={() => navigation.goBack()} />,
  };

  return (
    <EventRequestStack.Navigator screenOptions={stackNavigationOptions}>
      <EventRequestStack.Screen key={eventRequestStackPath} name={eventRequestStackPath} component={EventRequestsWrapper} />
    </EventRequestStack.Navigator>
  );
};

export default RequestStackScreen;
