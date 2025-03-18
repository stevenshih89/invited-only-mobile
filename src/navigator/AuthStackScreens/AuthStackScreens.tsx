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
  paymentPath,
  tutorialFlowPath,
  photoVerifiedPath,
  summaryInfoPath,
  verifySocialProfilePath,
  checkingSpots,
  addBuisnessPath,
  eulaPath,
  enterTypePath,
  onBoardingDemoPath,
} from 'constants/pathLocations';
import {NavigationContainer} from '@react-navigation/native';
import Onboard from 'screens/Auth/Onboard/Onboard';
import SignUp from 'screens/Auth/SignUp/SignUp';
import ConfirmPhone from 'screens/Auth/ConfirmPhone/ConfirmPhone';
import TurnNotifications from 'screens/Auth/TurnNotifications/TurnNotifications';
import ChooseAccountType from 'screens/Auth/ChooseAccountType/ChooseAccountType';
import EnterName from 'screens/Auth/EnterName/EnterName';
import AddPhotos from 'screens/Auth/AddPhotos/AddPhotos';
import EnterBirthday from 'screens/Auth/EnterBirthday/EnterBirthday';
import Gender from 'screens/Auth/Gender/Gender';
import MyInterests from 'screens/Auth/MyInterests/MyInterests';
import MyEmail from 'screens/Auth/MyEmail/MyEmail';
import ConnectSocialMedia from 'screens/Auth/ConnectSocialMedia/ConnectSocialMedia';
import Privacy from 'screens/Auth/Privacy/Privacy';
import PendingScreen from 'screens/Auth/AcceptedScreen/PendingScreen/PendingScreen.tsx';
import AccountRejected from 'screens/Auth/AcceptedScreen/AccountRejected/AccountRejected.tsx';
import CodeVerified from 'screens/Auth/AcceptedScreen/CodeVerified/CodeVerified.tsx';
import VerifyFirstStep from 'screens/Auth/VerifyFirstStep/VerifyFirstStep';
import InvitationCode from 'screens/Auth/InvitationCode/InvitationCode';
import Payment from 'screens/Auth/Payment/Payment.tsx';
import TutorialsFlow from 'screens/Auth/TutorialsFlow/TutorialsFlow.tsx';
import PhotoVerified from 'screens/Auth/PhotoVerified/PhotoVerified';
import SummaryInfo from 'screens/Auth/SummaryInfo/SummaryInfo';
import VerifySocialProfile from 'screens/Auth/VerifySocialProfile/VerifySocialProfile';
import {CheckingSpots} from 'screens/Auth/Payment/CheckingSpots';
import AddBiusness from 'screens/Auth/AddBuisness/AddBuisness';
import Eula from 'screens/Auth/EulaScreen/EulaScreen';
import EnterTypeScreen from 'screens/Auth/EnterTypeScreen/EnterTypeScreen';
import DemoVideo from 'screens/Auth/DemoVide/DemoVideo';

const AuthStackScreens: FC = (): JSX.Element => {
  const AuthStack = createStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <AuthStack.Navigator initialRouteName={onboardPath} screenOptions={{headerShown: false}}>
        <AuthStack.Screen key={onboardPath} name={onboardPath} component={Onboard} />
        <AuthStack.Screen key={eulaPath} name={eulaPath} component={Eula} />
        <AuthStack.Screen key={enterTypePath} name={enterTypePath} component={EnterTypeScreen} />
        <AuthStack.Screen key={onBoardingDemoPath} name={onBoardingDemoPath} component={DemoVideo} />
        <AuthStack.Screen key={signUpPath} name={signUpPath} component={SignUp} />
        <AuthStack.Screen key={confirmPhonePath} name={confirmPhonePath} component={ConfirmPhone} />
        <AuthStack.Screen key={turnNotificationsPath} name={turnNotificationsPath} component={TurnNotifications} />
        <AuthStack.Screen key={chooseAccountTypePath} name={chooseAccountTypePath} component={ChooseAccountType} />
        <AuthStack.Screen key={addBuisnessPath} name={addBuisnessPath} component={AddBiusness} />
        <AuthStack.Screen key={enterNamePath} name={enterNamePath} component={EnterName} />
        <AuthStack.Screen key={addPhotosPath} name={addPhotosPath} component={AddPhotos} />
        <AuthStack.Screen key={enterBirthdayPath} name={enterBirthdayPath} component={EnterBirthday} />
        <AuthStack.Screen key={genderPath} name={genderPath} component={Gender} />
        <AuthStack.Screen key={myInterestsPath} name={myInterestsPath} component={MyInterests} />
        <AuthStack.Screen key={myEmailPath} name={myEmailPath} component={MyEmail} />
        <AuthStack.Screen key={connectSocialMediaPath} name={connectSocialMediaPath} component={ConnectSocialMedia} />
        <AuthStack.Screen key={privacyPath} name={privacyPath} component={Privacy} />
        <AuthStack.Screen key={pendingScreenPath} name={pendingScreenPath} component={PendingScreen} />
        <AuthStack.Screen key={accountRejectedPath} name={accountRejectedPath} component={AccountRejected} />
        <AuthStack.Screen key={codeVerifiedPath} name={codeVerifiedPath} component={CodeVerified} />
        <AuthStack.Screen key={verifyFirstStepPath} name={verifyFirstStepPath} component={VerifyFirstStep} />
        <AuthStack.Screen key={invitationCodePath} name={invitationCodePath} component={InvitationCode} />
        <AuthStack.Screen key={paymentPath} name={paymentPath} component={Payment} />
        <AuthStack.Screen key={tutorialFlowPath} name={tutorialFlowPath} component={TutorialsFlow} />
        <AuthStack.Screen key={photoVerifiedPath} name={photoVerifiedPath} component={PhotoVerified} />
        <AuthStack.Screen key={summaryInfoPath} name={summaryInfoPath} component={SummaryInfo} />
        <AuthStack.Screen key={verifySocialProfilePath} name={verifySocialProfilePath} component={VerifySocialProfile} />
        <AuthStack.Screen key={checkingSpots} name={checkingSpots} component={CheckingSpots} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStackScreens;
