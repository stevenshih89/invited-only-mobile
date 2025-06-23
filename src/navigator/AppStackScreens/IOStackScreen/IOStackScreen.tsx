import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { FC } from 'react';
import { blackColor } from 'constants/colors';
import { IOPath, joinEventsPath } from 'constants/pathLocations';
import IOWrapper from 'screens/App/IO/IOWrapper';
import Header from 'components/Header/Header.tsx';
import JoinEvents from 'screens/App/JoinEvents/JoinEvents';

const IOStack = createStackNavigator();

const screenOptions = {
  cardOverlayEnabled: true,
  cardStyle: { backgroundColor: blackColor },
} as StackNavigationOptions;

const IOStackScreen: FC = () => {
  return (
    <IOStack.Navigator
      initialRouteName={IOPath}
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerStyle: styles.headerStyle,
        ...screenOptions,
      }}>
      <IOStack.Screen
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="IO" />,
        }}
        name={IOPath}
        key={IOPath}
        component={IOWrapper}
      />
      <IOStack.Screen
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="IO-JE" />,
        }}
        name={joinEventsPath}
        key={joinEventsPath}
        component={JoinEvents}
      />
    </IOStack.Navigator>
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

export default IOStackScreen;
