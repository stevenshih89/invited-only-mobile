export const mockedAppStoreReturnValue = jest.fn();
export const mockedDevVersionReturnValue = jest.fn();

jest.mock('src/apiv2/queries/appSettingsQueries', () => ({
  AppSettingsQueries: {
    useAppVersionAppStoreCheckQuery: jest.fn(() => ({
      data: mockedAppStoreReturnValue(),
      isFetched: true,
    })),
    useAppVersionCheckQuery: jest.fn(() => ({
      data: mockedDevVersionReturnValue(),
      isFetched: true,
    })),
  },
}));
