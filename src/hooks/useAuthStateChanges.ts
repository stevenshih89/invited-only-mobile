import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";
import { FirebaseCollectionsContext } from "contexts/FirebaseCollectionNamesContext";
import { getFcmToken, registerListenerWithFCM } from "helpers/fcmHelper";
import invitedOnlyBackendApi from "src/api/backend-api";
import { useAuthStore , selectIsAuthenticated } from "src/store/authStore";

const useAuthStateChanges = () => {
    const isAuthenticated = useAuthStore(selectIsAuthenticated);
    const { userPhoneNumber, setUserMetadata: setUser } = useAuthStore();
    const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);

    const { data: user, isLoading: isLoadingUser } = invitedOnlyBackendApi.useQuery('get', '/users/phone/{phone}', {
        params: {
            path: {
                phone: userPhoneNumber,
            },
        },
    }, { enabled: isAuthenticated });



    useEffect(() => {
        const fetchUser = async () => {
            if (isAuthenticated && !isLoadingUser) {
                await getFcmToken({ apiUserInfoCollection: apiUserInfoCollection });
                await registerListenerWithFCM();
                console.log('user', user);
                await setUser({ ...user });
                const onBoarding = await AsyncStorage.getItem('onBoarding');
                console.log('onBoarding', onBoarding);

                console.log('user registered');
            }
        };
        fetchUser();
    }, [isAuthenticated, isLoadingUser]);
};

export default useAuthStateChanges;
