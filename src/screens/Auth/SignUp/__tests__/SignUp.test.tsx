import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {jest} from '@jest/globals';
import {NavigationContainer} from '@react-navigation/native';
import mockedApi from '../../../../../jest/mocks/backendApi.mock';
import SignUp from '../SignUp';
import {BackendApiContext} from 'contexts/BackendApiContex';
import {AuthContext} from 'contexts/AuthContext';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';

jest.mock('src/api/backend-api', () => mockedApi);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            gcTime: Infinity,
        },
        mutations: {},
    },
});

const mockAuthContext = {
    user: null,
    loading: false,
    signIn: jest.fn(),
    signOut: jest.fn(),
    onBoarding: [],
    setUser: jest.fn(),
    setOnBoarding: jest.fn(),
};

const mockBackendApi = {
    useMutation: () => ({
        mutate: jest.fn(),
        isPending: false,
    }),
};

const mockFirebaseCollections = {
    userInfo: {
        collection: jest.fn(),
    },
    userPhoneUids: 'userPhoneUids',
    attendees: 'attendees',
    connectionRequests: 'connectionRequests',
};

const renderComponent = () =>
    render(
        <NavigationContainer>
            <QueryClientProvider client={queryClient}>
                <FirebaseCollectionsContext.Provider
                    value={{
                        userInfo: 'test',
                        adminChats: 'adminChats',
                        admins: 'admins',
                        appSettings: 'appSettings',
                        messages: 'messages',
                        report: 'report',
                        unfinishedRegistrationUsers: 'unfinishedRegistrationUsers',
                        events: 'events',
                        userPhoneUids: 'userPhoneUids',
                        attendees: 'attendees',
                        connectionRequests: 'connectionRequests',
                    }}>
                    <AuthContext.Provider value={mockAuthContext}>
                        <BackendApiContext.Provider value={mockBackendApi as any}>
                            <SignUp />
                        </BackendApiContext.Provider>
                    </AuthContext.Provider>
                </FirebaseCollectionsContext.Provider>
            </QueryClientProvider>
        </NavigationContainer>,
    );

describe('SignUp Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });
    it('renders correctly', () => {
        const {getByText} = renderComponent();
        expect(getByText('Your phone')).toBeTruthy();
    });

    it('handles phone number input', () => {
        const {getByTestId} = renderComponent();
        const phoneInput = getByTestId('phone-input');
        fireEvent.changeText(phoneInput, '+1234567890');
        expect(phoneInput.props.value).toBe('+1234567890');
    });
});
