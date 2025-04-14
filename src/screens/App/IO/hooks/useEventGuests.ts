import {components} from 'src/api/v1';
import invitedOnlyBackendApi from 'src/api/backend-api';

type GuestUser = components['schemas']['User'];

export const useEventGuests = (eventId: string | undefined) => {
  const {data, fetchNextPage, hasNextPage, isLoading, isFetching, isFetchingNextPage, error, status} =
    invitedOnlyBackendApi.useInfiniteQuery(
      'get',
      '/users/event/{eventId}',
      {
        params: {
          path: {
            eventId: eventId ?? '',
          },
        },
      },
      {
        getNextPageParam: (lastPage: GuestUser[], _allPages: GuestUser[][]) => {
          console.log('lastPage', lastPage);

          if (lastPage && lastPage.length > 0) {
            return lastPage[lastPage.length - 1].uid;
          }
          return undefined;
        },
        initialPageParam: undefined as string | undefined,
        pageParamName: 'lastdoc',
      },
    );

  return {
    guests: data?.pages.at(-1) ?? [],
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    error,
    status,
  };
};
