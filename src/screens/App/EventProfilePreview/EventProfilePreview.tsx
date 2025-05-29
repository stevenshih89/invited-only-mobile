import {FC, useRef} from 'react';
import {ActivityIndicator} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import HostButton from '../JoinEvents/Components/EventCard/Components/HostButton/HostButton';
import EventInfo from '../JoinEvents/Components/EventCard/Components/EventInfo/EventInfo';
import * as S from './EventProfilePreview.style';
import EventSlider from './Components/EventPhotoSlider/EventSlider';
import EventPhotosList from './Components/EventPhotosList/EventPhotosList';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {blackColor} from 'constants/colors';
import {RootStackParamList} from 'typescript/types';
import ModalReport from 'components/Modal/ModalReport/ModalReport';
import {useAuthStore} from 'src/store/authStore';

const EventProfilePreview: FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, '/event-profile-preview'>>();
  const {event} = route.params;
  const ref = useRef<BottomSheetModal>(null);
  const {userMetadata} = useAuthStore();
  const navigation = useAppNavigation();

  if (!event) {
    return (
      <S.ProfileContainer>
        <ActivityIndicator style={{flex: 1, backgroundColor: blackColor}} />
      </S.ProfileContainer>
    );
  }

  return (
    <BottomSheetModalProvider>
      <S.SafeAreaContainer>
        <S.MainContainer>
          <S.ScrollContainer scrollEventThrottle={20} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <S.ContentContainer>
              <S.ProfileContainer>
                <EventSlider event={event} />
                <HostButton hostName={event?.hostName || ''} hostImage={event?.hostImage || ''} hostId={event?.hostId || ''} />
                <EventInfo event={event} />
                <EventPhotosList photosList={event.photos?.map(photo => photo.image || '') || []} />
              </S.ProfileContainer>
            </S.ContentContainer>
            <S.BlockAndReportContainer>
              <S.BlockAndReportButton onPress={() => ref.current?.present()}>
                <S.BlockText>Block and Report</S.BlockText>
              </S.BlockAndReportButton>
            </S.BlockAndReportContainer>
          </S.ScrollContainer>
        </S.MainContainer>
        <ModalReport
          ref={ref}
          uidSender={userMetadata?.uid || ''}
          uid={event?.hostId || ''}
          handleAutoSwipeLeft={() => {}}
          onSubmit={() => {
            navigation.goBack();
          }}
        />
      </S.SafeAreaContainer>
    </BottomSheetModalProvider>
  );
};

export default EventProfilePreview;
