import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//import components
import Navigator from './navigator/Navigator';
import invitedOnlyBackendApi from './api/backend-api';
import { useAuthStore } from './store/authStore';
import { AuthProvider } from 'contexts/AuthContext.tsx';
import LocalNotification from 'components/LocalNotification/LocalNotification.tsx';
import { EventProvider } from 'contexts/EventContext';
import { EventsDateProvider } from 'contexts/EventsDate';
import FirebaseCollectionsProvider from 'contexts/FirebaseCollectionNamesContext';

import AppLoader from 'screens/App/AppLoader/AppLoader';
import { blackColor } from 'constants/colors';

const Main = () => {
  const { data: firebaseCollectionNames, isLoading } = invitedOnlyBackendApi.useQuery('get', '/config/firebase/collections');
  const { isStorageReady } = useAuthStore();

  if (isLoading || !isStorageReady) {
    return <AppLoader />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: blackColor }}>
        <FirebaseCollectionsProvider firebaseCollectionNames={firebaseCollectionNames}>
          <AuthProvider>
            <EventProvider>
              <EventsDateProvider>
                <Navigator />
                <LocalNotification />
              </EventsDateProvider>
            </EventProvider>
          </AuthProvider>
        </FirebaseCollectionsProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default Main;
