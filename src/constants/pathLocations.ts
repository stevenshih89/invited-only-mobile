import { RootStackParamList } from 'typescript/types';
// Stacks paths
const bottomTabsStackPath = '/bottom-tabs-stack';
const notificationsStackPath = '/notifications-stack';
const eventCreatingStackPath = '/event-creating-stack';
const eventRequestStackPath = '/events/requests';
const commonStackPath = '/common-stack';

const demoFlowStackPath = '/demo-flow-stack';

// Screen paths
const onboardPath: keyof RootStackParamList = '/onboard';
const eulaPath: keyof RootStackParamList = '/eula';
const signUpPath: keyof RootStackParamList = '/sign-up';
const signInPath: keyof RootStackParamList = '/sign-in';
const enterTypePath: keyof RootStackParamList = '/choose-enter-type';
const onBoardingDemoPath: keyof RootStackParamList = '/onboarding-demo-path';
const confirmPhonePath: keyof RootStackParamList = '/confirm-phone';
const turnNotificationsPath: keyof RootStackParamList = '/turn-notifications';
const chooseAccountTypePath: keyof RootStackParamList = '/choose-account-type';
const enterNamePath: keyof RootStackParamList = '/enter-name';
const addPhotosPath: keyof RootStackParamList = '/add-photos';
const enterBirthdayPath: keyof RootStackParamList = '/enter-birthday';
const genderPath: keyof RootStackParamList = '/gender';
const myInterestsPath: keyof RootStackParamList = '/my-interests';
const myEmailPath: keyof RootStackParamList = '/my-email';
const connectPath: keyof RootStackParamList = '/connect';
const findConnectionsPath: keyof RootStackParamList = '/find-connections';
const myConnectionsPath: keyof RootStackParamList = '/my-connections';
const connectSocialMediaPath: keyof RootStackParamList = '/connect-social-media';
const privacyPath: keyof RootStackParamList = '/privacy';
const pendingScreenPath: keyof RootStackParamList = '/pending-screen';
const accountRejectedPath: keyof RootStackParamList = '/account-rejected';
const codeVerifiedPath: keyof RootStackParamList = '/code-verified';
const verifyFirstStepPath: keyof RootStackParamList = '/verify-first-step';
const verifySecondStepPath: keyof RootStackParamList = '/verify-second-step';
const invitationCodePath: keyof RootStackParamList = '/invitation-code';
const paymentPath: keyof RootStackParamList = '/profile/payment';
const manageSubscriptionPath: keyof RootStackParamList = '/profile/manage-subscription';
const tutorialFlowPath: keyof RootStackParamList = '/tutorial-flow';
const IOPath: keyof RootStackParamList = '/io';
const joinEventsPath: keyof RootStackParamList = '/join-events';
const notificationsPath: keyof RootStackParamList = '/notifications';
const requestsPath: keyof RootStackParamList = '/requests';
const myProfileViewPath: keyof RootStackParamList = '/my-profile-view';
const profileEditingPath: keyof RootStackParamList = '/profile/profile-editing';
const myEventsPath: keyof RootStackParamList = '/my-events';
const manageEventPath: keyof RootStackParamList = '/events/manage-event';
const profilePath: keyof RootStackParamList = '/profile';
const invitationsPath: keyof RootStackParamList = '/profile/invitations';
const myPlanPath: keyof RootStackParamList = '/profile/my-plan';
const faqPath: keyof RootStackParamList = '/profile/faq';
const helpAndSecurityPath: keyof RootStackParamList = '/profile/help-and-security';
const notificationSettingPath: keyof RootStackParamList = '/profile/notification-setting';
const loadingPaymentPath: keyof RootStackParamList = '/profile/loading-payment';
const welcomeToPremiumPath: keyof RootStackParamList = '/profile/welcome-to-premium';
const superInvitePath: keyof RootStackParamList = '/profile/super-invite';
const superJoinPath: keyof RootStackParamList = '/profile/super-join';
const chatPath: keyof RootStackParamList = '/chat';
const chatWindowPath: keyof RootStackParamList = '/chat/chat-window';
const chatCorrespondencePath: keyof RootStackParamList = '/chat-correspondence';
const adminChatPath: keyof RootStackParamList = '/admin-chat';
const userProfilePath: keyof RootStackParamList = '/user-profile';
const eventInfoPath: keyof RootStackParamList = '/event-info';
const eventActiveInfoPath: keyof RootStackParamList = '/event-active-info';
const eventEditingPath: keyof RootStackParamList = '/event-editing';
const accountSettingPath: keyof RootStackParamList = '/account-setting';
const securePrivacyPath: keyof RootStackParamList = '/secure-privacy';
const phoneChangePath: keyof RootStackParamList = '/phone-change';
const photoVerifiedPath: keyof RootStackParamList = '/photo-verified';
const summaryInfoPath: keyof RootStackParamList = '/summary-info';
const verifySocialProfilePath: keyof RootStackParamList = '/verify-social-profile';
const checkingSpots: keyof RootStackParamList = '/checking-spots';
const superInvitePayPath: keyof RootStackParamList = '/super-invite-pay';
const addBuisnessPath: keyof RootStackParamList = '/add-biusness';
const joinEventsPathRequest: keyof RootStackParamList = '/join-event-request';
const earlyAccessPath: keyof RootStackParamList = '/early-access';
const markAttendancePath: keyof RootStackParamList = '/mark-attendance';
const underMaintenance: keyof RootStackParamList = '/under-maintenance';
const updateAvailable: keyof RootStackParamList = '/update-available';
const profileStackPath: keyof RootStackParamList = '/profile/profile-stack';
const demoIntroPath: keyof RootStackParamList = '/demo-intro';
const demoEventCreatingPath: keyof RootStackParamList = '/demo-event-creating';
const shareSocialLinkPath: keyof RootStackParamList = '/share-social-link';

