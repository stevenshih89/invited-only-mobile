import {create} from 'zustand';

export const useScrollPosition = create(set => ({
  scrollPosition: 0,
  setScrollPosition: (data: any) => set(() => ({scrollPosition: data})),
}));
