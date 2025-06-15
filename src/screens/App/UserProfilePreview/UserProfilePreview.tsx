import {Dispatch, FC, SetStateAction, useCallback, useContext, useRef} from 'react';
import {ActivityIndicator} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {RouteProp, useRoute} from '@react-navigation/native';
import ProfileSlider from './Components/ProfilePhotoSlider/ProfilePhotoSlider';
import * as S from './UserProfilePreview.style';
import ProfileBasics from './Components/ProfileBasics/ProfileBasics';
import ProfileBio from './Components/ProfileBio/ProfileBio';
import ProfileLanguages from './Components/ProfileLanguages/ProfileLanguages';
import ProfilePhotosList from './Components/ProfilePhotosList/ProfilePhotoslist';
import ModalReport from 'components/Modal/ModalReport/ModalReport';
import ModalUserProfile from 'components/Modal/ModalUserProfile/ModalUserProfile.tsx';
import {blackColor} from 'constants/colors';
import {useAuthStore} from 'src/store/authStore';
import {RootStackParamList} from 'typescript/types';
import {BackendApiContext} from 'contexts/BackendApiContex';

interface UserProfilePreviewProps {
  isModalVisible?: boolean;
  setModalVisible?: Dispatch<SetStateAction<boolean>>;
}

const UserProfilePreview: FC<UserProfilePreviewProps> = ({isModalVisible, setModalVisible}) => {
  const {userMetadata} = useAuthStore();
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const route = useRoute<RouteProp<RootStackParamList, '/user-profile-preview'>>();
  const {userUid} = route.params;

  const modalReportRef = useRef<BottomSheetModal>(null);
  const {data: userInfo, isLoading} = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
    params: {
      path: {
        id: userUid,
      },
    },
  });

  const handleBlockAndReport = useCallback(() => {
    modalReportRef.current?.present();
  }, []);

  if (isLoading || !userInfo) {
    return (
      <S.ProfileContainer>
        <ActivityIndicator style={{flex: 1, backgroundColor: blackColor}} />
      </S.ProfileContainer>
    );
  }

  return (
    <BottomSheetModalProvider>
      <S.SafeAreaContainer>
        <ModalReport ref={modalReportRef} setModalReport={() => {}} userData={userInfo} uidSender={userMetadata?.uid} uid={userInfo?.uid} />
        <S.MainContainer>
          <S.ScrollContainer scrollEventThrottle={20} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <S.ContentContainer>
              <S.ProfileContainer>
                <ProfileSlider
                  photos={userInfo.photos?.map(photo => photo.image || '') || []}
                  userName={userInfo?.name || ''}
                  isShowAge={userInfo?.showAge || false}
                  isConfirmed={userInfo?.accountConfirmed || false}
                  userBirthday={userInfo?.birthday || userInfo?.date || ''}
                />
                <ProfileBasics
                  location={userInfo?.location || ''}
                  homeAddress={userInfo?.homeAddress || ''}
                  work={{title: userInfo?.work?.title || ''}}
                  gender={userInfo?.gender || 'other'}
                  listOfInterestsImages={userInfo?.interests || []}
                />
                <ProfileBio bio={userInfo?.bio || ''} />
                <ProfileLanguages languages={userInfo?.languages || []} />
                <ProfilePhotosList photosList={userInfo.photos?.map(photo => photo.image || '') || []} />
                <S.BlockAndReportContainer>
                  <S.BlockAndReportButton onPress={handleBlockAndReport}>
                    <S.BlockText>Block and Report</S.BlockText>
                  </S.BlockAndReportButton>
                </S.BlockAndReportContainer>
              </S.ProfileContainer>
              <ModalUserProfile
                title={userInfo?.name || ''}
                image={userInfo?.photos?.[0]?.image || ''}
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
              />
            </S.ContentContainer>
          </S.ScrollContainer>
        </S.MainContainer>
      </S.SafeAreaContainer>
    </BottomSheetModalProvider>
  );
};

export default UserProfilePreview;
