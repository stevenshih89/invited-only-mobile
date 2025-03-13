export const mockedUseEmailChange = {
  handleChangeEmail: jest.fn(),
  email: '',
  setEmail: jest.fn(),
};

jest.mock('hooks/useEmailChange', () => ({
  useEmailChange: jest.fn(() => mockedUseEmailChange),
}));
