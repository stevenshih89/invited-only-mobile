import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import firestore from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Config from 'react-native-config';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import AppSettingsKeys from '../keys/appSettingsKeys';
import {useEffect} from 'react';

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

const apiAppSettingsCollection = Config.APP_SETTINGS_COLLECTION || 'appSettings';
const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

const useMaintenanceQuery = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(apiAppSettingsCollection)
      .doc('maintenance')
      .onSnapshot(
        doc => {
          if (doc.exists) {
            const data = doc.data() as {
              isMaintenance: boolean;
              approximatelyTime: string | null;
            };

            queryClient.setQueryData(AppSettingsKeys.getMaintenanceQueryKey(), data);
          } else {
            queryClient.setQueryData(AppSettingsKeys.getMaintenanceQueryKey(), null);
          }
        },
        error => {
          logErrorToSentry(error);
        },
      );
    return () => unsubscribe();
  }, [apiAppSettingsCollection, queryClient]);

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
      return ''; // Return a fallback value if no results are found
    } catch (error) {
      console.error('Error checking for new version:', error);
      return ''; // Return a fallback value on error
    }
  };

  return useQuery<string>({
    queryKey: AppSettingsKeys.getAppVersionAppStoreCheckQueryKey(),
    queryFn: checkAppStoreVersion,
    enabled: apiUserInfoCollection === 'userInfo',
  });
};

const useAppVersionCheckQuery = () => {
  const checkAppStoreVersion = async (): Promise<AppVersionDataResponse> => {
    try {
      const result = await firestore().collection(apiAppSettingsCollection).doc('version').get();
      console.log('results', result.data());
      return result.data() || {};
    } catch (error) {
      console.error('Error checking for new version:', error);
      return {};
    }
  };
  return useQuery<AppVersionDataResponse>({
    queryKey: AppSettingsKeys.getAppVersionCheckQueryKey(),
    queryFn: checkAppStoreVersion,
    enabled: apiUserInfoCollection === 'devUserInfo',
  });
};

export const AppSettingsQueries = {useMaintenanceQuery, useAppVersionAppStoreCheckQuery, useAppVersionCheckQuery};
