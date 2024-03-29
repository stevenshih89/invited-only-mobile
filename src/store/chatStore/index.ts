import {create} from 'zustand';

export const useChat = create(set => ({
  activeEvent: '',
  setActiveEvent: (id: any) => set(() => ({activeEvent: id})),
}));
