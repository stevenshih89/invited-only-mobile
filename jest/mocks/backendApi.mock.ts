import { jest } from '@jest/globals';

// Default return values for hooks
const mockQueryResult = (data = undefined) => ({
    data: data,
    isLoading: false,
    isFetching: false,
    isSuccess: data !== undefined,
    isError: false,
    error: null,
    refetch: jest.fn(),
    // Add other properties returned by useQuery if needed by tests
});

// Define a generic type for mutation options with onSuccess
type MockMutationOptions<TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown> = {
    onSuccess?: (data: TData, variables: TVariables, context: TContext) => void;
    // Add onError, onSettled etc. if needed for more complex mocks
};

const mockMutationResult = <TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown>() => ({
    // Use the generic type for the options parameter
    mutate: jest.fn((_variables: TVariables, options?: MockMutationOptions<TData, TError, TVariables, TContext>) =>
        options?.onSuccess?.({} as TData, {} as TVariables, {} as TContext) // Call onSuccess immediately for simplicity
    ),
    // Simplify mutateAsync mock to avoid complex type issues
    mutateAsync: jest.fn(() => Promise.resolve({})),
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
    data: undefined,
    reset: jest.fn(),
    // Add other properties returned by useMutation if needed by tests
});

// Mock the API client structure
const mockedInvitedOnlyBackendApi = {
    // Expose hooks directly at the top level
    useQuery: jest.fn().mockReturnValue(mockQueryResult()),
    useMutation: jest.fn().mockReturnValue(mockMutationResult()),
    // useInfiniteQuery: jest.fn().mockReturnValue(mockInfiniteQueryResult()), // Add if needed
    // You can keep the tag structure if needed for organization or 
    // specific overrides, but the direct methods are needed for the component
    Auth: {
        useMutation: jest.fn().mockReturnValue(mockMutationResult()),
    },
    Events: {
        useQuery: jest.fn().mockReturnValue(mockQueryResult()),
        useMutation: jest.fn().mockReturnValue(mockMutationResult()),
    },
    Users: {
        useQuery: jest.fn().mockReturnValue(mockQueryResult()), // Covers getUserById, getUserByPhone, getUsersForEvent_alt
        useMutation: jest.fn().mockReturnValue(mockMutationResult()), // Covers createUser, deleteUserAccount, updateUserAccount, addFcmTokenToUser
    },
    'Event Attendees': { // Tag names with spaces might need quoting depending on generation
        useQuery: jest.fn().mockReturnValue(mockQueryResult()), // Covers getPendingGuests, getEventInvitation, getGuestEventAttend, getHostEventAttend
        useMutation: jest.fn().mockReturnValue(mockMutationResult()), // Covers createEventAttend, updateEventAttend, deleteEventAttend
    },
    Config: {
        useQuery: jest.fn().mockReturnValue(mockQueryResult()), // Covers getRemoteConfigFlags, getFirebaseCollectionNames
    },
    Chat: {
        useQuery: jest.fn().mockReturnValue(mockQueryResult()), // Covers getChatsForUser, getChatsForEvent, getMessages
        useMutation: jest.fn().mockReturnValue(mockMutationResult()), // Covers createChat, createMessage, markChatAsSeen
    },
    // Add other tags if present in your YAML
};

export default mockedInvitedOnlyBackendApi; 