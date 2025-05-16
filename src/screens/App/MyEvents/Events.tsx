import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as S from './Events.style';
import MyEvents from './MyEvents'; // Your existing list component
import JoinedEventsScreen from './Components/JoinedEventsScreen/JoinedEventsScreen'; // The placeholder
import EventsHeader from './Components/EventsHeader/EventsHeader';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';

const TabNavigator = createMaterialTopTabNavigator();

const Events = () => {

  return (
    <S.ScreenContainer>
      <EventsHeader />
      <TabNavigator.Navigator screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
          marginBottom: 10,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'black',
        },
      }}>
        <TabNavigator.Screen name="My Events" component={MyEvents} />
        <TabNavigator.Screen name="Joined Events" component={JoinedEventsScreen} />
      </TabNavigator.Navigator>
      <ModalLockedAccount />
    </S.ScreenContainer>
  );
};

export default Events;
