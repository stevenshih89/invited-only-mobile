import {create} from 'zustand';

export const useGuestList = create(set => ({
    guestsInvited: 0,
    guestsAccepted: 0,
    setGuestsInvited: (data: any) => set(() => ({guestsInvited: data})),
}));
