import {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

interface VersionData {
    lastAvailableVersion?: string;
    lastAvailableBuild?: string;
}

export const useVersionUpdate = () => {
    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
    const [versionData, setVersionData] = useState<VersionData>({});
    const [isChecking, setIsChecking] = useState(false);

    const checkForUpdate = async () => {
        if (Platform.OS !== 'ios') {
            return;
        }

        try {
            setIsChecking(true);
            const currentVersion = DeviceInfo.getVersion();
            const currentBuild = DeviceInfo.getBuildNumber();

            const bundleId = DeviceInfo.getBundleId();

            const appStoreUrl = `https://itunes.apple.com/lookup?bundleId=${bundleId}`;

            const response = await fetch(appStoreUrl);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const appInfo = data.results[0];
                const storeVersion = appInfo.version;
                const storeBuild = appInfo.version;

                const isUpdateNeeded = compareVersions(currentVersion, storeVersion) < 0;

                if (isUpdateNeeded) {
                    setIsUpdateAvailable(true);
                    setVersionData({
                        lastAvailableVersion: storeVersion,
                        lastAvailableBuild: storeBuild,
                    });
                }
            }
        } catch (error) {
            console.error('Error checking for app update:', error);
        } finally {
            setIsChecking(false);
        }
    };

    const compareVersions = (version1: string, version2: string): number => {
        const v1Parts = version1.split('.').map(Number);
        const v2Parts = version2.split('.').map(Number);

        for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
            const v1Part = v1Parts[i] || 0;
            const v2Part = v2Parts[i] || 0;

            if (v1Part > v2Part) return 1;
            if (v1Part < v2Part) return -1;
        }

        return 0;
    };

    useEffect(() => {
        checkForUpdate();
    }, []);

    return {
        isUpdateAvailable,
        versionData,
        isChecking,
        checkForUpdate,
    };
};
