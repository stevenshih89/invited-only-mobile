import React from 'react';
import {render} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SuperJoin from '../SuperJoin';

jest.mock('src/store/authStore', () => ({
  useAuthStore: jest.fn().mockReturnValue({
    userMetadata: {
      superInvites: 0,
    },
  }),
}));

jest.mock('src/api/backend-api', () => ({
  __esModule: true,
  default: {
    useQuery: jest.fn().mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    }),
    useMutation: jest.fn().mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      error: null,
    }),
  },
}));

describe('SuperJoin', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithQueryClient = (component: React.ReactElement) => {
    return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
  };

  it('renders the title', () => {
    const {getByText} = renderWithQueryClient(<SuperJoin />);
    expect(getByText('Super Joins')).toBeTruthy();
  });

  it('shows default button text', () => {
    const {getByTestId} = renderWithQueryClient(<SuperJoin />);
    expect(getByTestId('super-join-button')).toBeTruthy();
  });
});
