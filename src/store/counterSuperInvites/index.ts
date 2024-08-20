import {create} from 'zustand';

export const useCounterSuperEvents = create(set => ({
  counterSuperInvites: 0,
  setCounterSuperInvites: (value: number) => set(() => ({ counterSuperInvites: value })),
  decrementCounterSuperInvites: (value: number) => set((state: { counterSuperInvites: number; }) => ({ counterSuperInvites: state.counterSuperInvites - value })),
}));