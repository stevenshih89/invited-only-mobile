import { useCallback, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';
import { useAppNavigation } from './useAppNavigation';
import { User } from 'src/types/userInfo';
import { useUser } from 'src/store/userStore';
import { profileEditingPath } from 'constants/pathLocations';
import { showToast } from 'helpers/showToast';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import { calculateAge } from 'helpers/calculateAge';
import BirthdayParty from 'assets/images/auth/interests/birthday-party.png';
import Exclusive from 'assets/images/auth/interests/exclusive.png';
import PoolParty from 'assets/images/auth/interests/pool-party.png';
import Private from 'assets/images/auth/interests/private.png';
import Restaurant from 'assets/images/auth/interests/restaurant.png';
import VipTables from 'assets/images/auth/interests/vip-tables.png';
import YachtParty from 'assets/images/auth/interests/yacht-party.png';
import Concert from 'assets/images/auth/interests/concerts.png';

interface RouteParams {
  isShowEditButton?: boolean;
  uid?: string;
}

const filterPhotos = (photos: User.Photo[]): User.Photo[] => photos.filter(p => p.image !== null);
const mapPhotos = (photos: User.Photo[]): string[] => photos.map(p => p.image as string);

const processUserPhotos = (photos: User.Photo[]): string[] => {
  const filtered = filterPhotos(photos);
  return mapPhotos(filtered);
};

export const useMyProfileView = () => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [modalReport, setModalReport] = useState<boolean>(false);
  const [photosList, setPhotosList] = useState<string[]>([]);

  const route = useRoute() as { params: RouteParams };
  const routeParams = route.params as RouteParams;

  const isShowEditButton = routeParams?.isShowEditButton;
  const navigation = useAppNavigation();
  const userHost = useUser((i: any) => i?.user);

  const listOfInterestsImages = [
    { id: 0, image: VipTables },
    { id: 1, image: Concert },
    { id: 2, image: Exclusive },
    { id: 3, image: YachtParty },
    { id: 4, image: PoolParty },
    { id: 5, image: Private },
    { id: 6, image: BirthdayParty },
    { id: 7, image: Restaurant },
  ];

  const goToProfileEditing = (): void => {
    navigation.navigate(profileEditingPath as never);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchUserInfo = async () => {
        setLoading(true);
        const user = userHost?.uid;
        const uid = routeParams?.uid;
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
    route,
    listOfInterestsImages,
  };
};
