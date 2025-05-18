import { components } from '@invited-only/invited-only-api';
import { showToast } from 'helpers/showToast';
import invitedOnlyBackendApi from 'src/api/backend-api';

interface UseReportProps {
  uidSender?: string;
  uid?: string;
  handleAutoSwipeLeft?: () => void;
  setModalReport: (value: boolean) => void;
}

export const useReport = ({ uidSender, uid, setModalReport }: UseReportProps) => {
  const { mutate: blockUser, isPending: isBlockUserPending } = invitedOnlyBackendApi.useMutation('post', '/report/block-user');

  const handleSendReport = async (typeReport: components['schemas']['BlockUserPayload']['reason']): Promise<void> => {
    blockUser({
      body: {
        reportedId: uid,
        reportedBy: uidSender,
        reason: typeReport,
      },
    }, {
      onSuccess: () => {
        showToast('inviteMatch', 'Report sent', 'Report sent', { status: 'success' });
        setModalReport(false);
      },
      onError: (error) => {
        console.error(error);
        showToast('inviteMatch', 'Report failed', 'Report failed', { status: 'error' });
      },
    });
  };


  return {
    isBlockUserPending,
    handleSendReport,
  };
};
