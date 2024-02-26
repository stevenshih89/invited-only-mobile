import {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//import components
import useStyles from 'navigator/BottomMenu/styles.ts';
import {IOStackNavigation, MyEventsStackNavigation} from 'navigator/AppStackScreens/AppStackScreens.tsx';
import {whiteColor} from 'constants/colors.ts';

const Tab = createBottomTabNavigator();

const BottomMenu: FC = (): JSX.Element => {
  const styles = useStyles();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: false,
        tabBarActiveTintColor: whiteColor,
        tabBarStyle: styles.tabNavigator,
      }}
      initialRouteName="IO">
      <Tab.Screen
        options={{
          headerShown: false,
          headerTransparent: false,
          // tabBarIcon: ({focused, color}) => <Icon name={focused ? 'IconHomeFill' : 'IconHome'} />,
        }}
        name="Profile"
        component={IOStackNavigation}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          headerTransparent: false,
          // tabBarIcon: ({focused, color}) => <Icon name={focused ? 'IconHomeFill' : 'IconHome'} />,
        }}
        name="Request"
        component={IOStackNavigation}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          headerTransparent: false,
          // tabBarIcon: ({focused, color}) => <Icon name={focused ? 'IconHomeFill' : 'IconHome'} />,
        }}
        name="IO"
        component={IOStackNavigation}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          headerTransparent: false,
          // tabBarIcon: ({focused, color}) => <Icon name={focused ? 'IconHomeFill' : 'IconHome'} />,
        }}
        name="My events"
        component={MyEventsStackNavigation}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          headerTransparent: false,
          // tabBarIcon: ({focused, color}) => <Icon name={focused ? 'IconHomeFill' : 'IconHome'} />,
        }}
        name="Chat"
        component={IOStackNavigation}
      />
    </Tab.Navigator>
  );
};

export default BottomMenu;
