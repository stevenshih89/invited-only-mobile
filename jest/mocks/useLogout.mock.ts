export const mockedUseLogout = {
  userHost: {name: 'John Doe', accountType: 'host', photos: [{image: 'https://example.com/photo.jpg'}]},
  userAge: 30,
  handleLogout: jest.fn(),
};

jest.mock('hooks/useLogout', () => ({
  useLogout: jest.fn(() => mockedUseLogout),
}));
