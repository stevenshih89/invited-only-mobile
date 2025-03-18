jest.mock('../../src/store/userStore', () => {
  // Get the actual module
  const actualModule = jest.requireActual('../../src/store/userStore');

  return {
    ...actualModule, // Spread in the original module
    useUser: jest.fn(() => ({
      ...actualModule.useUser(), // Keep original implementation
      photos: [{image: 'https://image.jpg'}], // Override specific values
      name: 'John',
      date: '01.01.2000',
      accountType: 'Host',
    })),
  };
});