const demoIOPath: keyof RootStackParamList = '/demo-io';

export {
  bottomTabsStackPath,
  notificationsStackPath,
  userProfilePath,
  commonStackPath,
  onboardPath,
  joinEventsPath,
  enterTypePath,
  onBoardingDemoPath,
  signUpPath,
  signInPath,
  confirmPhonePath,
  turnNotificationsPath,
  securePrivacyPath,
  chooseAccountTypePath,
  enterNamePath,
  addPhotosPath,
  enterBirthdayPath,
  genderPath,
  myInterestsPath,
  myEmailPath,
  connectSocialMediaPath,
  connectPath,
  privacyPath,
  pendingScreenPath,
  accountRejectedPath,
  codeVerifiedPath,
  verifyFirstStepPath,
  verifySecondStepPath,
  invitationCodePath,
  paymentPath,
  tutorialFlowPath,
  IOPath,
  notificationsPath,
  eventCreatingStackPath,
  profilePath,
  myProfileViewPath,
  profileEditingPath,
  requestsPath,
  myEventsPath,
  manageEventPath,
  chatPath,
  chatCorrespondencePath,
  eventInfoPath,
  eventActiveInfoPath,
  eventEditingPath,
  accountSettingPath,
  phoneChangePath,
  notificationSettingPath,
  photoVerifiedPath,
  summaryInfoPath,
  verifySocialProfilePath,
  checkingSpots,
  superInvitePayPath,
  addBuisnessPath,
  joinEventsPathRequest,
  manageSubscriptionPath,
  eulaPath,
  earlyAccessPath,
  markAttendancePath,
  demoFlowStackPath,
  demoIntroPath,
  demoEventCreatingPath,
  demoIOPath,
  adminChatPath,
  underMaintenance,
  updateAvailable,
  findConnectionsPath,
  myConnectionsPath,
  invitationsPath,
  myPlanPath,
  faqPath,
  helpAndSecurityPath,
  eventRequestStackPath,
  chatWindowPath,
  profileStackPath,
  shareSocialLinkPath,
  loadingPaymentPath,
  welcomeToPremiumPath,
  superInvitePath,
  superJoinPath,
};
