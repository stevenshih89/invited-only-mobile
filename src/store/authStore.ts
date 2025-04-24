import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Import middleware
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { components } from 'src/api/v1'; // Make sure this import path is correct

export type OnBoardingStep =
    | '/onboard'
    | '/eula'
    | '/choose-enter-type'
    | '/onboarding-demo-path'
    | '/confirm-phone'
    | '/turn-notifications'
    | '/choose-account-type'
    | '/enter-name'
    | '/add-photos'
    | '/enter-birthday'
    | '/gender'
    | '/my-interests'
    | '/my-email'
    | '/privacy'
    | '/verify-first-step'
    | '/invitation-code'
    | '/photo-verified'
    | '/summary-info'
    | '/verify-social-profile';

type User = Partial<components['schemas']['User']>;


interface OnboardingState {
    isOnboardingCompleted: boolean;
    userType: 'host' | 'guest' | null;
    onboardingStep: OnBoardingStep | null;
    registrationDetails: Partial<components['schemas']['User']> | null;
}

interface UserMetadata {
    uid: string;
    phoneNumber: string;
}

interface AuthState {
    userMetadata: UserMetadata;
    onBoarding: OnboardingState;
    userPhoneNumber: string;
    accessToken: string;
    refreshToken: string;
    isStorageReady: boolean;

    setIsStorageReady: (isStorageReady: boolean) => void;
    setUserMetadata: (userMetadata: UserMetadata) => void;
    setOnBoarding: (onBoarding: Partial<OnboardingState>) => void; // Allow partial updates
    setUserPhoneNumber: (phoneNumber: string) => void;
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
    logout: () => void;
}

const initialOnboardingState: OnboardingState = {
    isOnboardingCompleted: false,
    userType: null,
    onboardingStep: '/onboard',
    registrationDetails: null,
};

const getInitialState = (set: (partial: AuthState | Partial<AuthState> | ((state: AuthState) => AuthState | Partial<AuthState>), replace?: boolean | undefined) => void): AuthState => ({
    userMetadata: {
        uid: '',
        phoneNumber: '',
    },
    onBoarding: initialOnboardingState,
    userPhoneNumber: '',
    accessToken: '',
    refreshToken: '',
    isStorageReady: false,
    setIsStorageReady: () => { },
    setUserMetadata: (userMetadata) => set({ userMetadata: { ...userMetadata, uid: userMetadata.uid ?? '', phoneNumber: userMetadata.phoneNumber ?? '' } }),
    setOnBoarding: (onBoardingUpdate) =>
        set((state) => ({ onBoarding: { ...state.onBoarding, ...onBoardingUpdate } })),
    setUserPhoneNumber: (userPhoneNumber) => set({ userPhoneNumber }),
    setAccessToken: (accessToken) => set({ accessToken: accessToken ?? '' }),
    setRefreshToken: (refreshToken) => set({ refreshToken: refreshToken ?? '' }),
    logout: () => set((state) => ({
        userMetadata: { ...getInitialState(set).userMetadata },
        onBoarding: { ...initialOnboardingState },
        accessToken: '',
        refreshToken: '',
        isStorageReady: state.isStorageReady
    })),
});

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            ...getInitialState(set),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                userMetadata: state.userMetadata,
                userPhoneNumber: state.userPhoneNumber,
                onBoarding: state.onBoarding,
            }),
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.log('AuthStore: hydration error', error);
                } else {
                    console.log('AuthStore: hydration finished. Current onboarding:', state?.onBoarding);
                    useAuthStore.setState({ isStorageReady: true });
                }
            }
        }
    )
);

export const selectIsAuthenticated = (state: AuthState): boolean => !!state.accessToken && !!state.refreshToken;
export const selectIsStorageReady = (state: AuthState): boolean => state.isStorageReady;