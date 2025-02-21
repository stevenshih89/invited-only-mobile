export default jest.fn(() => ({
  signInWithPhoneNumber: jest.fn(() => Promise.resolve({
    confirm: jest.fn(() => Promise.resolve({ user: { uid: 'mockUserId' } })),
  })),
}));