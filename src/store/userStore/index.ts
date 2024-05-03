import {create} from 'zustand';

export const useUser = create(set => ({
  onBoarding: false,
  premium: false,
  user: [],
  setOnBoarding: (state: any) => set(() => ({onBoarding: state})),
  setPremium: (state: any) => set(() => ({premium: state})),
  setUser: (state: any) => set(() => ({user: state})),
}));
