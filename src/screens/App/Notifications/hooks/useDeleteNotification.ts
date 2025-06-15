import {components} from '@invited-only/invited-only-api';
import {useQueryClient} from '@tanstack/react-query';
import {useContext} from 'react';
import {showToast} from 'helpers/showToast';
import {BackendApiContext} from 'contexts/BackendApiContex';
import {useAuthStore} from 'src/store/authStore';

const useDeleteNotification = () => {
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const {mutate: deleteNotification, isPending: isDeletingNotification} = invitedOnlyBackendApi.useMutation(
    'delete',
    '/notifications/{id}',
  );
  const queryClient = useQueryClient();
  const {userMetadata} = useAuthStore();
  const handleDeleteNotification = (notificationId: string, shouldShowToast: boolean = true) => {
    deleteNotification(
      {params: {path: {id: notificationId}}},
      {
        onSuccess: () => {
          const removeNotification = (notificationId: string) => {
            queryClient.setQueryData(
              [
                'get',
                '/notifications/user/{userId}',
                {
                  params: {
                    path: {
                      userId: userMetadata?.uid,
                    },
                  },
                },
              ],
              (oldData: components['schemas']['Notification'][]) => {
                return oldData?.filter(item => item.id !== notificationId);
              },
            );
          };
          removeNotification(notificationId);
          if (shouldShowToast) {
            showToast('basic', 'Notification deleted successfully', 'Notification deleted');
          }
        },
        onError: (error: any) => {
          if (shouldShowToast) {
            showToast('basic', 'Notification deletion failed', error.message);
          }
        },
      },
    );
  };

  return {
    handleDeleteNotification,
    isDeletingNotification,
  };
};

export default useDeleteNotification;
