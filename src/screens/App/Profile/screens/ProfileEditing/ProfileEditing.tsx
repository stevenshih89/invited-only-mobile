import {blackColor, transparentWhite16Color} from 'constants/colors';
import {FC, ReactElement, useEffect, useMemo, useRef, useState} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import MyPhotos from './MyPhotos';
import MyInterests from './MyInterests';
import {isIos, screenHeight} from 'constants/common';
import MyBio from './MyBio';
import LanguagesKnow from './LanguagesKnow';
import Button from 'components/Button/Button';
import MyBasics from './MyBasics';
import ModalSmoke from './ModalSmoke';
import ModalGender from './ModalGender';
import ModalHeight from './ModalHeight';
import ModalWork from './ModalWork';
import ModalAlcohol from './ModalAlcohol';
import ModalBirthday from './ModalBirthday';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ModalLocation from './ModalLocation';
import ModalHomeAdress from './ModalHomeAdress';
import {showToast} from 'helpers/showToast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {profileEditing, profileScreen} from 'constants/analitycs';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
const ProfileEditing: FC = (): ReactElement => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const [isVisibleSmokeModal, setIsVisibleSmokeModal] = useState<boolean>(false);
  const [isVisibleGenderModal, setIsVisibleGenderModal] = useState<boolean>(false);
  const [isVisibleHeightModal, setIsVisibleHeightModal] = useState<boolean>(false);
  const [isVisibleWorkModal, setIsVisibleWorkModal] = useState<boolean>(false);
  const [isVisibleAlcoholModal, setIsVisibleAlcoholModal] = useState<boolean>(false);
  const [isVisibleBirthdayModal, setIsVisibleBirthdayModal] = useState<boolean>(false);
  const [loadingSaveInterests, setLoadingSaveInterests] = useState<boolean>(false);
  const [loadingSaveBoi, setLoadingSaveBio] = useState<boolean>(false);
  const [interestsLoading, setInterestsLoading] = useState<boolean>(false);
  const [isVisibleLocationModal, setIsVisibleLocationModal] = useState<boolean>(false);
  const [isVisibleHomeAddressModal, setIsVisibleHomeAddressModal] = useState<boolean>(false);

  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [showWork, setShowWork] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [showHomeAdress, setShowHomeAdress] = useState<boolean>(false);
  const [textHomeAdress, setTextHomeAdress] = useState<string>('');
  // const [activeWorkItem, setActiveWorkItem] = useState(null);
  const [textNameWork, setTextNameWork] = useState<string>('');
  const [textDescription, setTextDescription] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [showGender, setShowGender] = useState(false);
  const [activeGenderItem, setActiveGenderItem] = useState<{title: string} | null>(null);
  const [showAlcohol, setShowAlcohol] = useState(false);
  const [activeAlcoholItem, setActiveAlcoholItem] = useState<{title: string} | null>(null);
  const [showSmoke, setShowSmoke] = useState(false);
  const [activeSmokeItem, setActiveSmokeItem] = useState<{id: number; title: string} | null>(null);
  const [showHeight, setShowHeight] = useState(false);
  const [height, setHeight] = useState<string | null>(null);
  const [saveBtnInterestsVisible, setSaveBtnInterestsVisible] = useState(false);
  const [oldListInterests, setOldListInterests] = useState<{}[]>([]);
  const [saveBtnBioVisible, setSaveBtnBiosVisible] = useState<boolean>(false);
  const [oldBio, setOldBio] = useState('');

  const bithdate = useMemo(() => `${month.length ? `${month}.` : ''}${day.length ? `${day}.` : ''}${year}`, [isVisibleBirthdayModal, year]);
  const heightsList = useMemo(() => Array.from({length: 61}, (_, i) => ({id: i, value: i + 150, label: `${i + 150} cm`})), []);

  const [listOfSmokes] = useState([
    {
      id: 0,
      title: 'Socialy',
    },
    {
      id: 1,
      title: 'Requlary',
    },
    {
      id: 2,
      title: 'Never',
    },
  ]);

  const [listOfAlcohols] = useState([
    {
      id: 0,
      title: 'Beer',
    },
    {
      id: 1,
      title: 'Wine',
    },
    {
      id: 2,
      title: 'Spirits (vodka, rum, whiskey, gin)',
    },
    {
      id: 3,
      title: 'Liqueurs (Baileys, Amaretto)',
    },
    {
      id: 4,
      title: 'Cider',
    },
    {
      id: 5,
      title: 'Other',
    },
    {
      id: 6,
      title: "I don't drink alcohol",
    },
  ]);

  const [images, setImages] = useState<{image: null | string; id: number}[]>([
    {
      id: 0,
      image: null,
    },
    {
      id: 1,
      image: null,
    },
    {
      id: 2,
      image: null,
    },
    {
      id: 3,
      image: null,
    },
    {
      id: 4,
      image: null,
    },
    {
      id: 5,
      image: null,
    },
  ]);

  const previousImages = useRef(images);

  const [listOfGenders] = useState([
    {
      id: 0,
      title: 'man',
    },
    {
      id: 1,
      title: 'woman',
    },
    {
      id: 2,
      title: 'other',
    },
  ]);

  const [listOfInterests, setListOfInterests] = useState([
    {id: 0, title: 'Vip Tables', isSelected: false},
    {id: 1, title: 'Concerts', isSelected: false},
    {id: 2, title: 'Exclusive', isSelected: false},
    {id: 3, title: 'Yacht Party', isSelected: false},
    {id: 4, title: 'Pool Party', isSelected: false},
    {id: 5, title: 'Private', isSelected: false},
    {id: 6, title: 'Birthday Party', isSelected: false},
    {id: 7, title: 'Restaurant', isSelected: false},
  ]);

  const areArraysEqual = () => {
    if (listOfInterests.length !== oldListInterests.length) {
      return false;
    }

    return listOfInterests.every((item, index) => {
      return item.isSelected === oldListInterests[index].isSelected;
    });
  };
  useEffect(() => {
    const arrayEqual = areArraysEqual();
    if (!arrayEqual && listOfInterests.length && oldListInterests.length) {
      setSaveBtnInterestsVisible(true);
    } else {
      setSaveBtnInterestsVisible(false);
    }
  }, [listOfInterests, oldListInterests]);

  const uploadImage = async (imagePath: string | null, userId: string | null) => {
    if (imagePath === null) {
      return null;
    }
    if (imagePath.includes('firebasestorage') || imagePath.includes('http')) {
      return imagePath;
    }
    const uploadUri = isIos ? imagePath.replace('file://', '') : imagePath;
    const filename = `${userId}_${new Date().getTime()}`;
    const storageRef = storage().ref(`images/${filename}`);
    const task = storageRef.putFile(uploadUri);
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Something went wrong');
      return null;
    }
  };

  const updatePhotosImage = async (userId: string, imageUrl: any[]) => {
    try {
      await firestore().collection(apiUserInfoCollection).doc(userId).update({
        photos: imageUrl,
      });
    } catch (e: any) {
      showToast('inviteMatch', 'Failed to update profile photos. Please try again.', 'Error');
      logErrorToSentry(e)
      // console.error('Error updating user profile image: ', e);
    }
  };

  const setDefaultInterests = (userInterests: any[]) => {
    const newListOfInterests = listOfInterests.map(interest => {
      const isSelected = userInterests.some(item => item.id === interest.id);
      return {...interest, isSelected};
    });
    setListOfInterests(newListOfInterests);
    setOldListInterests(newListOfInterests);
  };

  const setDefaultBio = (userBio: string) => {
    setBio(userBio);
    setOldBio(userBio);
  };

  useEffect(() => {
    if (oldBio !== bio) {
      setSaveBtnBiosVisible(true);
    } else {
      setSaveBtnBiosVisible(false);
    }
  }, [bio, oldBio]);

  const fetchUserInfo = async () => {
    setInterestsLoading(true);
    const user = auth().currentUser;
    if (user) {
      try {
        const documentSnapshot = await firestore().collection(apiUserInfoCollection).doc(user.uid).get();
        const userData = documentSnapshot.data();
        const updatedImages = images.map(item => {
          const photo = userData?.photos?.[item.id];
          return {
            id: item.id,
            image: photo ? photo.image : item.image,
          };
        });

        if (documentSnapshot.data()?.interests) {
          setDefaultInterests(documentSnapshot.data()?.interests);
        }
        if (documentSnapshot.data()?.bio) {
          setDefaultBio(documentSnapshot.data()?.bio);
        }
        if (documentSnapshot.data()?.work) {
          setTextNameWork(documentSnapshot.data()?.work.title);
        }
        if (documentSnapshot.data()?.showWork) {
          setShowWork(documentSnapshot.data()?.showWork);
        }
        if (documentSnapshot.data()?.gender) {
          setActiveGenderItem(documentSnapshot.data()?.gender);
        }
        if (documentSnapshot.data()?.showGender) {
          setShowGender(documentSnapshot.data()?.showGender);
        }
        if (documentSnapshot.data()?.photos) {
          setImages(updatedImages);
        }
        if (documentSnapshot.data()?.date) {
          setMonth(documentSnapshot.data()?.date.split('.')[0]);
          setDay(documentSnapshot.data()?.date.split('.')[1]);
          setYear(documentSnapshot.data()?.date.split('.')[2]);
        }
        if (documentSnapshot.data()?.showAge) {
          setShowAge(documentSnapshot.data()?.showAge);
        }
        if (documentSnapshot.data()?.alcohol) {
          setActiveAlcoholItem(documentSnapshot.data()?.alcohol);
        }
        if (documentSnapshot.data()?.showAlcohol) {
          setShowAlcohol(documentSnapshot.data()?.showAlcohol);
        }
        if (documentSnapshot.data()?.height) {
          setHeight(documentSnapshot.data()?.height);
        }
        if (documentSnapshot.data()?.showHeigth) {
          setShowHeight(documentSnapshot.data()?.showHeigth);
        }
        if (documentSnapshot.data()?.smoke) {
          setActiveSmokeItem(documentSnapshot.data()?.smoke);
        }
        if (documentSnapshot.data()?.showSmoke) {
          setShowSmoke(documentSnapshot.data()?.showSmoke);
        }
        if (documentSnapshot.data()?.showLocation) {
          setShowLocation(documentSnapshot.data()?.showLocation);
        }
        if (documentSnapshot.data()?.location) {
          setLocation(documentSnapshot.data()?.location);
        }
        if (documentSnapshot.data()?.showHomeAddress) {
          setShowHomeAdress(documentSnapshot.data()?.showHomeAddress);
        }
        if (documentSnapshot.data()?.homeAddress) {
          setTextHomeAdress(documentSnapshot.data()?.homeAddress);
        }
      } catch (error: any) {
        showToast('inviteMatch', 'Failed to load profile data. Please try again.', 'Error');
        logErrorToSentry(error);
      }
      setInterestsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    // // console.log('fetchUserInfo');
    try {
      analytics().logScreenView({
        screen_name: `${profileScreen}_${profileEditing}`,
      });
    } catch (e) {
      console.error(e);
    }
  }, [setShowGender, setActiveGenderItem]);

  const fetchImages = async (user: any) => {
    const allImagesUrl: any = [];

    const mainImgId = images.findIndex(({id}) => id === 0);
    const secondImgId = images.findIndex(({id}) => id === 1);
    const thirdImgId = images.findIndex(({id}) => id === 2);
    const fourthImId = images.findIndex(({id}) => id === 3);
    const fifthImId = images.findIndex(({id}) => id === 4);
    const sixthImId = images.findIndex(({id}) => id === 5);

    await uploadImage(images[mainImgId].image, user.uid).then(async image => {
      allImagesUrl.push({id: images[mainImgId].id, image});
    });
    await uploadImage(images[secondImgId].image, user.uid).then(async image => {
      allImagesUrl.push({id: images[secondImgId].id, image});
    });
    await uploadImage(images[thirdImgId].image, user.uid).then(async image => {
      allImagesUrl.push({id: images[thirdImgId].id, image});
    });
    await uploadImage(images[fourthImId].image, user.uid).then(async image => {
      allImagesUrl.push({id: images[fourthImId].id, image});
    });
    await uploadImage(images[fifthImId].image, user.uid).then(async image => {
      allImagesUrl.push({id: images[fifthImId].id, image});
    });
    await uploadImage(images[sixthImId].image, user.uid).then(async image => {
      allImagesUrl.push({id: images[sixthImId].id, image});
    });
    await updatePhotosImage(user.uid, allImagesUrl);

    // // console.log('allImagesUrl', allImagesUrl);
  };

  const checkSaveField = (saveField: string, status: boolean) => {
    if (saveField === SAVE_FIELD_INTERESTS) {
      setLoadingSaveInterests(status);
    }
    if (saveField === SAVE_FIELD_BIO) {
      setLoadingSaveBio(status);
    }
  };

  useEffect(() => {
    const user = auth().currentUser;
    if (images.length && images.find(image => image?.id === 0 && image?.image && !images.every(image => image?.image?.includes('http')))) {
      const areImagesEqual = (prevImages: any[], currentImages: any[]) => {
        if (prevImages.length !== currentImages.length) {
          return false;
        }
        return prevImages.every((img, index) => img.image === currentImages[index].image);
      };

      if (!areImagesEqual(previousImages.current, images)) {
        fetchImages(user);
        previousImages.current = images;
      }
    }
  }, [images]);

  const SAVE_FIELD_INTERESTS = 'interests';
  const SAVE_FIELD_BIO = 'bio';

  const saveUserInfo = async (title?: 'string', saveField?: string) => {
    if (saveField) {
      checkSaveField(saveField, true);
    }
    const user = auth().currentUser;
    if (user) {
      const reqInterestsNew = listOfInterests.reduce((acc: any[], curr) => {
        if (curr.isSelected) {
          acc.push({id: curr.id, title: curr.title});
        }
        return acc;
      }, []);

      const reqInterestsOld = oldListInterests.reduce((acc: any[], curr) => {
        if (curr.isSelected) {
          acc.push({id: curr.id, title: curr.title});
        }
        return acc;
      }, []);

      try {
        await firestore()
          .collection(apiUserInfoCollection)
          .doc(user.uid)
          .update({
            interests: saveField === SAVE_FIELD_INTERESTS ? reqInterestsNew : reqInterestsOld,
            bio: saveField === SAVE_FIELD_BIO ? bio : oldBio,
            work: {title: textNameWork, description: textDescription},
            showWork,
            date: `${day}.${month}.${year}`,
            showGender,
            showAge,
            alcohol: activeAlcoholItem,
            showAlcohol,
            smoke: activeSmokeItem,
            showSmoke,
            height,
            showHeight,
            location,
            showLocation,
            homeAddress: textHomeAdress,
            showHomeAddress: showHomeAdress,
          })
          .then(() => {
            if (title && typeof title === 'string') {
              showToast('inviteMatch', 'Your profile is updated', `${title} successfully changed!`, {
                ownerPhoto: images[0].image,
                status: 'UPDATED',
              });
            } else {
              if (saveField === SAVE_FIELD_INTERESTS) {
                setSaveBtnInterestsVisible(false);
                setOldListInterests(listOfInterests);
              }
              if (saveField === SAVE_FIELD_BIO) {
                setSaveBtnBiosVisible(false);
                setOldBio(bio);
              }
              showToast('inviteMatch', 'Your profile is updated', 'success!', {
                ownerPhoto: images[0].image,
                status: 'UPDATED',
              });
            }
          })
          .then(async () => {
            await fetchImages(user);
          });
      } catch (error: any) {
        // console.log(error?.message);
        // Alert.alert('Error', error.message || 'Something went wrong');
        logErrorToSentry(error)
        if (saveField) {
          checkSaveField(saveField, false);
        }
      }
      if (saveField) {
        checkSaveField(saveField, false);
      }
    }
  };

  // // console.log('activeWorkItem', activeWorkItem);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: blackColor}}>
        <View style={{flex: 1, paddingTop: screenHeight / 48, paddingHorizontal: 20}}>
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            enableResetScrollToCoords={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 80}}
            style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
            <MyPhotos images={images} setImages={setImages} />
            <MyInterests listOfInterests={listOfInterests} setListOfInterests={setListOfInterests} loading={interestsLoading} />
            {saveBtnInterestsVisible && (
              <Button
                title="Save"
                buttonStyle={{marginTop: 20}}
                onPress={() => saveUserInfo('', SAVE_FIELD_INTERESTS)}
                loading={loadingSaveInterests}
              />
            )}
            <MyBio bio={bio} setBio={setBio} />
            {saveBtnBioVisible && (
              <Button
                title="Save"
                buttonStyle={{marginTop: 20}}
                onPress={() => saveUserInfo('', SAVE_FIELD_BIO)}
                loading={loadingSaveBoi}
              />
            )}
            <MyBasics
              // activeWorkItem={activeWorkItem}
              work={textNameWork}
              activeAlcoholItem={activeAlcoholItem}
              activeSmokeItem={activeSmokeItem}
              height={height}
              date={bithdate}
              location={location}
              homeAddress={textHomeAdress}
              setIsVisibleSmokeModal={setIsVisibleSmokeModal}
              setIsVisibleGenderModal={setIsVisibleGenderModal}
              setIsVisibleHeightModal={setIsVisibleHeightModal}
              setIsVisibleWorkModal={setIsVisibleWorkModal}
              setIsVisibleAlcoholModal={setIsVisibleAlcoholModal}
              setIsVisibleBirthdayModal={setIsVisibleBirthdayModal}
              setIsVisibleLocationModal={setIsVisibleLocationModal}
              setIsVisibleHomeAddressModal={setIsVisibleHomeAddressModal}
            />
            <LanguagesKnow />
            {/* <Button title="Save" buttonStyle={{marginTop: 34}} onPress={saveUserInfo} loading={loadingSave} /> */}
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
      <ModalSmoke
        saveUserInfo={saveUserInfo}
        showSmoke={showSmoke}
        setShowSmoke={setShowSmoke}
        activeSmokeItem={activeSmokeItem}
        setActiveSmokeItem={setActiveSmokeItem}
        listOfSmokes={listOfSmokes}
        isVisible={isVisibleSmokeModal}
        onClose={() => setIsVisibleSmokeModal(false)}
      />
      <ModalGender
        saveUserInfo={saveUserInfo}
        showGender={showGender}
        setShowGender={setShowGender}
        activeGenderItem={activeGenderItem}
        setActiveGenderItem={setActiveGenderItem}
        listOfGenders={listOfGenders}
        isVisible={isVisibleGenderModal}
        onClose={() => setIsVisibleGenderModal(false)}
      />
      <ModalHeight
        saveUserInfo={saveUserInfo}
        showHeight={showHeight}
        setShowHeight={setShowHeight}
        heightsList={heightsList}
        height={height}
        setHeight={setHeight}
        isVisible={isVisibleHeightModal}
        onClose={() => setIsVisibleHeightModal(false)}
      />
      <ModalWork
        showWork={showWork}
        setShowWork={setShowWork}
        textNameWork={textNameWork}
        textDescription={textDescription}
        setTextNameWork={setTextNameWork}
        setTextDescription={setTextDescription}
        isVisible={isVisibleWorkModal}
        onClose={() => setIsVisibleWorkModal(false)}
        saveUserInfo={saveUserInfo}
      />
      <ModalAlcohol
        saveUserInfo={saveUserInfo}
        showAlcohol={showAlcohol}
        setShowAlcohol={setShowAlcohol}
        activeAlcoholItem={activeAlcoholItem}
        setActiveAlcoholItem={setActiveAlcoholItem}
        listOfAlcohols={listOfAlcohols}
        isVisible={isVisibleAlcoholModal}
        onClose={() => setIsVisibleAlcoholModal(false)}
      />
      <ModalBirthday
        day={day}
        setDay={setDay}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        setShowAge={setShowAge}
        showAge={showAge}
        isVisible={isVisibleBirthdayModal}
        onClose={() => setIsVisibleBirthdayModal(false)}
        saveUserInfo={saveUserInfo}
      />
      <ModalLocation
        saveUserInfo={saveUserInfo}
        location={location}
        setLocation={setLocation}
        setShowLocation={setShowLocation}
        showLocation={showLocation}
        isVisible={isVisibleLocationModal}
        onClose={() => setIsVisibleLocationModal(false)}
      />
      <ModalHomeAdress
        saveUserInfo={saveUserInfo}
        textHomeAdress={textHomeAdress}
        setTextHomeAdress={setTextHomeAdress}
        setShowHomeAdress={setShowHomeAdress}
        showHomeAdress={showHomeAdress}
        isVisible={isVisibleHomeAddressModal}
        onClose={() => setIsVisibleHomeAddressModal(false)}
      />
    </>
  );
};

export default ProfileEditing;
