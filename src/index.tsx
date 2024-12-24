import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

//import components
import {AuthProvider} from 'contexts/AuthContext.tsx';
import LocalNotification from 'components/LocalNotification/LocalNotification.tsx';
import {EventProvider} from 'contexts/EventContext';
import {EventsDateProvider} from 'contexts/EventsDate';
import Navigator from './navigator';
import Config from 'react-native-config';

const Main = () => {
  console.warn('Config', Config);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <AuthProvider>
          <EventProvider>
            <EventsDateProvider>
              <Navigator />
              <LocalNotification />
            </EventsDateProvider>
          </EventProvider>
        </AuthProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default Main;
