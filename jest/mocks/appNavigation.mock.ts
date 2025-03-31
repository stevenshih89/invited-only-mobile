export const mockedNavigateFunction = jest.fn();
export const mockedGoBackFunction = jest.fn();

/**
 * Creates a mock navigation object with the specified methods
 * @param methods - The navigation methods to mock
 * @returns A mock navigation object
 */
export const createMockNavigation = (methods = {}) => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  setOptions: jest.fn(),
  isFocused: jest.fn(() => true),
  addListener: jest.fn(() => jest.fn()),
  removeListener: jest.fn(),
  ...methods,
});

jest.mock('hooks/useAppNavigation', () => {
  return {
    useAppNavigation: () => {
      return {
        navigate: (path: string) => {
          mockedNavigateFunction(path);
        },
        goBack: () => {
          mockedGoBackFunction();
        },
      };
    },
    useFocusEffect: (callback: () => {}) => {
      callback();
    },
  };
});
