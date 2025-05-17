import { create, useStore } from "zustand";

interface NavigationStore {
    currentRoute: string;
    isChatScreen: boolean;
    setCurrentRoute: (route: string) => void;
    setIsChatScreen: (isChatScreen: boolean) => void;
}

export const navigationStore = create<NavigationStore>((set) => ({
    currentRoute: '',
    isChatScreen: false,
    setCurrentRoute: (route) => set({ currentRoute: route }),
    setIsChatScreen: (isChatScreen) => set({ isChatScreen }),
}));

export const useNavigationStore = () => {
    return useStore(navigationStore);
};
