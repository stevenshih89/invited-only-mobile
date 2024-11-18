import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

//import components
import {AuthProvider} from 'contexts/AuthContext.tsx';
import LocalNotification from 'components/LocalNotification/LocalNotification.tsx';
import {EventProvider} from 'contexts/EventContext';
import {EventsDateProvider} from 'contexts/EventsDate';
import Navigator from './navigator';
import {Provider} from 'react-redux';
import {store} from 'redux/store';

const Main = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <Provider store={store}>
          <AuthProvider>
            <EventProvider>
              <EventsDateProvider>
                <Navigator />
                <LocalNotification />
              </EventsDateProvider>
            </EventProvider>
          </AuthProvider>
        </Provider>
      </View>
    </GestureHandlerRootView>
  );
};
export default Main;
