import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {backgroundColor, blackColor, whiteColor} from 'constants/colors';
import EventRequets from 'screens/App/Requests/EventRequests/EventRequets';
import EventRequearHeader from './EventRequearHeader/EventRequearHeader';
import {useAppNavigation} from 'hooks/useAppNavigation';

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
      <EventRequestStack.Screen name="Requests" key="/event/requests" component={EventRequets} />
    </EventRequestStack.Navigator>
  );
};

export default RequestStackScreen;
