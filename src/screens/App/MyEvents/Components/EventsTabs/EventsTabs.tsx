import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions} from 'react-native';
import MyEvents from '../../MyEvents'; // The screen showing the list of hosted events
import JoinedEventsScreen from '../JoinedEventsScreen/JoinedEventsScreen';
import {TabBarLabel, tabBarStyle, tabBarIndicatorStyle, tabBarItemStyle} from './EventsTabs.style';
// Adjust path if needed
import {whiteColor, white64Color} from 'constants/colors'; // Keep color imports for tint colors
// Import styles from the .style file

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get('window').width;

const EventsTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: whiteColor,
        tabBarInactiveTintColor: white64Color,
        tabBarStyle: tabBarStyle,
        tabBarIndicatorStyle: tabBarIndicatorStyle,
        tabBarItemStyle: tabBarItemStyle,
        tabBarLabel: ({color, focused, children}) => <TabBarLabel style={{color}}>{children}</TabBarLabel>,
        tabBarGap: 24,
        tabBarPressColor: 'rgba(255, 255, 255, 0.1)',
        tabBarScrollEnabled: false,
      }}>
      <Tab.Screen name="My Events" component={MyEvents} />
      <Tab.Screen name="Joined Events" component={JoinedEventsScreen} />
    </Tab.Navigator>
  );
};

export default EventsTabs;
