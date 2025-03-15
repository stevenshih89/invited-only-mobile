jest.mock('hooks/useNotificationSetting', () => ({
    useNotificationSetting: jest.fn(() => ({
        allNotification: true,
        handleChangeAllNotification: jest.fn(),
        myEvents: true,
        setMyEvents: jest.fn(),
        requests: true,
        setRequests: jest.fn(),
        chat: true,
        setChat: jest.fn(),
        superInvite: true,
        setSuperInvite: jest.fn(),
        match: true,
        setMatch: jest.fn(),
        isVisibleTurnOffNotificationsModal: false,
        handleConfirmTurnOffNotifications: jest.fn(),
        setIsVisibleTurnOffNotificationsModal: jest.fn()
    }))
}))