import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import FindConnections from './Components/FindConnections/FindConnections';
import MyConnections from './Components/MyConnections/MyConnections';
import {tabBarStyle, tabBarLabelStyle, tabBarIndicatorStyle, tabBarItemStyle} from './ConnectTabs.style';
import {whiteColor, white40Color} from 'constants/colors'; // Using white for indicator

type ConnectTabParamList = {
  '/find-connections': RouteProp<ParamListBase, '/find-connections'>; // Use literal path
  '/my-connections': RouteProp<ParamListBase, '/my-connections'>; // Use literal path
  '/requests': RouteProp<ParamListBase, '/requests'>; // Use literal path
};

const Tab = createMaterialTopTabNavigator<ConnectTabParamList>();

const ConnectTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="/find-connections"
      screenOptions={{
        tabBarActiveTintColor: whiteColor,
        tabBarInactiveTintColor: white40Color,
        tabBarLabelStyle: tabBarLabelStyle,
        tabBarIndicatorStyle: tabBarIndicatorStyle,
        tabBarStyle: tabBarStyle,
        tabBarItemStyle: tabBarItemStyle,
      }}>
      <Tab.Screen name="/find-connections" component={FindConnections} options={{title: 'Find Connections'}} />
      <Tab.Screen
        name="/my-connections"
        component={MyConnections}
        options={{title: 'My Network'}}
        listeners={{
          tabPress: (e: any) => {
            e.preventDefault();
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default ConnectTabs;
