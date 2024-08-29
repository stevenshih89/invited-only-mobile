import {create} from 'zustand';

export const useUser = create(set => ({
  onBoarding: false,
  premium: false,
  user: [],
  email: '',
  setOnBoarding: (state: any) => set(() => ({onBoarding: state})),
  setPremium: (state: any) => set(() => ({premium: state})),
  setUser: (state: any) => set(() => ({user: state})),
  setEmail: (email: string) => set(() => ({ email })),
}));
