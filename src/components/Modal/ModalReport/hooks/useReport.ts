import {useContext} from 'react';
import {components} from '@invited-only/invited-only-api';
import {showToast} from 'helpers/showToast';
import {BackendApiContext} from 'contexts/BackendApiContex';

interface UseReportProps {
  uidSender?: string;
  uid?: string;
  handleAutoSwipeLeft?: () => void;
  setModalReport: (value: boolean) => void;
  userData?: components['schemas']['User'];
}

export const useReport = ({uidSender, uid, setModalReport, userData}: UseReportProps) => {
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const {mutate: blockUser, isPending: isBlockUserPending} = invitedOnlyBackendApi.useMutation('post', '/report/block-user');

  const handleSendReport = async (typeReport: components['schemas']['BlockUserPayload']['reason']): Promise<void> => {
    blockUser(
      {
        body: {
          reportedId: uid,
          reportedBy: uidSender,
          reason: typeReport,
        },
      },
      {
        onSuccess: () => {
          showToast(
            'withImage',
            `You’ve blocked ${userData?.name || 'user'}, and your report has been submitted.`,
            'User Blocked & Report Sent',
            {image: userData?.photos?.[0]?.image},
          );
          setModalReport(false);
        },
        onError: error => {
          console.error(error);
          showToast('basic', '', 'Failed to report');
        },
      },
    );
  };

  return {
    isBlockUserPending,
    handleSendReport,
  };
};
