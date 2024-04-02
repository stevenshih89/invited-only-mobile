import {create} from 'zustand';

export const useChat = create(set => ({
  activeEvent: '',
  eventFilter: 'All',
  setActiveEvent: (id: any) => set(() => ({activeEvent: id})),
  setEventFilter: (status: any) => set(() => ({eventFilter: status})),
}));
