export const mockedNavigateFunction = jest.fn();

jest.mock('hooks/useAppNavigation', () => ({
  useAppNavigation: () => {
    return {
      navigate: (path: string) => {
        mockedNavigateFunction(path);
      },
    };
  },
}));
