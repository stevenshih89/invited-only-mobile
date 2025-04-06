import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Edit from 'assets/images/icons/edit.svg';
import Header from 'components/Header/Header';
import {connectPath, myProfileViewPath, profileEditingPath} from 'constants/pathLocations';
import {useAppNavigation} from 'hooks/useAppNavigation';

import ConnectTabs from 'screens/App/Connect/ConnectTabs';

const MyProfileView = () => null;
const ProfileEditing = () => null;

const ConnectStackScreen = () => {
  const ConnectStack = createStackNavigator();

  const navigation = useAppNavigation();

  const goToConnect = (): void => {
    navigation.navigate('/connect');
  };

  return (
    <ConnectStack.Navigator initialRouteName={connectPath}>
      <ConnectStack.Screen
        key={connectPath}
        name={connectPath}
        component={ConnectTabs}
        options={{
          headerShown: true,
          header: () => <Header badge={true} logoType="logo" headerType="profile" />,
        }}
      />
      <ConnectStack.Screen
        key={myProfileViewPath}
        name={myProfileViewPath}
        component={MyProfileView}
        options={{
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={goToConnect}>
              <Edit style={{marginHorizontal: 12, marginVertical: 10}} />
            </TouchableOpacity>
          ),
          headerTitle: 'User profile',
          headerShown: true,
        }}
      />
      <ConnectStack.Screen
        key={profileEditingPath}
        name={profileEditingPath}
        component={ProfileEditing}
        options={{
          headerBackImage: () => <ArrowLeft style={{marginHorizontal: 12, marginVertical: 10}} />,
          headerBackTitleVisible: false,
          headerTitle: 'Profile editing',
          headerShown: true,
        }}
      />
    </ConnectStack.Navigator>
  );
};

export default ConnectStackScreen;
