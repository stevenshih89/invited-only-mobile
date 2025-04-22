import {  useEffect, useState } from "react";

import messaging from '@react-native-firebase/messaging';
import { useAuthStore } from "src/store/authStore";

const useInitApp = () => {
    const { onBoarding, setOnBoarding } = useAuthStore();
    const [initializing, setInitializing] = useState(true);
    useEffect(() => {
        messaging().onMessage(async () => { });
        setTimeout(() => {
            setInitializing(false);
        }, 6000);
    }, []);


    return { initializing, onBoarding }

}

export default useInitApp;
