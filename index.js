import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
const queryClient = new QueryClient();

const AppWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <KeyboardProvider>
      <App />
    </KeyboardProvider>
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => AppWithQueryClient);
