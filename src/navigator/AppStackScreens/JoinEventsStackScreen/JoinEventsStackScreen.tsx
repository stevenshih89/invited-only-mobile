import { createStackNavigator } from '@react-navigation/stack';
import Header from 'components/Header/Header';
import { joinEventsPath } from 'constants/pathLocations';
import JoinEvents from 'screens/App/JoinEvents/JoinEvents';

const JoinEventsStack = createStackNavigator();

const JoinEventsStackScreen = () => {
  return (
    <JoinEventsStack.Navigator initialRouteName={joinEventsPath}>
      <JoinEventsStack.Screen
        key={joinEventsPath}
        name={joinEventsPath}
        component={JoinEvents}
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="request" />,
        }}
      />
    </JoinEventsStack.Navigator>
  );
};

export default JoinEventsStackScreen;
