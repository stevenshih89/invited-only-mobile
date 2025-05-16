import Bugsnag from "@bugsnag/react-native";
import { AppRegistry, LogBox } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import React from 'react';
import App from './src/App';
import { name as appName } from './app.json';


LogBox.ignoreLogs([
    'ViewPropTypes will be removed',
    'ColorPropType will be removed',
]);



Bugsnag.start();

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)


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
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <KeyboardProvider>
                    <App />
                </KeyboardProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};

// Register the app
AppRegistry.registerComponent(appName, () => AppWithProviders); 