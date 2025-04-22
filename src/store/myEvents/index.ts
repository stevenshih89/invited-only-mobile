import {create} from 'zustand';
import {EventData} from 'src/types/event';

interface MyEventsState {
  eventsImJoining: EventData[];
  setEventsImJoining: (data: EventData[]) => void;
  activeEvent: EventData;
  eventFilter: string;
  setActiveEvent: (activeEvent: EventData) => void;
  setEventFilter: (status: string) => void;
  myEvents: EventData[];
  setMyEvents: (myEvents: EventData[]) => void;
  loadingMyEvents: boolean;
  setLoadingMyEvents: (loading: boolean) => void;
  loadingCardsList: boolean;
  setLoadingCardsList: (loading: boolean) => void;
}

export const useMyEvents = create<MyEventsState>(set => ({
  eventsImJoining: [],
  setEventsImJoining: (data: EventData[]) => set(() => ({eventsImJoining: data})),
  activeEvent: {} as EventData,
  eventFilter: 'All',
  setActiveEvent: (activeEvent: EventData) => set(() => ({activeEvent})),
  setEventFilter: (status: string) => set(() => ({eventFilter: status})),
  myEvents: [],
  setMyEvents: (myEvents: EventData[]) => set(() => ({myEvents})),
  loadingMyEvents: true,
  setLoadingMyEvents: (loading: boolean) => set(() => ({loadingMyEvents: loading})),
  loadingCardsList: false,
  setLoadingCardsList: (loading: boolean) => set(() => ({loadingCardsList: loading})),
}));
