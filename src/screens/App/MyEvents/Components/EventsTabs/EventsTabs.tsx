import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyEvents from '../../MyEvents'; // The screen showing the list of hosted events
import JoinedEventsScreen from '../JoinedEventsScreen/JoinedEventsScreen';
import { Dimensions } from 'react-native';
import { Satoshi500 } from 'src/constants/fonts'; // Adjust path if needed
import { whiteColor } from 'constants/colors'; // Adjust path if needed

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get('window').width;

const EventsTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: whiteColor,
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)', // Lighter white for inactive
        tabBarStyle: {
          backgroundColor: 'transparent', // Make tab bar background transparent
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
          // Match Figma layout width if needed, but usually responsive is better
          // width: 382, 
          // alignSelf: 'center',
          marginTop: 20, // Approximate position based on Figma (top: 196px)
          marginBottom: 10, // Add some space below tabs
        },
        tabBarIndicatorStyle: {
          backgroundColor: whiteColor, // Color of the underline indicator
          height: 2,
        },
        tabBarLabelStyle: {
          fontFamily: Satoshi500,
          fontSize: 16, // Adjust as needed
          textTransform: 'none', // Prevent uppercase labels
        },
        tabBarGap: 24, // Match Figma gap
        tabBarPressColor: 'rgba(255, 255, 255, 0.1)', // Ripple effect color
        // Adjust tab width if fixed width is desired
        // tabBarItemStyle: {
        //   width: (382 - 24) / 2, // Calculate width based on Figma layout (totalWidth - gap) / numTabs
        // }
      }}
    >
      <Tab.Screen name="My Events" component={MyEvents} />
      <Tab.Screen name="Joined Events" component={JoinedEventsScreen} />
    </Tab.Navigator>
  );
};

export default EventsTabs; 