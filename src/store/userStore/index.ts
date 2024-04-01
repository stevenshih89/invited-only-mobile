import {create} from 'zustand';

export const useUser = create(set => ({
  onBoarding: false,
  user: [],
  setOnBoarding: (state: any) => set(() => ({onBoarding: state})),
  setUser: (state: any) => set(() => ({user: state})),
}));
