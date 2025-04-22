import {Dispatch, SetStateAction} from 'react';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {showToast} from 'helpers/showToast';
import {UserMutations} from 'src/apiv2/mutations/userMutations';
import {useCounterSuperEvents} from 'src/store/counterSuperInvites';
import {useUser} from 'src/store/userStore';
import {UserInfo} from 'src/types/userInfo';

interface UseSuperInviteProps {
  onInvite: (uid: string, id: string, superInvite?: boolean) => Promise<void>;
  setIsVisibleSuperInvite: Dispatch<SetStateAction<boolean>>;
  setActiveSuperInviteUser: Dispatch<SetStateAction<UserInfo>>;
  setVisibleModalSuperJoin: Dispatch<SetStateAction<boolean>>;
}

export const useSuperInvite = ({
  onInvite,
  setIsVisibleSuperInvite,
  setActiveSuperInviteUser,
  setVisibleModalSuperJoin,
}: UseSuperInviteProps) => {
  const {user: userInfo} = useUser();
  const updateSuperInvites = UserMutations.useUpdateSuperInvites();
  const {decrementCounterSuperInvites} = useCounterSuperEvents();

  const handleSuperJoin = () => {
    if (userInfo?.superInvites > 0 || userInfo?.weeklySuperInvites > 0) {
      setVisibleModalSuperJoin(true);
      setTimeout(() => {
        setVisibleModalSuperJoin(false);
      }, 4000);
    } else {
      showToast('inviteMatch', "You don't have Super Joins", 'Super Join');
    }
  };

  const decrementSuperInvite = async (item: UserInfo, coinAnimationTimer = 0) => {
    try {
      if (userInfo?.accountType === 'host') {
        setTimeout(() => {
          setIsVisibleSuperInvite(true);
        }, coinAnimationTimer);
        await onInvite(item?.uid, item?.id, true);
      } else {
        handleSuperJoin();
        await onInvite(item?.uid, item?.id, true);
      }

      if (userInfo?.weeklySuperInvites > 0) {
        updateSuperInvites.mutate({
          uid: userInfo.uid,
          newInvites: {weeklySuperInvites: userInfo.weeklySuperInvites - 1},
        });
      } else if (userInfo?.superInvites > 0) {
        updateSuperInvites.mutate({
          uid: userInfo.uid,
          newInvites: {superInvites: userInfo.superInvites - 1},
        });
      }
    } catch (error) {
      logErrorToSentry(error);
      console.log('error super invite', error);
    }
  };

  const handleOpenSuperInvite = (item: UserInfo, coinAnimationTimer: number): void => {
    setActiveSuperInviteUser(item);
    decrementSuperInvite(item, coinAnimationTimer);
    decrementCounterSuperInvites(1);
  };

  return {
    handleOpenSuperInvite,
  };
};
