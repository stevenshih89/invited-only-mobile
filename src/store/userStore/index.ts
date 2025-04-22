import { create } from 'zustand';
import { UserInfo } from 'src/types/userInfo';

interface IUserStore {
  onBoarding: boolean;
  premium: boolean;
  user: UserInfo;
  email: string;
  setOnBoarding: (state: boolean) => void;
  setPremium: (state: boolean) => void;
  setUser: (state: UserInfo) => void;
  setEmail: (email: string) => void;
}

export const useUser = create<IUserStore>(set => ({
  onBoarding: false,
  premium: false,
  user: {} as UserInfo,
  email: '',
  setOnBoarding: (state: boolean) => set(() => ({ onBoarding: state })),
  setPremium: (state: boolean) => set(() => ({ premium: state })),
  setUser: (state: UserInfo) => set(() => ({ user: state })),
  setEmail: (email: string) => set(() => ({ email })),
}));
