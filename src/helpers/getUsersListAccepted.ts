interface usersListI {
    status: string
}

export const getUsersListAccepted = (usersList: usersListI[]) => {
    const filter = usersList?.filter(item => item.status === 'invite_match');
    return filter?.length? filter.length: 0;
  };