import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FirstTimeShowState {
    isDemoVideoWatched: boolean;
    isWelcomeAboardModalShowed: boolean;
    isStartInvitingModalShowed: boolean;
    isStorageReady: boolean;
    isApprovedUserScreenShowed: boolean;
    setIsStorageReady: (isStorageReady: boolean) => void;
    setIsDemoVideoWatched: (isDemoVideoWatched: boolean) => void;
    setIsWelcomeAboardModalShowed: (isShowed: boolean) => void;
    setIsStartInvitingModalShowed: (isShowed: boolean) => void;
    setIsApprovedUserScreenShowed: (isShowed: boolean) => void;
    reset: () => void;
}

const getInitialState = (
    set: (
        partial:
            | FirstTimeShowState
            | Partial<FirstTimeShowState>
            | ((state: FirstTimeShowState) => FirstTimeShowState | Partial<FirstTimeShowState>),
        replace?: boolean | undefined,
    ) => void,
): FirstTimeShowState => ({
    isDemoVideoWatched: false,
    isWelcomeAboardModalShowed: false,
    isStartInvitingModalShowed: false,
    isStorageReady: false,
    isApprovedUserScreenShowed: false,
    setIsStorageReady: () => {},
    setIsDemoVideoWatched: isDemoVideoWatched => set({isDemoVideoWatched: isDemoVideoWatched ?? false}),
    setIsWelcomeAboardModalShowed: isWelcomeAboardModalShowed => set({isWelcomeAboardModalShowed: isWelcomeAboardModalShowed ?? false}),
    setIsStartInvitingModalShowed: isStartInvitingModalShowed => set({isStartInvitingModalShowed: isStartInvitingModalShowed ?? false}),
    setIsApprovedUserScreenShowed: isApprovedUserScreenShowed => set({isApprovedUserScreenShowed: isApprovedUserScreenShowed ?? false}),
    reset: () =>
        set(state => ({
            isDemoVideoWatched: false,
            isWelcomeAboardModalShowed: false,
            isStartInvitingModalShowed: false,
            isApprovedUserScreenShowed: false,
            isStorageReady: state.isStorageReady,
        })),
});

export const useFirstTimeShowStore = create<FirstTimeShowState>()(
    persist(
        set => ({
            ...getInitialState(set),
        }),
        {
            name: 'first-time-show-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: state => ({
                isDemoVideoWatched: state.isDemoVideoWatched,
                isWelcomeAboardModalShowed: state.isWelcomeAboardModalShowed,
                isStartInvitingModalShowed: state.isStartInvitingModalShowed,
                isApprovedUserScreenShowed: state.isApprovedUserScreenShowed,
            }),
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.error('FirstTimeShowStore: hydration error', error);
                } else {
                    useFirstTimeShowStore.setState({isStorageReady: true});
                }
            },
        },
    ),
);

export const selectIsDemoVideoWatched = (state: FirstTimeShowState): boolean => state.isDemoVideoWatched;
export const selectIsWelcomeAboardModalShowed = (state: FirstTimeShowState): boolean => state.isWelcomeAboardModalShowed;
export const selectIsStartInvitingModalShowed = (state: FirstTimeShowState): boolean => state.isStartInvitingModalShowed;
export const selectIsStorageReady = (state: FirstTimeShowState): boolean => state.isStorageReady;
export const selectIsApprovedUserScreenShowed = (state: FirstTimeShowState): boolean => state.isApprovedUserScreenShowed;
