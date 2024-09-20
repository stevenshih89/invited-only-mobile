import {create} from 'zustand';

export const useSubscriptions = create(set => ({
  currentSubscriptions: null,
  setCurrentSubscriptions: (state: any) => set(() => ({currentSubscriptions: state})),
}));
