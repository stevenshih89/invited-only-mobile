import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as S from './Events.style';
import MyEvents from './MyEvents'; // Your existing list component
import JoinedEventsScreen from './Components/JoinedEventsScreen/JoinedEventsScreen'; // The placeholder
import EventsHeader from './Components/EventsHeader/EventsHeader';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import { useAuthStore } from 'src/store/authStore';
import useUser from 'hooks/user/useUser';
import NewEventsScreen from './NewEventsScreen';

const TabNavigator = createMaterialTopTabNavigator();

const Events = () => {
  const { onBoarding } = useAuthStore.getState();
  const initialTab = onBoarding?.registrationDetails?.gender === 'woman' ? 'Joined Events' : 'My Events';
  const { user } = useUser();
  const isLocked = !user?.accountReviewed;

  return (
    <S.ScreenContainer>
      <EventsHeader />
      {isLocked ? <NewEventsScreen /> : (
        <TabNavigator.Navigator initialRouteName={initialTab} screenOptions={{
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
      )}
      <ModalLockedAccount />

    </S.ScreenContainer>
  );
};

export default Events;
