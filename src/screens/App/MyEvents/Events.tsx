import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as S from './Events.style';
import MyEvents from './MyEvents'; // Your existing list component
import JoinedEventsScreen from './Components/JoinedEventsScreen/JoinedEventsScreen'; // The placeholder
import EventsHeader from './Components/EventsHeader/EventsHeader';

const TabNavigator = createMaterialTopTabNavigator();


const Events = () => {
  // const [activeTab, setActiveTab] = useState<TabType>('MyEvents'); // No longer needed for TabNavigator state

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
    </S.ScreenContainer>
  );

  // return (
  //   <DefaultBackground>
  //     <S.ScreenContainer>
  //       <EventsHeader />
  //       <S.TabsRow>
  //         <S.TabButton isActive={activeTab === 'MyEvents'} onPress={() => setActiveTab('MyEvents')}>
  //           <S.TabButtonText isActive={activeTab === 'MyEvents'}>My Events</S.TabButtonText>
  //         </S.TabButton>
  //         <S.TabButton isActive={activeTab === 'JoinedEvents'} onPress={() => setActiveTab('JoinedEvents')}>
  //           <S.TabButtonText isActive={activeTab === 'JoinedEvents'}>Joined Events</S.TabButtonText>
  //         </S.TabButton>
  //       </S.TabsRow>
  //       <S.ContentContainer>
  //         {activeTab === 'MyEvents' && <MyEvents />}
  //         {activeTab === 'JoinedEvents' && <JoinedEventsScreen />}
  //       </S.ContentContainer>
  //     </S.ScreenContainer>
  //     <ModalLockedAccount />
  //   </DefaultBackground>
  // );
};

export default Events;
