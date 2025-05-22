import {createStackNavigator} from '@react-navigation/stack';
import Header from 'components/Header/Header';
import {joinEventsPath} from 'constants/pathLocations';
import JoinEventsWrapper from 'screens/App/JoinEvents/JoinEventsWrapper';

const JoinEventsStack = createStackNavigator();

const JoinEventsStackScreen = () => {
  return (
    <JoinEventsStack.Navigator initialRouteName={joinEventsPath}>
      <JoinEventsStack.Screen
        key={joinEventsPath}
        name={joinEventsPath}
        component={JoinEventsWrapper}
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="request" />,
        }}
      />
    </JoinEventsStack.Navigator>
  );
};

export default JoinEventsStackScreen;
