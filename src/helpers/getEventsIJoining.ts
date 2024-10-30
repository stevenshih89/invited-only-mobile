import { APPROVED_STATUS } from "constants/common";

export const getEventsIJoining = async (events: any[], userId: string)=> {
    try {
      const uid = userId
      const data = events?.docs?.map(i => i?.data());
      const filterData = data?.filter(obj => {
        return obj?.usersList?.some(user => {
          return (
            user?.uid === uid &&
            (user?.status === APPROVED_STATUS)
          );
        });
      });
      return filterData?.length ? filterData?.length : 0;
    } catch (e) {
      console.error('error fetching events:', e);
      return 0;
    }
  };