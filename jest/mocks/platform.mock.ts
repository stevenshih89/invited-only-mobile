jest.mock('react-native', () => {
  return {
    ...jest.requireActual('react-native'),
    Platform: {
      OS: 'ios',
    },
  };
});
