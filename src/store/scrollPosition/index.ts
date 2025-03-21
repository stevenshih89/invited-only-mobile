import {create} from 'zustand';

interface ScrollPositionState {
  scrollPosition: number;
  setScrollPosition: (data: number) => void;
}

export const useScrollPosition = create<ScrollPositionState>(set => ({
  scrollPosition: 0,
  setScrollPosition: (data: number) => set(() => ({scrollPosition: data})),
}));
