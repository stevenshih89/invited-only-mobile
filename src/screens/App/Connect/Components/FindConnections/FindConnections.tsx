import React from 'react';
import * as S from './FindConnections.style';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import Card from 'screens/App/Components/Card/Card';
import LockedFeatureComponent from 'screens/App/Components/LockedFeatureComponent/LockedFeatureComponent';
import invitedOnlyBackendApi from 'src/api/backend-api';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';

const FindConnections = () => {
  const {data: userRespoonse, isLoading} = invitedOnlyBackendApi.useQuery('get', '/users/event/{eventId}', {
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
          <Card isStatic key={user.uid} uid={user.uid} backgroundUrls={user.photos || []} index={0} distanceFromTop={0}>
            <LockedFeatureComponent
              hostName={''}
              withHostBadge={false}
              hostImage={'Comming soon'}
              lockedBigText={'Comming Soon'}
              lockedSmallText="Connect Comming Soon"
            />
          </Card>
        ))}
      </S.Container>
      <ModalLockedAccount />
    </DefaultBackground>
  );
};

export default FindConnections;
