import React, {FC, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//import components
import Header from 'components/Header/Header.tsx';
import {chatPath, chatWindowPath} from 'constants/pathLocations.ts';
import useStyles from 'navigator/AppStackScreens/styles'; // Assuming styles are shared for now
import Chat from 'screens/App/Chat/Chat.tsx';
import {ChatWindow} from 'screens/App/Chat/ChatWindow/ChatWindow.tsx';
import {blackColor} from 'constants/colors';

const Stack = createStackNavigator();

export const ChatStackScreen: FC = () => {
  const [typeEvents, setTypeEvents] = useState<boolean>(false);
  const styles = useStyles();

  return (
    <Stack.Navigator
      initialRouteName={chatPath}
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerStyle: styles.headerStyle,
        cardStyle: {backgroundColor: blackColor}, // Added cardStyle for consistency
      }}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <Header typeEvents={typeEvents} setTypeEvents={setTypeEvents} headerType="chat" showHeaderTop={true} logoType="logo" badge />
          ),
        }}
        name={chatPath}
        key={chatPath}
        component={Chat}
      />
      <Stack.Screen
        name={chatWindowPath}
        key={chatWindowPath}
        component={ChatWindow}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStackScreen;
