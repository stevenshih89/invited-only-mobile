import { FC, useCallback, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import useGetEvent from '../Chat/EventChats/hooks/useGetEvent';

import HostButton from '../JoinEvents/Components/EventCard/Components/HostButton/HostButton';
import EventInfo from '../JoinEvents/Components/EventCard/Components/EventInfo/EventInfo';
import * as S from './EventProfilePreview.style';
import ProfilePhotosList from './Components/ProfilePhotosList/EventPhotoslist';
import EventSlider from './Components/EventPhotoSlider/EventSlider';
import { blackColor } from 'constants/colors';
import { RootStackParamList } from 'typescript/types';




const EventProfilePreview: FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, '/event-profile-preview'>>();
  const { event } = route.params;


  if (!event) {
    return (
      <S.ProfileContainer>
        <ActivityIndicator style={{ flex: 1, backgroundColor: blackColor }} />
      </S.ProfileContainer>
    );
  }

  return (

    <S.SafeAreaContainer>
      <S.MainContainer>
        <S.ScrollContainer scrollEventThrottle={20} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <S.ContentContainer>
            <S.ProfileContainer>
              <EventSlider
                event={event}
              />
              <HostButton hostName={event?.hostName || ''} hostImage={event?.hostImage || ''} hostId={event?.hostId || ''} />
              <EventInfo event={event} />
              <ProfilePhotosList photosList={event.photos?.map(photo => photo.image || '') || []} />
            </S.ProfileContainer>
          </S.ContentContainer>
        </S.ScrollContainer>
      </S.MainContainer>
    </S.SafeAreaContainer>

  );
};

export default EventProfilePreview;
