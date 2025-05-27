import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import HeaderBackButton from '../../Components/HeaderBackButton/HeaderBackButton';
import HeaderRightProfileEditing from './Components/HeaderRightProfileEditing/HeaderRightProfileEditing';
import { blackColor, whiteColor } from 'constants/colors';
import { Satoshi400 } from 'constants/fonts';
import {
  accountSettingPath,
  faqPath,
  helpAndSecurityPath,
  invitationsPath,
  myPlanPath,
  myProfileViewPath,
  notificationSettingPath,
  profileEditingPath,
  profilePath,
  superInvitePath,
  superJoinPath,
} from 'constants/pathLocations';
import Profile from 'screens/App/Profile/Profile';
import AccountSetting from 'screens/App/Profile/screens/AccountSetting/AccountSetting';
import FAQ from 'screens/App/Profile/screens/FAQ/FAQ';
import HelpAndSecurity from 'screens/App/Profile/screens/HelpAndSecurity/HelpAndSecurity';
import Invitations from 'screens/App/Profile/screens/Invitations/Invitations';
import MyPlan from 'screens/App/Profile/screens/MyPlan/MyPlan';
import MyProfileView from 'screens/App/Profile/screens/MyProfileView/MyProfileView';
import ProfileEditing from 'screens/App/Profile/screens/ProfileEditing/ProfileEditing';
import NotificationSetting from 'screens/App/Profile/screens/NotificationSetting/NotificationSetting';
import SuperJoin from 'screens/App/Profile/screens/SuperJoin/SuperJoin';
import SuperInvite from 'screens/App/Profile/screens/SuperInvite/SuperInvite';
import Payment from 'screens/App/Payment/Payment';

export const ProfileStackScreen = () => {
  const ProfileStack = createStackNavigator();

  const defaultOptions = {
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
    headerBackTitleVisible: false,
    headerShown: true,
    headerBackImage: () => <HeaderBackButton />,
  };

  return (
    <ProfileStack.Navigator initialRouteName={profilePath}>
      <ProfileStack.Screen
        key={profilePath}
        name={profilePath}
        component={Profile}
        options={{
          ...defaultOptions,
          headerTitle: 'Profile',
        }}
      />
      <ProfileStack.Screen
        key={myProfileViewPath}
        name={myProfileViewPath}
        component={MyProfileView}
        options={{
          ...defaultOptions,
          headerTitle: 'Preview',
        }}
      />
      <ProfileStack.Screen
        key={invitationsPath}
        name={invitationsPath}
        component={Invitations}
        options={{
          ...defaultOptions,
          headerTitle: 'Invitations',
        }}
      />
      <ProfileStack.Screen
        key={myPlanPath}
        name={myPlanPath}
        component={Payment}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        key={notificationSettingPath}
        name={notificationSettingPath}
        options={{
          ...defaultOptions,
          headerTitle: 'Notification setting',
        }}
        component={NotificationSetting}
      />
      <ProfileStack.Screen
        key={faqPath}
        name={faqPath}
        options={{
          ...defaultOptions,
          headerTitle: 'FAQs',
        }}
        component={FAQ}
      />
      <ProfileStack.Screen
        key={helpAndSecurityPath}
        name={helpAndSecurityPath}
        options={{
          ...defaultOptions,
          headerTitle: 'Help & Security',
        }}
        component={HelpAndSecurity}
      />
      <ProfileStack.Screen
        key={profileEditingPath}
        name={profileEditingPath}
        component={ProfileEditing}
        options={{
          ...defaultOptions,
          headerRight: () => <HeaderRightProfileEditing />,
          headerTitle: 'Edit profile',
        }}
      />
      <ProfileStack.Screen
        key={accountSettingPath}
        name={accountSettingPath}
        options={{
          ...defaultOptions,
          headerTitle: 'Account setting',
        }}
        component={AccountSetting}
      />

      <ProfileStack.Screen
        key={superInvitePath}
        name={superInvitePath}
        options={{
          ...defaultOptions,
          headerShown: false,
        }}
        component={SuperInvite}
      />
      <ProfileStack.Screen
        key={superJoinPath}
        name={superJoinPath}
        options={{
          ...defaultOptions,
          headerShown: false,
        }}
        component={SuperJoin}
      />
    </ProfileStack.Navigator>
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
  headerTitleStyle: {
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(24, 812),
  },
});
