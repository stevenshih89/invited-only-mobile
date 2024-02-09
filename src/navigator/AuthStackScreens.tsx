import {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  addPhotosPath,
  chooseAccountTypePath,
  confirmPhonePath,
  enterNamePath,
  onboardPath,
  signUpPath,
  turnNotificationsPath,
} from 'constants/pathLocations';
import {NavigationContainer} from '@react-navigation/native';
import Onboard from 'screens/Auth/Onboard';
import SignUp from 'screens/Auth/SignUp';
import ConfirmPhone from 'screens/Auth/ConfirmPhone';
import TurnNotifications from 'screens/Auth/TurnNotifications';
import ChooseAccountType from 'screens/Auth/ChooseAccountType';
import EnterName from 'screens/Auth/EnterName';
import AddPhotos from 'screens/Auth/AddPhotos';

const AuthStackScreens: FC = (): JSX.Element => {
  const AuthStack = createStackNavigator();

  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName={onboardPath} screenOptions={{headerShown: false}}>
        <AuthStack.Screen key={onboardPath} name={onboardPath} component={Onboard} />
        <AuthStack.Screen key={signUpPath} name={signUpPath} component={SignUp} />
        <AuthStack.Screen key={confirmPhonePath} name={confirmPhonePath} component={ConfirmPhone} />
        <AuthStack.Screen key={turnNotificationsPath} name={turnNotificationsPath} component={TurnNotifications} />
        <AuthStack.Screen key={chooseAccountTypePath} name={chooseAccountTypePath} component={ChooseAccountType} />
        <AuthStack.Screen key={enterNamePath} name={enterNamePath} component={EnterName} />
        <AuthStack.Screen key={addPhotosPath} name={addPhotosPath} component={AddPhotos} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStackScreens;
