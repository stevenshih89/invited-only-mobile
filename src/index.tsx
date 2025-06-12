import React, { useContext } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//import components
import Navigator from './navigator/Navigator';
import { useAuthStore } from './store/authStore';
import { FirebaseCollectionsResponse } from 'src/apiv2/queries/appSettingsQueries';
import { AuthProvider } from 'contexts/AuthContext.tsx';
import LocalNotification from 'components/LocalNotification/LocalNotification.tsx';
import { EventProvider } from 'contexts/EventContext';
import { EventsDateProvider } from 'contexts/EventsDate';
import FirebaseCollectionsProvider from 'contexts/FirebaseCollectionNamesContext';

import AppLoader from 'screens/App/AppLoader/AppLoader';
import { blackColor } from 'constants/colors';
import useGetBackendApi from 'hooks/useGetBackendApi';
import BackendApiProvider, { BackendApiContext } from 'contexts/BackendApiContex';



const FirebaseCollectionsLoader = ({ children }: { children: React.ReactNode }) => {
  const backendApi = useContext(BackendApiContext);
  const { data: firebaseCollectionNames, isLoading } = backendApi?.useQuery('get', '/config/firebase/collections') as { data: FirebaseCollectionsResponse | undefined, isLoading: boolean };
  const { isStorageReady } = useAuthStore();

  if (isLoading || !isStorageReady) {
    return <AppLoader />;
  }

  return (
    <FirebaseCollectionsProvider firebaseCollectionNames={firebaseCollectionNames}>
      {children}
    </FirebaseCollectionsProvider>
  );
};

const Main = () => {
  const { backendApi, isLoading } = useGetBackendApi();
  if (isLoading || !backendApi) {
    return <AppLoader />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: blackColor }}>
        <BackendApiProvider backendApi={backendApi}>
          <FirebaseCollectionsLoader>
            <AuthProvider>
              <EventProvider>
                <EventsDateProvider>
                  <Navigator />
                  <LocalNotification />
                </EventsDateProvider>
              </EventProvider>
            </AuthProvider>
          </FirebaseCollectionsLoader>
        </BackendApiProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default Main;
