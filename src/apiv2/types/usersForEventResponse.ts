export type GetUsersForEventResponse = {
  users: User[];
  lastDoc: string | null;
  endReached: boolean;
};

type InviteCode = {
  inviteCode: string;
  isActive: boolean;
};

type NotificationSettings = {
  chat: boolean;
  joinedEvent: boolean;
  match: boolean;
  myEvents: boolean;
  requests: boolean;
  superInvite: boolean;
  superJoin: boolean;
};

type SocialNickname = {
  instagram?: string;
  tiktok?: string;
};

type Language = {
  id: string;
  title: string;
  flag: string;
};

type Photo = {
  id: number;
  image: string;
};

type Interest = {
  id: number;
  title: string;
};

type Work = {
  title: string;
  description: string;
};

type ActiveSubscription = {
  expirationDate: string;
  subscriptionId: string;
};

type User = {
  uid: string;
  name: string;
  email: string;
  phoneNumber: string;
  date: string;
  createdAt: string;
  registrationDate: string;
  accountType: string;
  accountConfirmed: boolean;
  accountReviewed: boolean;
  accountPremium: boolean;
  chooseGuest: string;
  facePhoto: string;
  gender: string;
  showAge: boolean;
  showGender: boolean;
  showLocation: boolean;
  showHomeAddress: boolean;
  showLanguages: boolean;
  showSmoke: boolean;
  showAlcohol: boolean;
  showWork: boolean;
  showHeight: boolean;
  showModalAccept: boolean;
  bio: string;
  location: string | null;
  homeAddress?: string;
  height: number | null;
  smoke: boolean | null;
  alcohol: boolean | null;
  weeklySuperInvites: number;
  superInvites: number;
  userBeauty: number;
  online: boolean;
  fcmToken: string;
  codeForInvitingOtherUsers: InviteCode[];
  notificationSettings: NotificationSettings;
  socialNickname: SocialNickname;
  languages?: Language[];
  photos: Photo[];
  interests: Interest[];
  activeSubscription: ActiveSubscription;
  lastUpdateSuperInvite: number;
  invitationCode?: string;
  eventsListVisit?: string[];
};
