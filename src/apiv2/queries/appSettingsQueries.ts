import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import firestore from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Config from 'react-native-config';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import AppSettingsKeys from '../keys/appSettingsKeys';
import {useEffect} from 'react';
import {BACKEND_BASE_64_AUTH, BACKEND_BASE_URL} from '@env';

interface AppVersionCheckProps {
  appStoreAppId: string;
  currentUser: FirebaseAuthTypes.User | null;
}
export interface AppLookupResponse {
  resultCount: number;
  results: AppLookupResult[];
}

export interface AppLookupResult {
  isGameCenterEnabled: boolean;
  artistViewUrl: string;
  artworkUrl60: string;
  artworkUrl100: string;
  screenshotUrls: string[];
  ipadScreenshotUrls: string[];
  appletvScreenshotUrls: string[];
  artworkUrl512: string;
  features: string[]; // array of feature strings (can adjust type if needed)
  supportedDevices: string[];
  advisories: string[];
  kind: string;
  minimumOsVersion: string;
  contentAdvisoryRating: string;
  trackCensoredName: string;
  trackViewUrl: string;
  averageUserRating: number;
  sellerUrl: string;
  languageCodesISO2A: string[];
  userRatingCountForCurrentVersion: number;
  fileSizeBytes: string;
  formattedPrice: string;
  trackContentRating: string;
  averageUserRatingForCurrentVersion: number;
  artistId: number;
  artistName: string;
  genres: string[];
  price: number;
  trackId: number;
  trackName: string;
  bundleId: string;
  releaseDate: string;
  genreIds: string[];
  isVppDeviceBasedLicensingEnabled: boolean;
  sellerName: string;
  releaseNotes: string;
  primaryGenreName: string;
  primaryGenreId: number;
  currentVersionReleaseDate: string;
  version: string;
  wrapperType: string;
  currency: string;
  description: string;
  userRatingCount: number;
}

interface AppVersionDataResponse {
  lastAvailableBuild?: string;
  lastAvailableVersion?: string;
}

export interface FirebaseCollectionsResponse {
  adminChats: string;
  admins: string;
  appSettings: string;
  messages: string;
  report: string;
  unfinishedRegistrationUsers: string;
  userInfo: string;
  events: string;
}

const apiAppSettingsCollection = Config.APP_SETTINGS_COLLECTION || 'appSettings';

const useMaintenanceQuery = () => {
  const queryClient = useQueryClient();
  
  // Set up the snapshot listener only once when the hook is first called
  useEffect(() => {
    // Use a ref to track if this is mounted to prevent updates after unmount
    let isMounted = true;
    
    const unsubscribe = firestore()
      .collection(apiAppSettingsCollection)
      .doc('maintenance')
      .onSnapshot(
        doc => {
          // Only update if component is still mounted
          if (isMounted) {
            if (doc.exists) {
              const data = doc.data() as {
                isMaintenance: boolean;
                approximatelyTime: string | null;
              };

              queryClient.setQueryData(AppSettingsKeys.getMaintenanceQueryKey(), data);
            } else {
              queryClient.setQueryData(AppSettingsKeys.getMaintenanceQueryKey(), null);
            }
          }
        },
        error => {
          if (isMounted) {
            logErrorToSentry(error);
          }
        },
      );
      
    // Clean up function that runs when the component unmounts
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handleCheckMaintenance = async (): Promise<{
    isMaintenance: boolean;
    approximatelyTime: string | null;
  }> => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser?.uid) {
        return {approximatelyTime: null, isMaintenance: false};
      }
      const maintenanceQuery = await firestore().collection(apiAppSettingsCollection).doc('maintenance').get();
      if (maintenanceQuery.exists) {
        const data = maintenanceQuery.data() as {
          isMaintenance: boolean;
          approximatelyTime: string | null;
        };
        return data;
      }
      return {approximatelyTime: null, isMaintenance: false};
    } catch (error) {
      logErrorToSentry(error);
      return {
        isMaintenance: false,
        approximatelyTime: null,
      };
    }
  };

  return useQuery({
    queryKey: AppSettingsKeys.getMaintenanceQueryKey(),
    queryFn: handleCheckMaintenance,
  });
};

const useAppVersionAppStoreCheckQuery = ({appStoreAppId, currentUser}: AppVersionCheckProps) => {
  const queryClient = useQueryClient();
  const firebaseCollectionNames = queryClient.getQueryData<FirebaseCollectionsResponse>(
    AppSettingsKeys.getFirebaseCollectionNameQueryKey(),
  );
  const checkAppStoreVersion = async (): Promise<string> => {
    if (!appStoreAppId || !currentUser?.uid) {
      return '';
    }

    try {
      const response = await fetch(`https://itunes.apple.com/lookup?id=${appStoreAppId}`);
      const data = await response.json();

      if (data.results.length > 0) {
        return data.results[0].version;
      }
      return '';
    } catch (error) {
      console.error('Error checking for new version:', error);
      return '';
    }
  };

  return useQuery<string>({
    queryKey: AppSettingsKeys.getAppVersionAppStoreCheckQueryKey(),
    queryFn: checkAppStoreVersion,
    enabled: firebaseCollectionNames?.userInfo === 'userInfo',
  });
};

const useAppVersionCheckQuery = () => {
  const queryClient = useQueryClient();
  const firebaseCollectionNames = queryClient.getQueryData<FirebaseCollectionsResponse>(
    AppSettingsKeys.getFirebaseCollectionNameQueryKey(),
  );

  const checkAppStoreVersion = async (): Promise<AppVersionDataResponse> => {
    try {
      const result = await firestore().collection(apiAppSettingsCollection).doc('version').get();
      return result.data() || {};
    } catch (error) {
      console.error('Error checking for new version:', error);
      return {};
    }
  };
  return useQuery<AppVersionDataResponse>({
    queryKey: AppSettingsKeys.getAppVersionCheckQueryKey(),
    queryFn: checkAppStoreVersion,
    enabled: firebaseCollectionNames?.userInfo === 'devUserInfo',
  });
};

export const useFirebaseCollectionsNameQuery = () => {
  const fetchFirebaseCollections = async (): Promise<FirebaseCollectionsResponse> => {
    try {
      const headers = new Headers();
      headers.append('Authorization', `Basic ${BACKEND_BASE_64_AUTH}`);

      const requestOptions = {
        method: 'GET',
        headers: headers,
      };

      return fetch(`${BACKEND_BASE_URL}/config/firebase/collections`, requestOptions)
        .then(response => {
          return response.json();
        })
        .then(res => {
          return res;
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error('Error fetching firebase collections:', error);
      throw new Error('Failed to fetch collection names');
    }
  };

  return useQuery<FirebaseCollectionsResponse>({
    queryKey: AppSettingsKeys.getFirebaseCollectionNameQueryKey(),
    queryFn: fetchFirebaseCollections,
  });
};

export const AppSettingsQueries = {
  useMaintenanceQuery,
  useAppVersionAppStoreCheckQuery,
  useAppVersionCheckQuery,
  useFirebaseCollectionNameQuery: useFirebaseCollectionsNameQuery,
};
