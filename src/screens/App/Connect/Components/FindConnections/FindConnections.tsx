import React from 'react';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import {EventQueries} from 'src/apiv2/queries/eventQueries';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import * as S from './FindConnections.style';
import Card from 'screens/App/Components/Card/Card';
import LockedFeatureComponent from 'screens/App/Components/LockedFeatureComponent/LockedFeatureComponent';

const FindConnections = () => {
  const {data: userRespoonse, isLoading} = EventQueries.useGetUserForEvent('temp-user');
  if (isLoading) {
    return <AppLoader />;
  }
  return (
    <DefaultBackground>
      <S.Container>
        {userRespoonse?.users.map(user => (
          <Card isStatic key={user.uid} uid={user.uid} backgroundUrls={user.photos} index={0} distanceFromTop={0}>
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
    </DefaultBackground>
  );
};

export default FindConnections;
