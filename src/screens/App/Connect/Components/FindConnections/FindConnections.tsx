import React, { useContext } from 'react';
import * as S from './FindConnections.style';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import Card from 'screens/App/Components/Card/Card';
import { BackendApiContext } from 'contexts/BackendApiContex';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';

const FindConnections = () => {
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const { data: userRespoonse, isLoading } = invitedOnlyBackendApi.useQuery('get', '/users/event/{eventId}', {
    params: {
      path: {
        eventId: 'no-user',
      },
    },
  });

  if (isLoading) {
    return (
      <DefaultBackground>
        <AppLoader />
      </DefaultBackground>
    );
  }
  return (
    <DefaultBackground>
      <S.Container>
        {userRespoonse?.map(user => (
          <Card isStatic key={user.uid} uid={user.uid || ''} backgroundUrls={user.photos || []} index={0} distanceFromTop={0}>
            <></>
          </Card>
        ))}
      </S.Container>
      <ModalLockedAccount />
    </DefaultBackground>
  );
};

export default FindConnections;
