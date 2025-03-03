// useVersionStateUpdate.test.tsx
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {renderHook} from '@testing-library/react-hooks';

import AppSettingsKeys from 'src/apiv2/keys/appSettingsKeys';
import useVersionStateUpdate from '../useVersionUpdate';

jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(() => '1.0.0'),
  getBuildNumber: jest.fn(() => '1'),
  // Add any other methods you use, for example:
  getDeviceId: jest.fn(() => 'dummy-device-id'),
}));

const mockedAppStoreReturnValue = jest.fn();
const mockedDevVersionReturnValue = jest.fn();

jest.mock('src/apiv2/queries/appSettingsQueries', () => ({
  AppSettingsQueries: {
    useAppVersionAppStoreCheckQuery: jest.fn(() => ({
      // Call the dynamic mock function so its return value is used.
      data: mockedAppStoreReturnValue(),
      isFetched: true,
    })),
    useAppVersionCheckQuery: jest.fn(() => ({
      data: mockedDevVersionReturnValue(),
      isFetched: true,
    })),
  },
}));

jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    currentUser: {uid: '12345', email: 'test@example.com'},
  });
});

jest.mock('react-native-config', () => jest.fn());

describe('useVersionStateUpdate', () => {
  beforeEach(() => {
    mockedAppStoreReturnValue.mockReset(); // clear any previous return values
  });

  it('should mark update available when App Store version is newer', async () => {
    const queryClient = new QueryClient({defaultOptions: {queries: {retry: false}}});

    mockedAppStoreReturnValue.mockReturnValue('1.0.1');
    const {result, waitFor} = renderHook(() => useVersionStateUpdate(), {
      wrapper: ({children}: {children: React.ReactNode}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    // Wait until the hook reports update available as true
    await waitFor(() => result.current.versionData.showUpdateAvailable === true);
    expect(result.current.versionData.showUpdateAvailable).toBe(true);
    expect(result.current.versionData.lastAvailableVersion).toBe('1.0.1');
  });

  it('should mark update available when semver check triggers', async () => {
    const queryClient = new QueryClient({defaultOptions: {queries: {retry: false}}});
    queryClient.setQueryData(AppSettingsKeys.getAppVersionAppStoreCheckQueryKey(), {
      lastAvailableVersion: '1.0.1',
    });
    queryClient.setQueryData(AppSettingsKeys.getAppVersionCheckQueryKey(), {
      lastAvailableVersion: '1.0.1',
    });
    mockedAppStoreReturnValue.mockReturnValue('1.0.1');

    const {result, waitFor} = renderHook(() => useVersionStateUpdate(), {
      wrapper: ({children}: {children: React.ReactNode}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    await waitFor(() => result.current.versionData.showUpdateAvailable === true);
    expect(result.current.versionData.showUpdateAvailable).toBe(true);
    expect(result.current.versionData.lastAvailableVersion).toBe('1.0.1');
  });

  it('should not mark update available when versions are equal', async () => {
    const queryClient = new QueryClient({defaultOptions: {queries: {retry: false}}});
    queryClient.setQueryData(AppSettingsKeys.getAppVersionAppStoreCheckQueryKey(), {
      lastAvailableVersion: '1.0.0',
    });
    queryClient.setQueryData(AppSettingsKeys.getAppVersionCheckQueryKey(), {
      lastAvailableVersion: '1.0.0',
    });

    mockedAppStoreReturnValue.mockReturnValue('');
    mockedDevVersionReturnValue.mockReturnValue('1.0.0');
    const {result, waitFor} = renderHook(() => useVersionStateUpdate(), {
      wrapper: ({children}: {children: React.ReactNode}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    await waitFor(() => {
      return result.current.versionData.showUpdateAvailable === false;
    });
    expect(result.current.versionData.showUpdateAvailable).toBe(false);
  });
});
