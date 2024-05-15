import {create} from 'zustand';

export const useMyEvents = create(set => ({
  eventsImJoining: [],
  setEventsImJoining: (data: any) => set(() => ({eventsImJoining: data})),
}));
