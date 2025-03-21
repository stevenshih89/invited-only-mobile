export namespace User {
  export interface Languages {
    flag: string;
    id: string;
    title: string;
  }
  export interface Smoke {
    id: number;
    title: string;
  }

  export interface Work {
    title: string;
    description: string;
  }

  export interface Notification {
    body: string;
    id: string;
    mark: string;
    title: string;
    uid: string;
  }

  export interface NotificationSettings {
    superJoin?: boolean;
    superInvite?: boolean;
    match?: boolean;
  }

  export interface SocialNickname {
    [key: string]: string;
  }

  export type AccountType = 'host' | 'guest';
  export type ChooseGuest = 'woman' | 'man' | 'any';
  export type Gender = 'man' | 'woman' | 'any';
  export interface Info {
    id: string;
    accountConfirmed: boolean;
    accountPremium: boolean;
    accountReviewed: boolean;
    accountType: AccountType;
    chooseGuest: ChooseGuest;
    alcohol?: string;
    address?: string;
    date: string;
    email: string;
    facePhoto: string | null;
    fcmToken: string;
    gender: Gender;
    imageUser: string | null;
    lastUpdateSuperInvite: number;
    name: string;
    location: string | null;
    phoneNumber: string;
    registrationDate: string;
    showAge: boolean;
    showLocation: boolean;
    superInvites: number;
    uid: string;
    weeklySuperInvites: number;
    bio?: string;
    height?: string;
    homeAddress?: string;
    showAlcohol?: boolean;
    showGender?: boolean;
    showHeight?: boolean;
    showHomeAddress?: boolean;
    showLanguages?: boolean;
    showSmoke?: boolean;
    showWork?: boolean;
    online: boolean;
    userBeauty?: number;
    isPassedDemo?: boolean;
    isInvitedOnlyAdmin?: boolean;
  }

  export interface Photo {
    id: number;
    image: string | null;
  }

  export interface Interests {
    id: number;
    title: string | null;
  }
}

export interface UserInfo extends User.Info {
  interests: User.Interests[];
  photos: User.Photo[];
  smoke?: User.Smoke;
  work?: User.Work;
  languges?: User.Languages[];
  socialNickname: User.SocialNickname;
  notificationSettings: User.NotificationSettings;
  joinEvents: number;
}
