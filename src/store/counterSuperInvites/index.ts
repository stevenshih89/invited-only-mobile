import {create} from 'zustand';

interface CounterSuperEventsState {
  counterSuperInvites: number;
  setCounterSuperInvites: (value: number) => void;
  decrementCounterSuperInvites: (value: number) => void;
}

export const useCounterSuperEvents = create<CounterSuperEventsState>(set => ({
  counterSuperInvites: 0,
  setCounterSuperInvites: (value: number) => set(() => ({counterSuperInvites: value})),
  decrementCounterSuperInvites: (value: number) =>
    set((state: CounterSuperEventsState) => ({counterSuperInvites: state.counterSuperInvites - value})),
}));
