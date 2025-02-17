import {create} from 'zustand';

interface INotificationsStore {
  notificationsCount: number;
  setNotificationsCount: (state: number) => void;
}

export const useNotifications = create<INotificationsStore>(set => ({
  notificationsCount: 0,
  setNotificationsCount: (state: number) => set(() => ({notificationsCount: state})),
}));
