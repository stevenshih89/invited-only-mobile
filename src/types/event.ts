export namespace Event {
  export interface Photo {
    id: number;
    image: string;
  }

  export type UserStatus = 'accepted' | 'notAccepted' | 'invite_match' | 'approved' | 'liked' | 'cancel';
  export type Gender = 'man' | 'woman' | 'any';
  export interface User {
    uid: string;
    name: string;
    gender: Gender;
    status: UserStatus;
    superInvite: boolean;
    userPhoto: string;
  }
  export interface RejectUser {
    uid: string;
  }
  export interface Info {
    uid: string;
    id: string;
    name: string;
    placeName: string;
    address: string;
    date: string;
    hour: string;
    description: string;
    meetingSpot: string;
    activeType: number;
    eventReviewed: boolean;
    isCancelled: boolean;
    statusEvent: boolean;
    hostName: string;
    hostImage: string;
    hostFcmToken: string;
    male: number;
    maleFriend: number;
    female: number;
    femaleFriend: number;
  }
}

export interface EventData extends Event.Info {
  photos: Event.Photo[];
  rejectsList: Event.RejectUser[];
  requestsList: Event.User[];
  usersList: Event.User[];
}
