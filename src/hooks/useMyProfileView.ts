import {User} from 'src/types/userInfo';
import {pipe} from 'helpers/pipe';
import { useCallback, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useAppNavigation } from './useAppNavigation';
import { useUser } from 'src/store/userStore';
import {profileEditingPath} from 'constants/pathLocations';
import firestore from '@react-native-firebase/firestore';
import { showToast } from 'helpers/showToast';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import { calculateAge } from 'helpers/calculateAge';
import Config from 'react-native-config';

const filterPhotos = (photos: User.Photo[]): User.Photo[] => photos.filter(p => p.image !== null);
const mapPhotos = (photos: User.Photo[]): (string | null)[] => photos.map(p => p.image);

const processUserPhotos = pipe<string[]>(filterPhotos, mapPhotos);

export const useMyProfileView = () => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [modalReport, setModalReport] = useState<boolean>(false);
  const [photosList, setPhotosList] = useState<string[]>([]);

  const route = useRoute();

  const isShowEditButton = route?.params?.isShowEditButton;
  const navigation = useAppNavigation();
  const userHost = useUser((i: any) => i?.user);

  

  const goToProfileEditing = (): void => {
    navigation.navigate(profileEditingPath as never);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchUserInfo = async () => {
        setLoading(true);
        const user = userHost?.uid;
        const uid = route?.params?.uid;
        if (user) {
          try {
            const userUid = uid !== undefined ? uid : user;
            const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(userUid).get();

            if (userInfoDoc?.exists) {
              setUserInfo(userInfoDoc?.data());
              const userPhotos = userInfoDoc?.data()?.photos;
              if (userPhotos?.length) {
                const mappedPhotos = processUserPhotos(userPhotos);
                setPhotosList(mappedPhotos);
              }
            } else {
              showToast('inviteMatch', 'No user data found', 'Error');
            }
          } catch (error: any) {
            showToast('inviteMatch', 'Failed to fetch user information. Please try again later.', 'Error');
            logErrorToSentry(error);
          }
          setLoading(false);
        }
      };
      fetchUserInfo();
    }, []),
  );

  const userAge = calculateAge(userInfo?.date);

  const handleScroll = (event: any) => {
    const positionY = event.nativeEvent.contentOffset.y;
    setScrollPosition(positionY);
  };

  const handleReport = () => {
    setModalReport(true);
  };

  return {
    loading,
    scrollPosition,
    photosList,
    isShowEditButton,
    modalReport,
    goToProfileEditing,
    userAge,
    handleScroll,
    handleReport,
    userInfo,
    setModalReport,
    userHost,
    route
  }
}