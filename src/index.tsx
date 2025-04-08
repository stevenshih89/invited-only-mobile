import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

//import components
import {AuthProvider} from 'contexts/AuthContext.tsx';
import LocalNotification from 'components/LocalNotification/LocalNotification.tsx';
import {EventProvider} from 'contexts/EventContext';
import {EventsDateProvider} from 'contexts/EventsDate';
import FirebaseCollectionsProvider from 'contexts/FirebaseCollectionNamesContext';
import {AppSettingsQueries} from './apiv2/queries/appSettingsQueries';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import Navigator from './navigator';
import {blackColor, goldColor} from 'constants/colors';

const Main = () => {
  const {data: firebaseCollectionNames, isLoading} = AppSettingsQueries.useFirebaseCollectionNameQuery();

  if (isLoading) {
    return <AppLoader />;
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: blackColor}}>
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
