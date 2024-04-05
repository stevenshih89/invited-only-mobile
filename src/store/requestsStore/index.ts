import {create} from 'zustand';

export const useRequest = create(set => ({
  requestFilter: 'All',
  setRequestFilter: (status: any) => set(() => ({requestFilter: status})),
}));
