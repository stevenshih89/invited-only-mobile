import {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  addPhotosPath,
  chooseAccountTypePath,
  confirmPhonePath,
  connectSocialMediaPath,
  enterBirthdayPath,
  enterNamePath,
  genderPath,
  genderPreferencesPath,
  pendingScreenPath,
  invitationCodePath,
  myEmailPath,
  myInterestsPath,
  onboardPath,
  privacyPath,
  signUpPath,
  turnNotificationsPath,
  accountRejectedPath,
  codeVerifiedPath,
  verifyFirstStepPath,
  verifySecondStepPath,
} from 'constants/pathLocations';
import {NavigationContainer} from '@react-navigation/native';
import Onboard from 'screens/Auth/Onboard';
import SignUp from 'screens/Auth/SignUp';
import ConfirmPhone from 'screens/Auth/ConfirmPhone';
import TurnNotifications from 'screens/Auth/TurnNotifications';
import ChooseAccountType from 'screens/Auth/ChooseAccountType';
import EnterName from 'screens/Auth/EnterName';
import AddPhotos from 'screens/Auth/AddPhotos';
import EnterBirthday from 'screens/Auth/EnterBirthday';
import Gender from 'screens/Auth/Gender';
import GenderPreferences from 'screens/Auth/GenderPreferences';
import MyInterests from 'screens/Auth/MyInterests';
import MyEmail from 'screens/Auth/MyEmail';
import ConnectSocialMedia from 'screens/Auth/ConnectSocialMedia';
import Privacy from 'screens/Auth/Privacy';
import PendingScreen from 'screens/Auth/AcceptedScreen/PendingScreen/PendingScreen.tsx';
import AccountRejected from 'screens/Auth/AcceptedScreen/AccountRejected/AccountRejected.tsx';
import CodeVerified from 'screens/Auth/AcceptedScreen/CodeVerified/CodeVerified.tsx';
import VerifyFirstStep from 'screens/Auth/VerifyFirstStep';
import VerifySecondStep from 'screens/Auth/VerifySecondStep';
import InvitationCode from 'screens/Auth/InvitationCode';

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
        <AuthStack.Screen key={enterBirthdayPath} name={enterBirthdayPath} component={EnterBirthday} />
        <AuthStack.Screen key={genderPath} name={genderPath} component={Gender} />
        <AuthStack.Screen key={genderPreferencesPath} name={genderPreferencesPath} component={GenderPreferences} />
        <AuthStack.Screen key={myInterestsPath} name={myInterestsPath} component={MyInterests} />
        <AuthStack.Screen key={myEmailPath} name={myEmailPath} component={MyEmail} />
        <AuthStack.Screen key={connectSocialMediaPath} name={connectSocialMediaPath} component={ConnectSocialMedia} />
        <AuthStack.Screen key={privacyPath} name={privacyPath} component={Privacy} />
        <AuthStack.Screen key={pendingScreenPath} name={pendingScreenPath} component={PendingScreen} />
        <AuthStack.Screen key={accountRejectedPath} name={accountRejectedPath} component={AccountRejected} />
        <AuthStack.Screen key={codeVerifiedPath} name={codeVerifiedPath} component={CodeVerified} />
        <AuthStack.Screen key={verifyFirstStepPath} name={verifyFirstStepPath} component={VerifyFirstStep} />
        <AuthStack.Screen key={verifySecondStepPath} name={verifySecondStepPath} component={VerifySecondStep} />
        <AuthStack.Screen key={invitationCodePath} name={invitationCodePath} component={InvitationCode} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStackScreens;
