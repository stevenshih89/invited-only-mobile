// Commenting out the content as the mock will be defined in the test file itself.
/*
// Remove the direct return value mocks - we'll use queryClient.setQueryData in tests
// export const mockedAppStoreReturnValue = jest.fn();
// export const mockedDevVersionReturnValue = jest.fn();

// Mock the module structure, but let the actual implementation be used (which reads from QueryClient)
jest.mock('../../src/apiv2/queries/appSettingsQueries', () => ({
  AppSettingsQueries: {
    // Keep the function mocks, but without specific return values here
    useAppVersionAppStoreCheckQuery: jest.fn(),
    useAppVersionCheckQuery: jest.fn(),
  },
}));
*/
