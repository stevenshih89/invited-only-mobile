import { FC, JSX } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree } from '@react-navigation/native';

import {
  addPhotosPath,
  confirmPhonePath,
  enterBirthdayPath,
  enterNamePath,
  pendingScreenPath,
  myEmailPath,
  myInterestsPath,
  onboardPath,
  privacyPath,
  signUpPath,
  signInPath,
  turnNotificationsPath,
  accountRejectedPath,
  codeVerifiedPath,
  verifyFirstStepPath,
  photoVerifiedPath,
  summaryInfoPath,
  eulaPath,
  onBoardingDemoPath,
  enterTypePath,
  welcomeScreenPath,
} from 'constants/pathLocations';
import Onboard from 'screens/Auth/Onboard/Onboard';
import SignUp from 'screens/Auth/SignUp/SignUp';
import SignIn from 'screens/Auth/SignIn/SignIn';

import TurnNotifications from 'screens/Auth/TurnNotifications/TurnNotifications';
import EnterName from 'screens/Auth/EnterName/EnterName';
import AddPhotos from 'screens/Auth/AddPhotos/AddPhotos';
import EnterBirthday from 'screens/Auth/EnterBirthday/EnterBirthday';
import MyInterests from 'screens/Auth/MyInterests/MyInterests';
import MyEmail from 'screens/Auth/MyEmail/MyEmail';
import Privacy from 'screens/Auth/Privacy/Privacy';
import PendingScreen from 'screens/Auth/AcceptedScreen/PendingScreen/PendingScreen.tsx';
import AccountRejected from 'screens/Auth/AcceptedScreen/AccountRejected/AccountRejected.tsx';
import CodeVerified from 'screens/Auth/AcceptedScreen/CodeVerified/CodeVerified.tsx';
import VerifyFirstStep from 'screens/Auth/VerifyFirstStep/VerifyFirstStep';
import PhotoVerified from 'screens/Auth/PhotoVerified/PhotoVerified';
import SummaryInfo from 'screens/Auth/SummaryInfo/SummaryInfo';
import Eula from 'screens/Auth/EulaScreen/EulaScreen';
import EnterTypeScreen from 'screens/Auth/EnterTypeScreen/EnterTypeScreen';
import DemoVideo from 'screens/Auth/DemoVide/DemoVideo';
import ConfirmPhone from 'screens/Auth/ConfirmPhone/ConfirmPhone';
import WelcomeScreen from 'screens/Auth/WelcomeScreen/WelcomeScreen';

const AuthStackScreens: FC = (): JSX.Element => {
  const AuthStack = createStackNavigator();

  return (
    <NavigationIndependentTree>
      <AuthStack.Navigator initialRouteName={onboardPath} screenOptions={{ headerShown: false, freezeOnBlur: true, unmountOnBlur: false }}>
        <AuthStack.Screen key={onboardPath} name={onboardPath} component={Onboard} />
        <AuthStack.Screen key={eulaPath} name={eulaPath} component={Eula} />
        <AuthStack.Screen key={enterTypePath} name={enterTypePath} component={EnterTypeScreen} />
        <AuthStack.Screen key={onBoardingDemoPath} name={onBoardingDemoPath} component={DemoVideo} />
        <AuthStack.Screen key={signUpPath} name={signUpPath} component={SignUp} />
        <AuthStack.Screen key={signInPath} name={signInPath} component={SignIn} />
        <AuthStack.Screen key={confirmPhonePath} name={confirmPhonePath} component={ConfirmPhone} />
        <AuthStack.Screen key={turnNotificationsPath} name={turnNotificationsPath} component={TurnNotifications} />
        <AuthStack.Screen key={enterNamePath} name={enterNamePath} component={EnterName} />
        <AuthStack.Screen key={addPhotosPath} name={addPhotosPath} component={AddPhotos} />
        <AuthStack.Screen key={enterBirthdayPath} name={enterBirthdayPath} component={EnterBirthday} />
        <AuthStack.Screen key={myInterestsPath} name={myInterestsPath} component={MyInterests} />
        <AuthStack.Screen key={myEmailPath} name={myEmailPath} component={MyEmail} />
        <AuthStack.Screen key={privacyPath} name={privacyPath} component={Privacy} />
        <AuthStack.Screen key={pendingScreenPath} name={pendingScreenPath} component={PendingScreen} />
        <AuthStack.Screen key={accountRejectedPath} name={accountRejectedPath} component={AccountRejected} />
        <AuthStack.Screen key={codeVerifiedPath} name={codeVerifiedPath} component={CodeVerified} />
        <AuthStack.Screen key={welcomeScreenPath} name={welcomeScreenPath} component={WelcomeScreen} />
        <AuthStack.Screen key={verifyFirstStepPath} name={verifyFirstStepPath} component={VerifyFirstStep} />
        <AuthStack.Screen key={photoVerifiedPath} name={photoVerifiedPath} component={PhotoVerified} />
        <AuthStack.Screen key={summaryInfoPath} name={summaryInfoPath} component={SummaryInfo} />
      </AuthStack.Navigator>
    </NavigationIndependentTree>
  );
};

export default AuthStackScreens;
