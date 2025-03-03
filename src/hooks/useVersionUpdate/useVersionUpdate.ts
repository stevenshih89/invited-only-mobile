import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import {AppSettingsQueries} from 'src/apiv2/queries/appSettingsQueries';
import semver from 'semver';

const appStoreAppId = Config.APP_STORE_APP_ID || '';

interface VersionResponse {
  lastAvailableBuild?: string;
  lastAvailableVersion?: string;
  showUpdateAvailable: boolean;
}

const useVersionStateUpdate = (): {versionData: VersionResponse} => {
  const currentUser = auth().currentUser;
  const appVersion = DeviceInfo.getVersion();

  const {data: appStoreVersionData, isFetched: appStoreDataFetched} = AppSettingsQueries.useAppVersionAppStoreCheckQuery({
    appStoreAppId,
    currentUser: currentUser,
  });

  const {data: versionData, isFetched: appVersionFetched} = AppSettingsQueries.useAppVersionCheckQuery();

  if (appStoreDataFetched && appStoreVersionData) {
    const latestVersion = appStoreVersionData;

    if (latestVersion !== appVersion) {
      return {versionData: {lastAvailableVersion: latestVersion, showUpdateAvailable: true}};
    }
  }

  if (appVersionFetched && versionData?.lastAvailableVersion) {
    console.log(appVersion, versionData.lastAvailableVersion);

    if (semver.lt(appVersion, versionData.lastAvailableVersion)) {
      return {versionData: {...versionData, showUpdateAvailable: true}};
    }
  }

  return {versionData: {showUpdateAvailable: false}};
};
export default useVersionStateUpdate;
