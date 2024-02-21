import {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//import components
import IO from 'screens/App/IO/IO.tsx';
import BottomMenu from 'navigator/BottomMenu/BottomMenu.tsx';
import {blackColor} from 'constants/colors.ts';
import Header from 'components/Header/Header.tsx';
import {IOPath} from 'constants/pathLocations.ts';

const Stack = createStackNavigator();

export const IOStackNavigation: FC = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: true,
      headerTransparent: false,
      headerStyle: {
        backgroundColor: blackColor,
        shadowOffset: {
          height: 0,
          width: 0,
        },
      },
    }}>
    <Stack.Screen
      options={{
        headerShown: true,
        header: () => <Header />,
      }}
      name={IOPath}
      key={IOPath}
      component={IO}
    />
  </Stack.Navigator>
);
const AppStackScreens = () => <BottomMenu />;

export default AppStackScreens;
