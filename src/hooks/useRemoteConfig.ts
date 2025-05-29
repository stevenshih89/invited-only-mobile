import { useEffect, useState } from 'react';
import { initializeApiClient } from 'src/api/backend-api';

const useRemoteConfig = () => {
    const [isApiReady, setIsApiReady] = useState(false);
    useEffect(() => {
        const init = async () => {
            await initializeApiClient();
            setIsApiReady(true);
        };
        init();
    }, [])

    return {
        isApiReady
    }
}

export default useRemoteConfig;