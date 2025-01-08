import {create} from 'zustand';

interface IDemoFlowStore {
  hintStep: number;
  event: any;
  isVisibleSwipeGuide: boolean;
  setEvent: (event: any) => void;
  setHintStep: (value: number) => void;
  setIsVisibleSwipeGuide: (value: boolean) => void;
}

export const useDemoFlowStore = create<IDemoFlowStore>(set => ({
  hintStep: 1,
  event: {},
  isVisibleSwipeGuide: true,
  setEvent: (event: any) => set(() => ({event: event})),
  setHintStep: (value: number) => set(() => ({hintStep: value})),
  setIsVisibleSwipeGuide: (value: boolean) => set(() => ({isVisibleSwipeGuide: value})),
}));
