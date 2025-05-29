import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//import components
import Navigator from './navigator/Navigator';
import invitedOnlyBackendApi from './api/backend-api';
import { useAuthStore } from './store/authStore';
import { FirebaseCollectionsResponse } from 'src/apiv2/queries/appSettingsQueries';
import { AuthProvider } from 'contexts/AuthContext.tsx';
import LocalNotification from 'components/LocalNotification/LocalNotification.tsx';
import { EventProvider } from 'contexts/EventContext';
import { EventsDateProvider } from 'contexts/EventsDate';
import FirebaseCollectionsProvider from 'contexts/FirebaseCollectionNamesContext';

import AppLoader from 'screens/App/AppLoader/AppLoader';
import { blackColor } from 'constants/colors';

const FirebaseCollectionsLoader = ({ children }: { children: React.ReactNode }) => {
  const { data: firebaseCollectionNames, isLoading } = invitedOnlyBackendApi?.useQuery('get', '/config/firebase/collections') as { data: FirebaseCollectionsResponse | undefined, isLoading: boolean };
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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: blackColor }}>
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
      </View>
    </GestureHandlerRootView>
  );
};

export default Main;
