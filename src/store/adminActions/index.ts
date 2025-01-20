import {create} from 'zustand';

export const useAdminActions = create(set => ({
  rejectModalVisible: false,
  acceptModalVisible: false,
  changeAccountTypeModalVisible: false,
  setRejectModalVisible: (state: any) => set(() => ({rejectModalVisible: state})),
  setAcceptModalVisible: (state: any) => set(() => ({acceptModalVisible: state})),
  setChangeAccountModalVisible: (state: any) => set(() => ({changeAccountTypeModalVisible: state})),
}));
