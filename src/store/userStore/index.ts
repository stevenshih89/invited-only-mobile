import {create} from 'zustand';

export const useUser = create(set => ({
  onBoarding: false,
  setOnBoarding: (state: any) => set(() => ({onBoarding: state})),
}));
