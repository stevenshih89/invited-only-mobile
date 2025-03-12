jest.mock('helpers/getDimensions', () => ({
  __esModule: true,
  default: () => ({
    screenWidth: 400,
    screenHeight: 800,
    windowWidth: 360,
    windowHeight: 640,
  }),
}));
