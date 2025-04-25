import {components} from 'src/api/v1';

export type RootStackParamList = {
  '/bottom-tabs-stack': undefined;
  '/my-events'?: {
    screen?: string;
  };
  '/notifications-stack'?: {
    screen?: string;
  };
  '/event-creating-stack'?: {
    screen?: string;
  };
  '/events/requests'?: {
    screen?: string;
  };
  '/chat/chat-window'?: {
    chat: components['schemas']['Chat'];
  };
  '/common-stack'?: {
    screen?: string;
    params?: any;
  };
  '/demo-flow-stack'?: {
    screen?: string;
    params?: any;
  };
  '/onboard'?: undefined;
  '/sign-up'?: {
    isLogin?: boolean;
  };
  '/sign-in'?: undefined;
  '/choose-enter-type': undefined;
  '/onboarding-demo-path'?: {
    isHost: boolean;
  };
  '/start-create-account': undefined;
  '/eula': undefined;
  '/confirm-phone'?: {
    isLogin: boolean;
    mobilePhone: string;
  };
  '/email-change': undefined;
  '/under-maintenance': undefined;
  '/update-available': undefined;
  '/turn-notifications': undefined;
  '/choose-account-type': undefined;
  '/enter-name': undefined;
  '/add-photos': undefined;
  '/enter-birthday': undefined;
  '/gender': undefined;
  '/gender-preferences': undefined;
  '/my-interests': undefined;
  '/my-email': undefined;
  '/connect-social-media': undefined;
  '/connect'?: undefined;
  '/find-connections': any;
  '/my-connections': undefined;
  '/privacy': undefined;
  '/pending-screen': undefined;
  '/account-rejected': undefined;
  '/code-verified': undefined;
  '/verify-first-step': undefined;
  '/verify-second-step': undefined;
  '/invitation-code': {cameFromSummary: boolean};

  '/tutorial-flow': undefined;
  '/io': undefined;
  '/join-events': undefined;
  '/notifications': undefined;
  '/requests': undefined;
  '/profile': undefined;
  '/my-profile-view': undefined;
  '/chat': undefined;
  '/chat-correspondence': undefined;
  '/user-profile': undefined;
  '/event-info': undefined;
  '/event-active-info': undefined;
  '/super-invite-pay': undefined;
  '/add-biusness': undefined;
  '/join-event-request': undefined;
  '/event-editing': {
    isEditing?: boolean;
  };
  '/account-setting': undefined;
  '/secure-privacy': undefined;
  '/phone-change': undefined;
  '/contact-and-faq': undefined;
  '/photo-verified': undefined;
  '/summary-info': undefined;
  '/verify-social-profile': undefined;
  '/checking-spots': undefined;
  '/early-access': undefined;
  '/demo-intro': undefined;
  '/demo-event-creating': undefined;
  '/demo-io': undefined;
  '/mark-attendance': {
    eventId?: string;
  };
  '/admin-chat': {
    chatId?: string;
  };
  '/share-social-link': undefined;
  '/profile/settings': undefined;
  '/profile/notification-setting': undefined;
  '/profile/invitations': undefined;
  '/profile/my-plan': undefined;
  '/profile/profile-editing': undefined;
  '/profile/faq': undefined;
  '/profile/help-and-security': undefined;
  '/profile/profile-stack': undefined;
  '/profile/manage-subscription-stack': undefined;
  '/profile/manage-subscription': undefined;
  '/profile/payment': undefined;
};
