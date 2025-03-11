// useVersionStateUpdate.test.tsx
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {renderHook} from '@testing-library/react-hooks';
import AppSettingsKeys from 'src/apiv2/keys/appSettingsKeys';
import useVersionStateUpdate from '../useVersionUpdate';
import {mockedAppStoreReturnValue, mockedDevVersionReturnValue} from 'jest/mocks/appSettingsQueries.mock';

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
