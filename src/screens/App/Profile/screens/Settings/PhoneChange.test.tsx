import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import PhoneChange from './PhoneChange'
import { usePhoneChange } from 'hooks/usePhoneChange'

jest.mock('hooks/usePhoneChange', () => ({
  usePhoneChange: jest.fn(),
}))

jest.mock('src/mocks/itemsPhoneChange', () => ({
  items: [
    { label: '+380', value: 'ua' },
    { label: '+972', value: 'ae' },
    { label: '+300', value: 'fr' },
  ],
}))

const mockedUsePhoneChange = usePhoneChange as jest.MockedFunction<typeof usePhoneChange>;

describe('PhoneChange Component', () => {
  beforeEach(() => {
    mockedUsePhoneChange.mockReturnValue({
      isSecondStep: false,
      activeItem: 'ua',
      setActiveItem: jest.fn(),
      setIsOpenDropdown: jest.fn(),
      mobilePhone: '1234567890',
      setMobilePhone: jest.fn(),
      loading: false,
      handleSendOTPOnPhone: jest.fn(),
      setIsSecondStep: jest.fn(),
      //@ts-ignore
      ref: null,
      //@ts-ignore
      props: {},
      code: '',
      setCode: jest.fn(),
      CELL_COUNT: 6,
      handleSendConfirmationCode: jest.fn(),
      getCellOnLayoutHandler: jest.fn(),
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('correctly renders dropdown', async () => {
    const { getByTestId, findByText } = render(<PhoneChange />)

    const dropdown = getByTestId('phone-change-dropdown');
    fireEvent.press(dropdown);

    const optionToSelect = await findByText('+380');
    expect(optionToSelect).toBeTruthy();
  });

  it('should allow inputting phone number', () => {
    const { getByPlaceholderText } = render(<PhoneChange />)
    const input = getByPlaceholderText('_ _ _  _ _ _  _ _ _')

    fireEvent.changeText(input, '123 456 789')

    expect(mockedUsePhoneChange().setMobilePhone).toHaveBeenCalledWith('123 456 789')
  });

//   it('should enable button only when phone number is valid', async () => {
//     const { getByTestId, getByPlaceholderText } = render(<PhoneChange />);
  
//     const button = getByTestId('send-otp-button');
//     const input = getByPlaceholderText('_ _ _  _ _ _  _ _ _');

//     fireEvent.changeText(input, '12345678901');
  
//     await waitFor(() => expect(button).toHaveProp('disabled', false));
  
//     fireEvent.press(button);
  
//     expect(mockedUsePhoneChange().handleSendOTPOnPhone).toHaveBeenCalled();
//   });

it('correctly renders second step UI when isSecondStep is true', () => {
    const mockHandleSendConfirmationCode = jest.fn();

    mockedUsePhoneChange.mockReturnValue({
      isSecondStep: true,
      activeItem: 'ua',
      setActiveItem: jest.fn(),
      setIsOpenDropdown: jest.fn(),
      mobilePhone: '1234567890',
      setMobilePhone: jest.fn(),
      loading: false,
      handleSendOTPOnPhone: jest.fn(),
      setIsSecondStep: jest.fn(),
      //@ts-ignore
      ref: null,
      //@ts-ignore
      props: {},
      code: '123456',
      setCode: jest.fn(),
      CELL_COUNT: 6,
      handleSendConfirmationCode: jest.fn(),
      getCellOnLayoutHandler: jest.fn(),
    });
  
    const { getByText, getByTestId } = render(<PhoneChange />);
  
    expect(getByTestId('verification-text')).toBeTruthy();
    expect(getByText('Resend OTP')).toBeTruthy();
    
    const saveButton = getByText('Save');
    expect(saveButton).toBeTruthy();
    fireEvent.press(saveButton);

    // expect(mockHandleSendConfirmationCode).toHaveBeenCalledTimes(1);
  });
  
});

