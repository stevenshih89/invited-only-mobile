// useVersionStateUpdate.test.tsx
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {renderHook, act} from '@testing-library/react-hooks';
import useVersionStateUpdate from '../useVersionUpdate';
import AppSettingsKeys from 'src/apiv2/keys/appSettingsKeys';
import DeviceInfo from 'react-native-device-info';
import {Platform as ReactNativePlatform} from 'react-native'; // Import the real Platform

// Mock dependencies
jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(() => '1.0.0'), // Default mock version
}));

// Mock Platform using the actual Platform object but overriding OS
const mockPlatform = {
  ...ReactNativePlatform,
  OS: 'ios', // Default to iOS
};
jest.doMock('react-native/Libraries/Utilities/Platform', () => mockPlatform);

// Mock the AppSettingsQueries module directly in the test file
jest.mock('src/apiv2/queries/appSettingsQueries', () => ({
  AppSettingsQueries: {
    useAppVersionAppStoreCheckQuery: jest.fn(),
    useAppVersionCheckQuery: jest.fn(),
  },
}));

// Import AFTER the mocks have been defined
import {AppSettingsQueries} from 'src/apiv2/queries/appSettingsQueries';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        gcTime: Infinity, // Prevent garbage collection during tests
      },
    },
  });

const createWrapper = (queryClient: QueryClient) => {
  return ({children}: {children: React.ReactNode}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useVersionStateUpdate', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    (DeviceInfo.getVersion as jest.Mock).mockReturnValue('1.0.0');
    mockPlatform.OS = 'ios';
    // Clear all mocks defined with jest.fn() before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear(); // Clear cache after each test
  });

  it('should initially return showUpdateAvailable false if queries are loading', () => {
    mockPlatform.OS = 'ios';
    (AppSettingsQueries.useAppVersionAppStoreCheckQuery as jest.Mock).mockReturnValue({data: undefined, isFetched: false, isLoading: true});
    (AppSettingsQueries.useAppVersionCheckQuery as jest.Mock).mockReturnValue({data: undefined, isFetched: false, isLoading: true});

    const {result} = renderHook(() => useVersionStateUpdate(), {wrapper: createWrapper(queryClient)});
    expect(result.current.versionData.showUpdateAvailable).toBe(false);
  });

  it('should mark update available when App Store version is newer', async () => {
    (DeviceInfo.getVersion as jest.Mock).mockReturnValue('1.0.0');
    mockPlatform.OS = 'ios';

    (AppSettingsQueries.useAppVersionAppStoreCheckQuery as jest.Mock).mockReturnValue({data: '1.0.1', isFetched: true, isLoading: false});
    (AppSettingsQueries.useAppVersionCheckQuery as jest.Mock).mockReturnValue({
      data: {lastAvailableVersion: '1.0.0'},
      isFetched: true,
      isLoading: false,
    });

    const {result, waitFor} = renderHook(() => useVersionStateUpdate(), {wrapper: createWrapper(queryClient)});

    await waitFor(() => {
      return result.current.versionData.showUpdateAvailable === true && result.current.versionData.lastAvailableVersion === '1.0.1';
    });

    expect(result.current.versionData.showUpdateAvailable).toBe(true);
    expect(result.current.versionData.lastAvailableVersion).toBe('1.0.1');
  });

  it('should mark update available when backend version check triggers (and App Store is same)', async () => {
    (DeviceInfo.getVersion as jest.Mock).mockReturnValue('1.0.0');
    mockPlatform.OS = 'ios';

    (AppSettingsQueries.useAppVersionAppStoreCheckQuery as jest.Mock).mockReturnValue({data: '1.0.0', isFetched: true, isLoading: false});
    (AppSettingsQueries.useAppVersionCheckQuery as jest.Mock).mockReturnValue({
      data: {lastAvailableVersion: '1.0.1'},
      isFetched: true,
      isLoading: false,
    });

    const {result, waitFor} = renderHook(() => useVersionStateUpdate(), {wrapper: createWrapper(queryClient)});

    await waitFor(() => {
      return result.current.versionData.showUpdateAvailable === true && result.current.versionData.lastAvailableVersion === '1.0.1';
    });

    expect(result.current.versionData.showUpdateAvailable).toBe(true);
    expect(result.current.versionData.lastAvailableVersion).toBe('1.0.1');
  });

  it('should not mark update available when versions are equal', async () => {
    (DeviceInfo.getVersion as jest.Mock).mockReturnValue('1.0.0');
    mockPlatform.OS = 'ios';

    (AppSettingsQueries.useAppVersionAppStoreCheckQuery as jest.Mock).mockReturnValue({data: '1.0.0', isFetched: true, isLoading: false});
    (AppSettingsQueries.useAppVersionCheckQuery as jest.Mock).mockReturnValue({
      data: {lastAvailableVersion: '1.0.0'},
      isFetched: true,
      isLoading: false,
    });

    const {result, waitFor} = renderHook(() => useVersionStateUpdate(), {wrapper: createWrapper(queryClient)});

    await waitFor(() => result.current.versionData.showUpdateAvailable === false);

    expect(result.current.versionData.showUpdateAvailable).toBe(false);
  });

  it('should return showUpdateAvailable false on Android', () => {
    (DeviceInfo.getVersion as jest.Mock).mockReturnValue('1.0.0');
    mockPlatform.OS = 'android'; // Set platform to Android

    (AppSettingsQueries.useAppVersionAppStoreCheckQuery as jest.Mock).mockReturnValue({data: '1.0.1', isFetched: true, isLoading: false});
    (AppSettingsQueries.useAppVersionCheckQuery as jest.Mock).mockReturnValue({
      data: {lastAvailableVersion: '1.0.1'},
      isFetched: true,
      isLoading: false,
    });

    const {result} = renderHook(() => useVersionStateUpdate(), {wrapper: createWrapper(queryClient)});

    expect(result.current.versionData.showUpdateAvailable).toBe(false);
  });
});
