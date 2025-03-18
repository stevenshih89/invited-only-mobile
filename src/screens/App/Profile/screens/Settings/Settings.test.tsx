import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import Settings from "./Settings";
import { useSettings } from 'hooks/useSettings';

describe('Settings Component', () => {
    const goToAccountSetting = jest.fn();
    const goToNotificationSetting = jest.fn();
    const goToTermsOfUse = jest.fn();
    const goToPrivacyPolicy = jest.fn();
    const goToContactAndFAQ = jest.fn();
    const restorePurchases = jest.fn();
    const openLogoutModal = jest.fn();
    const setIsVisibleLogoutModal = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks();
        (useSettings as jest.Mock).mockReturnValue({
          goToAccountSetting,
          goToNotificationSetting,
          goToTermsOfUse,
          goToPrivacyPolicy,
          goToContactAndFAQ,
          restorePurchases,
          openLogoutModal,
          isVisibleLogoutModal: false,
          setIsVisibleLogoutModal: jest.fn(),
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('correctly renders and clicks on Account settings', () => {
        const { getByText } = render(<Settings />);
        const accountSettings = getByText('Account settings');
        expect(accountSettings).toBeTruthy();
        fireEvent.press(accountSettings);
        expect(goToAccountSetting).toHaveBeenCalled();
    });

    it('correctly renders and clicks on Notification settings', () => {
        const { getByText } = render(<Settings />);
        const notificationSettings = getByText('Notification settings');
        expect(notificationSettings).toBeTruthy();
        fireEvent.press(notificationSettings);
        expect(goToNotificationSetting).toHaveBeenCalled();
    });

    it('correctly renders and clicks on Terms of Service / EULA', () => {
        const { getByText } = render(<Settings />);
        const termsOfUse = getByText('Terms of Service / EULA');
        expect(termsOfUse).toBeTruthy();
        fireEvent.press(termsOfUse);
        expect(goToTermsOfUse).toHaveBeenCalled();
    });

    it('correctly renders and clicks on Privacy Policy', () => {
        const { getByText } = render(<Settings />);
        const privacyPolicy = getByText('Privacy Policy');
        expect(privacyPolicy).toBeTruthy();
        fireEvent.press(privacyPolicy);
        expect(goToPrivacyPolicy).toHaveBeenCalled();
    });

    it('correctly renders and clicks on Contact & FAQ', () => {
        const { getByText } = render(<Settings />);
        const contactFAQ = getByText('Contact & FAQ');
        expect(contactFAQ).toBeTruthy();
        fireEvent.press(contactFAQ);
        expect(goToContactAndFAQ).toHaveBeenCalled();
    });

    it('correctly renders and clicks on Restore purchase', () => {
        const { getByText } = render(<Settings />);
        const restorePurchase = getByText('Restore purchase');
        expect(restorePurchase).toBeTruthy();
        fireEvent.press(restorePurchase);
        expect(restorePurchases).toHaveBeenCalled();
    });

    it('correctly renders and clicks on Log out', () => {
        const { getByText } = render(<Settings />);
        const logOut = getByText('Log out');
        expect(logOut).toBeTruthy();
        fireEvent.press(logOut);
        expect(openLogoutModal).toHaveBeenCalled();
    });

    it('correctly renders Log out modal', () => {
        (useSettings as jest.Mock).mockReturnValueOnce({
            goToAccountSetting,
            goToNotificationSetting,
            goToTermsOfUse,
            goToPrivacyPolicy,
            goToContactAndFAQ,
            restorePurchases,
            openLogoutModal,
            isVisibleLogoutModal: true,
            setIsVisibleLogoutModal,
        });
        const { getByTestId } = render(<Settings />);
        const modalLogout = getByTestId('modal-log-out');
        expect(modalLogout).toBeTruthy();
    });
});
