import {create} from 'zustand';

export const useChat = create(set => ({
  selectedChat: '',
  setChat: (state: any) => set(() => ({selectedChat: state})),
}));
