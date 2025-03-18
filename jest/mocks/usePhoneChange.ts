jest.mock('hooks/usePhoneChange', () => ({
    usePhoneChange: () => ({
        isSecondStep: false,
        mobilePhone: '+9721111111',
        setIsOpenDropdown: jest.fn(),
    })
}))