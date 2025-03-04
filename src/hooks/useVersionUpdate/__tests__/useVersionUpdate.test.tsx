// useVersionStateUpdate.test.tsx
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {renderHook} from '@testing-library/react-hooks';
import AppSettingsKeys from 'src/apiv2/keys/appSettingsKeys';
import useVersionStateUpdate from '../useVersionUpdate';

jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(() => '1.0.0'),
  getBuildNumber: jest.fn(() => '1'),
  getDeviceId: jest.fn(() => 'dummy-device-id'),
}));

const mockedAppStoreReturnValue = jest.fn();
const mockedDevVersionReturnValue = jest.fn();

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

jest.mock('@react-native-firebase/firestore', () => {
  return () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        onSnapshot: jest.fn(() => () => {}),
        get: jest.fn(() => Promise.resolve({exists: false})),
      })),
    })),
  });
});

jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    currentUser: {uid: '12345', email: 'test@example.com'},
  });
});

jest.mock('react-native-config', () => jest.fn());

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
    },
  });

// Create a reusable wrapper for QueryClientProvider
const createWrapper = (queryClient: QueryClient) => {
  return ({children}: {children: React.ReactNode}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useVersionStateUpdate', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    // Create a new QueryClient before each test.
    queryClient = createTestQueryClient();
    mockedAppStoreReturnValue.mockReset();
    mockedDevVersionReturnValue.mockReset();
  });

  afterEach(() => {
    // Cancel any ongoing queries and clear the client cache.
    queryClient.cancelQueries();
    queryClient.clear();
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  it('should mark update available when App Store version is newer', async () => {
    // Simulate App Store query returning a newer version.
    mockedAppStoreReturnValue.mockReturnValue('1.0.1');

    const {result, waitFor, unmount} = renderHook(() => useVersionStateUpdate(), {wrapper: createWrapper(queryClient)});

    // Wait until the hook reports update available as true.
    await waitFor(() => result.current.versionData.showUpdateAvailable === true);

    expect(result.current.versionData.showUpdateAvailable).toBe(true);
    expect(result.current.versionData.lastAvailableVersion).toBe('1.0.1');

    unmount();
  });

  it('should mark update available when semver check triggers', async () => {
    // Simulate Firestore (or similar) query returning a newer version.
    queryClient.setQueryData(AppSettingsKeys.getAppVersionAppStoreCheckQueryKey(), {
      lastAvailableVersion: '1.0.1',
    });
    queryClient.setQueryData(AppSettingsKeys.getAppVersionCheckQueryKey(), {
      lastAvailableVersion: '1.0.1',
    });
    mockedAppStoreReturnValue.mockReturnValue('1.0.1');

    const {result, waitFor, unmount} = renderHook(() => useVersionStateUpdate(), {wrapper: createWrapper(queryClient)});

    await waitFor(() => result.current.versionData.showUpdateAvailable === true);

    expect(result.current.versionData.showUpdateAvailable).toBe(true);
    expect(result.current.versionData.lastAvailableVersion).toBe('1.0.1');

    unmount();
  });

  it('should not mark update available when versions are equal', async () => {
    // Simulate both queries returning the same version.
    queryClient.setQueryData(AppSettingsKeys.getAppVersionAppStoreCheckQueryKey(), {
      lastAvailableVersion: '1.0.0',
    });
    queryClient.setQueryData(AppSettingsKeys.getAppVersionCheckQueryKey(), {
      lastAvailableVersion: '1.0.0',
    });
    mockedAppStoreReturnValue.mockReturnValue('');
    mockedDevVersionReturnValue.mockReturnValue('1.0.0');

    const {result, waitFor, unmount} = renderHook(() => useVersionStateUpdate(), {wrapper: createWrapper(queryClient)});

    await waitFor(() => result.current.versionData.showUpdateAvailable === false);

    expect(result.current.versionData.showUpdateAvailable).toBe(false);

    unmount();
  });
});
