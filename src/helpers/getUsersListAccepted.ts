import {ACCEPTED_STATUS} from 'constants/common';

interface usersListI {
  status: string;
}

export const getUsersListAccepted = (usersList: usersListI[]) => {
  const filter = usersList?.filter(item => item.status === ACCEPTED_STATUS);
  return filter?.length ? filter.length : 0;
};
