import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { FC } from 'react';
import { blackColor } from 'constants/colors';
import { manageEventPath, myEventsPath } from 'constants/pathLocations';
import ManageEvent from 'screens/App/MyEvents/Components/ManageEvent/ManageEvent';
import Events from 'screens/App/MyEvents/Events';
import Header from 'components/Header/Header.tsx';

const MyEventsStack = createStackNavigator();

export const MyEventsStackScreen: FC = () => {

  return (
    <MyEventsStack.Navigator
      initialRouteName={myEventsPath}
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerStyle: styles.headerStyle,
      }}>
      <MyEventsStack.Screen
        options={{
          headerShown: true,
          header: () => <Header logoType="logo" headerType="myEvents" badge />,
        }}
        name={myEventsPath}
        key={myEventsPath}
        component={Events}
      />
      <MyEventsStack.Screen
        options={{
          headerShown: true,
          header: () => <Header logoType="logo" headerType="myEvents" badge />,
        }}
        name={manageEventPath}
        key={manageEventPath}
        component={ManageEvent}
      />
    </MyEventsStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: blackColor,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});

export default MyEventsStackScreen;
