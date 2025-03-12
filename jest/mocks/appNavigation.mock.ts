export const mockedNavigateFunction = jest.fn();

jest.mock('hooks/useAppNavigation', () => {
  return {
    useAppNavigation: () => {
      return {
        navigate: (path: string) => {
          mockedNavigateFunction(path);
        },
      };
    },
    useFocusEffect: (callback: () => {}) => {
      callback();
    },
  };
});
