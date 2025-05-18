import { Dispatch, FC, SetStateAction } from 'react';
import { ActivityIndicator } from 'react-native';
import ProfileSlider from './components/ProfileSlider/ProfileSlider';
import * as S from './MyProfileView.style';
import Basics from './components/Basics/Basics';
import Bio from './components/Bio/Bio';
import Languages from './components/Languages/Languages';
import PhotosList from './components/PhotosList/Photoslist';
import ModalReport from 'components/Modal/ModalReport/ModalReport';
import ModalUserProfile from 'components/Modal/ModalUserProfile/ModalUserProfile.tsx';
import Man from 'assets/images/app/man-rectangle.png';
import { blackColor } from 'constants/colors';
import FemaleGenderIcon from 'src/assets/images/icons/female-gender.svg';
import invitedOnlyBackendApi from 'src/api/backend-api';
import { useAuthStore } from 'src/store/authStore';

interface MyProfileViewProps {
  isModalVisible?: boolean;
  setModalVisible?: Dispatch<SetStateAction<boolean>>;
}

const MyProfileView: FC<MyProfileViewProps> = ({ isModalVisible, setModalVisible }) => {
  const { userMetadata } = useAuthStore();
  const { data: userInfo, isLoading } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
    params: {
      path: {
        id: userMetadata.uid
      }
    }
  })

  if (isLoading || !userInfo) {
    return (
      <S.ProfileContainer>
        <ActivityIndicator style={{ flex: 1, backgroundColor: blackColor }} />
      </S.ProfileContainer>
    );
  }

  const getGenderIcon = (gender: 'man' | 'woman' | 'other') =>
    (
      ({
        man: <FemaleGenderIcon />,
        woman: <FemaleGenderIcon />,
      }) as any
    )[gender];

  const getGenderText = (gender: 'man' | 'woman' | 'other') =>
    ({
      man: 'He (His)',
      woman: 'She (Her)',
      other: 'They (Their)',
    })[gender];

  const calculateBirthday = (birthday: string | undefined): number => {
    if (!birthday) return 0;
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };
  return (
    <S.SafeAreaContainer>
      <ModalReport setModalReport={() => { }} uidSender={userInfo?.uid} uid={userInfo?.uid} />
      <S.MainContainer>
        <S.ScrollContainer
          scrollEventThrottle={20}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <S.ContentContainer>
            <S.ProfileContainer>
              <ProfileSlider photos={userInfo.photos?.map((photo) => photo.image || '') || []} userName={userInfo?.name || ''} isConfirmed={userInfo?.accountConfirmed || false} userAge={String(calculateBirthday(userInfo?.birthday))} />
              <Basics
                location={userInfo?.location || ''}
                homeAddress={userInfo?.homeAddress || ''}
                work={{ title: userInfo?.work?.title || '' }}
                gender={userInfo?.gender || 'other'}
                listOfInterestsImages={userInfo?.interests || []}
              />
              <Bio bio={userInfo?.bio || ''} />
              <Languages languages={userInfo?.languages || []} />
              <PhotosList photosList={userInfo.photos?.map((photo) => photo.image || '') || []} />
            </S.ProfileContainer>
            <ModalUserProfile title={'Alex'} image={Man} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
          </S.ContentContainer>
        </S.ScrollContainer>
      </S.MainContainer>
    </S.SafeAreaContainer>
  );
};

export default MyProfileView;
