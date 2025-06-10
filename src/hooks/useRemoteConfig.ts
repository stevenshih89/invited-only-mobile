import { useEffect, useState } from 'react';
import { getApp } from '@react-native-firebase/app';
import remoteConfig from '@react-native-firebase/remote-config';
import { initializeApiClient } from 'src/api/backend-api';

const useRemoteConfig = () => {
    const [isApiReady, setIsApiReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [phoneVerificationCodeLength, setPhoneVerificationCodeLength] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const config = remoteConfig();
                await config.fetch(0);
                await initializeApiClient();
                await config.activate();
                const codeLength = config.getString('PhoneVerificationCodeLength');
                setPhoneVerificationCodeLength(codeLength);
                setIsApiReady(true);
            } catch (err) {
                console.error('Remote config initialization failed:', err);
                setError(err instanceof Error ? err : new Error('Unknown error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, []);

    console.log('phoneVerificationCodeLength', phoneVerificationCodeLength);
    return {
        isApiReady,
        isLoading,
        error,
        phoneVerificationCodeLength
    };
};

export default useRemoteConfig;