import { AppRegistry, LogBox } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import React from 'react';
import App from './src/App';
import { name as appName } from './app.json';

// Ignore specific warnings if needed
LogBox.ignoreLogs([
    'ViewPropTypes will be removed',
    'ColorPropType will be removed',
]);

// Create a stable instance of QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

// Wrap the app with necessary providers
const AppWithProviders: React.FC = () => {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <KeyboardProvider>
                    <App />
                </KeyboardProvider>
            </QueryClientProvider>
        </React.StrictMode>
    );
};

// Register the app
AppRegistry.registerComponent(appName, () => AppWithProviders); 