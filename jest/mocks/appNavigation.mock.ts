export const mockedNavigateFunction = jest.fn();
export const mockedGoBackFunction = jest.fn();

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