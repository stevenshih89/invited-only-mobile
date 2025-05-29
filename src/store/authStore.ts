import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Import middleware
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { components } from '@invited-only/invited-only-api';

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

interface OnboardingState {
  isOnboardingCompleted: boolean;
  userType: 'host' | 'guest' | null;
  onboardingStep: OnBoardingStep | null;
  registrationDetails: Partial<components['schemas']['User']> | null;
}

interface UserMetadata {
  uid: string;
  phoneNumber: string;
  firstLogin: boolean;
}

interface AuthState {
  userMetadata: UserMetadata;
  onBoarding: OnboardingState;
  userPhoneNumber: string;
  accessToken: string;
  refreshToken: string;
  isStorageReady: boolean;
  isDemoVideoWatched: boolean;
  isWelcomeAboardModalShowed: boolean;
  isStartInvitingModalShowed: boolean;
  setIsStorageReady: (isStorageReady: boolean) => void;
  setUserMetadata: (userMetadata: UserMetadata) => void;
  setOnBoarding: (onBoarding: Partial<OnboardingState>) => void;
  setUserPhoneNumber: (phoneNumber: string) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setIsDemoVideoWatched: (isDemoVideoWatched: boolean) => void;
  setIsWelcomeAboardModalShowed: (isShowed: boolean) => void;
  setIsStartInvitingModalShowed: (isShowed: boolean) => void;
  logout: () => void;
}

const initialOnboardingState: OnboardingState = {
  isOnboardingCompleted: false,
  userType: null,
  onboardingStep: '/onboard',
  registrationDetails: null,
};

const getInitialState = (
  set: (
    partial: AuthState | Partial<AuthState> | ((state: AuthState) => AuthState | Partial<AuthState>),
    replace?: boolean | undefined,
  ) => void,
): AuthState => ({
  userMetadata: {
    uid: '',
    phoneNumber: '',
    firstLogin: false,
  },
  onBoarding: initialOnboardingState,
  userPhoneNumber: '',
  accessToken: '',
  refreshToken: '',
  isStorageReady: false,
  isDemoVideoWatched: false,
  isWelcomeAboardModalShowed: false,
  isStartInvitingModalShowed: false,
  setIsStorageReady: () => { },
  setUserMetadata: userMetadata =>
    set({
      userMetadata: {
        ...userMetadata,
        uid: userMetadata.uid ?? '',
        phoneNumber: userMetadata.phoneNumber ?? '',
        firstLogin: userMetadata.firstLogin ?? false,
      },
    }),
  setOnBoarding: onBoardingUpdate => set(state => ({ onBoarding: { ...state.onBoarding, ...onBoardingUpdate } })),
  setUserPhoneNumber: userPhoneNumber => set({ userPhoneNumber }),
  setAccessToken: accessToken => set({ accessToken: accessToken ?? '' }),
  setRefreshToken: refreshToken => set({ refreshToken: refreshToken ?? '' }),
  setIsDemoVideoWatched: isDemoVideoWatched => set({ isDemoVideoWatched: isDemoVideoWatched ?? false }),
  setIsWelcomeAboardModalShowed: isWelcomeAboardModalShowed => set({ isWelcomeAboardModalShowed: isWelcomeAboardModalShowed ?? false }),
  setIsStartInvitingModalShowed: isStartInvitingModalShowed => set({ isStartInvitingModalShowed: isStartInvitingModalShowed ?? false }),
  logout: () =>
    set(state => ({
      userMetadata: { ...getInitialState(set).userMetadata },
      onBoarding: { ...initialOnboardingState },
      accessToken: '',
      refreshToken: '',
      isStorageReady: state.isStorageReady,
      isWelcomeAboardModalShowed: false,
    })),
});

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      ...getInitialState(set),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userMetadata: state.userMetadata,
        userPhoneNumber: state.userPhoneNumber,
        onBoarding: state.onBoarding,
        isDemoVideoWatched: state.isDemoVideoWatched,
        isWelcomeAboardModalShowed: state.isWelcomeAboardModalShowed,
        isStartInvitingModalShowed: state.isStartInvitingModalShowed,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('AuthStore: hydration error', error);
        } else {
          useAuthStore.setState({ isStorageReady: true });
        }
      },
    },
  ),
);

export const selectIsAuthenticated = (state: AuthState): boolean => !!state.accessToken && !!state.refreshToken;
export const selectIsStorageReady = (state: AuthState): boolean => state.isStorageReady;
export const selectIsFirstLogin = (state: AuthState): boolean => state.userMetadata.firstLogin;
export const selectIsDemoVideoWatched = (state: AuthState): boolean => state.isDemoVideoWatched;
export const selectIsWelcomeAboardModalShowed = (state: AuthState): boolean => state.isWelcomeAboardModalShowed;
export const selectIsStartInvitingModalShowed = (state: AuthState): boolean => state.isStartInvitingModalShowed;