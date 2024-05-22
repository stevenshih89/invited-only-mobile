import {lightGray6Color, transparentWhite16Color} from 'constants/colors';
import {FC, ReactElement, useEffect, useMemo, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, View} from 'react-native';
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

const ProfileEditing: FC = (): ReactElement => {
  const [isVisibleSmokeModal, setIsVisibleSmokeModal] = useState<boolean>(false);
  const [isVisibleGenderModal, setIsVisibleGenderModal] = useState<boolean>(false);
  const [isVisibleHeightModal, setIsVisibleHeightModal] = useState<boolean>(false);
  const [isVisibleWorkModal, setIsVisibleWorkModal] = useState<boolean>(false);
  const [isVisibleAlcoholModal, setIsVisibleAlcoholModal] = useState<boolean>(false);
  const [isVisibleBirthdayModal, setIsVisibleBirthdayModal] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [interestsLoading, setInterestsLoading] = useState<boolean>(false);

  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [showWork, setShowWork] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [activeWorkItem, setActiveWorkItem] = useState(null);
  const [bio, setBio] = useState<string>('');
  const [showGender, setShowGender] = useState(false);
  const [activeGenderItem, setActiveGenderItem] = useState<{title: string} | null>(null);
  const [showAlcohol, setShowAlcohol] = useState(false);
  const [activeAlcoholItem, setActiveAlcoholItem] = useState<{title: string} | null>(null);
  const [showSmoke, setShowSmoke] = useState(false);
  const [activeSmokeItem, setActiveSmokeItem] = useState<{id: number; title: string} | null>(null);
  const [showHeight, setShowHeight] = useState(false);
  const [height, setHeight] = useState<string | null>(null);

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
  ]);

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
    {id: 0, title: 'Bussiness', isSelected: false},
    {id: 1, title: 'Traveling', isSelected: false},
    {id: 2, title: 'Cooking', isSelected: false},
    {id: 3, title: 'Music', isSelected: false},
    {id: 4, title: 'Painitng', isSelected: false},
    {id: 5, title: 'Gaming', isSelected: false},
    {id: 6, title: 'Hiking', isSelected: false},
    {id: 7, title: 'Yoga', isSelected: false},
    {id: 8, title: 'Writing', isSelected: false},
    {id: 9, title: 'Meditation', isSelected: false},
    {id: 10, title: 'Fishing', isSelected: false},
    {id: 11, title: 'Dancing', isSelected: false},
    {id: 12, title: 'Clubs', isSelected: false},
    {id: 13, title: 'Surfing', isSelected: false},
    {id: 14, title: 'Creativity', isSelected: false},
    {id: 15, title: 'Yacht', isSelected: false},
    {id: 16, title: 'Gardering', isSelected: false},
    {id: 17, title: 'Movies', isSelected: false},
    {id: 18, title: 'Restaurans', isSelected: false},
    {id: 19, title: 'Entrepreneur', isSelected: false},
  ]);

  const [listOfWorks] = useState([
    {
      id: 0,
      title: 'Hospitality and Tourism',
    },
    {
      id: 1,
      title: 'Real Estate & Property Management',
    },
    {
      id: 2,
      title: 'Financial Services',
    },
    {
      id: 3,
      title: 'Retail & E-commerce',
    },
    {
      id: 4,
      title: 'Construction & Engineering',
    },
    {
      id: 5,
      title: 'Information Technology',
    },
    {
      id: 6,
      title: 'Healthcare & Medical Services',
    },
    {
      id: 7,
      title: 'Education & Training',
    },
    {
      id: 8,
      title: 'Oil & Gas Industry',
    },
    {
      id: 9,
      title: 'Media & Entertainment',
    },
    {
      id: 10,
      title: 'Logistics & Transportation',
    },
    {
      id: 11,
      title: 'Legal Services',
    },
    {
      id: 12,
      title: 'Fashion & Luxury Goods',
    },
    {
      id: 13,
      title: 'Advertising & Marketing',
    },
    {
      id: 14,
      title: 'Renewable Energy & Sustainability',
    },
    {
      id: 15,
      title: 'Consulting and Advisory Services',
    },
    {
      id: 16,
      title: 'Telecommunications',
    },
    {
      id: 17,
      title: 'Aerospace & Aviation',
    },
    {
      id: 18,
      title: 'Food & Beverage Industry',
    },
    {
      id: 19,
      title: 'Government & Public Sector',
    },
  ]);

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
      await firestore().collection('userInfo').doc(userId).update({
        photos: imageUrl,
      });
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Something went wrong');
      console.error('Error updating user profile image: ', e);
    }
  };

  const setDefaultInterests = (userInterests: any[]) => {
    const newListOfInterests = listOfInterests.map(interest => {
      const isSelected = userInterests.some(item => item.id === interest.id);
      return {...interest, isSelected};
    });
    setListOfInterests(newListOfInterests);
  };

  const setDefaultBio = (userBio: string) => {
    setBio(userBio);
  };

  const fetchUserInfo = async () => {
    setInterestsLoading(true);
    const user = auth().currentUser;
    if (user) {
      try {
        const documentSnapshot = await firestore().collection('userInfo').doc(user.uid).get();

        if (documentSnapshot.data()?.interests) {
          setDefaultInterests(documentSnapshot.data()?.interests);
        }
        if (documentSnapshot.data()?.bio) {
          setDefaultBio(documentSnapshot.data()?.bio);
        }
        if (documentSnapshot.data()?.work) {
          setActiveWorkItem(documentSnapshot.data()?.work);
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
          setImages(documentSnapshot.data()?.photos);
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
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
      setInterestsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    console.log('fetchUserInfo');
  }, [setShowGender, setActiveGenderItem]);

  const fetchImages = async (user: any) => {
    const allImagesUrl: any = [];

    const mainImgId = images.findIndex(({id}) => id === 0);
    const secondImgId = images.findIndex(({id}) => id === 1);
    const thirdImgId = images.findIndex(({id}) => id === 2);

    await uploadImage(images[mainImgId].image, user.uid).then(async image => {
      allImagesUrl.push({id: images[mainImgId].id, image});
    });
    await uploadImage(images[secondImgId].image, user.uid).then(async image => {
      allImagesUrl.push({id: images[secondImgId].id, image});
    });
    await uploadImage(images[thirdImgId].image, user.uid).then(async image => {
      allImagesUrl.push({id: images[thirdImgId].id, image});
    });
    await updatePhotosImage(user.uid, allImagesUrl);
  };

  const saveUserInfo = async () => {
    setLoadingSave(true);
    const user = auth().currentUser;
    if (user) {
      const reqInterests = listOfInterests.reduce((acc: any[], curr) => {
        if (curr.isSelected) {
          acc.push({id: curr.id, title: curr.title});
        }
        return acc;
      }, []);

      try {
        await firestore()
          .collection('userInfo')
          .doc(user.uid)
          .update({
            interests: reqInterests,
            bio: bio,
            work: activeWorkItem,
            showWork,
            date: bithdate,
            showGender,
            showAge,
            alcohol: activeAlcoholItem,
            showAlcohol,
            smoke: activeSmokeItem,
            showSmoke,
            height,
            showHeight,
          })
          .then(async () => {
            await fetchImages(user);
          });
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
        setLoadingSave(false);
      }
      setLoadingSave(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: lightGray6Color}}>
        <View style={{flex: 1, paddingTop: screenHeight / 48, paddingHorizontal: 20}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 80}}
            style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
            <MyPhotos images={images} setImages={setImages} />
            <MyInterests listOfInterests={listOfInterests} setListOfInterests={setListOfInterests} loading={interestsLoading} />
            <MyBio bio={bio} setBio={setBio} />
            <MyBasics
              activeWorkItem={activeWorkItem}
              activeAlcoholItem={activeAlcoholItem}
              activeSmokeItem={activeSmokeItem}
              height={height}
              date={bithdate}
              setIsVisibleSmokeModal={setIsVisibleSmokeModal}
              setIsVisibleGenderModal={setIsVisibleGenderModal}
              setIsVisibleHeightModal={setIsVisibleHeightModal}
              setIsVisibleWorkModal={setIsVisibleWorkModal}
              setIsVisibleAlcoholModal={setIsVisibleAlcoholModal}
              setIsVisibleBirthdayModal={setIsVisibleBirthdayModal}
            />
            <LanguagesKnow />
            <Button title="Save" buttonStyle={{marginTop: 34}} onPress={saveUserInfo} loading={loadingSave} />
          </ScrollView>
        </View>
      </SafeAreaView>
      <ModalSmoke
        showSmoke={showSmoke}
        setShowSmoke={setShowSmoke}
        activeSmokeItem={activeSmokeItem}
        setActiveSmokeItem={setActiveSmokeItem}
        listOfSmokes={listOfSmokes}
        isVisible={isVisibleSmokeModal}
        onClose={() => setIsVisibleSmokeModal(false)}
      />
      <ModalGender
        showGender={showGender}
        setShowGender={setShowGender}
        activeGenderItem={activeGenderItem}
        setActiveGenderItem={setActiveGenderItem}
        listOfGenders={listOfGenders}
        isVisible={isVisibleGenderModal}
        onClose={() => setIsVisibleGenderModal(false)}
      />
      <ModalHeight
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
        activeWorkItem={activeWorkItem}
        setActiveWorkItem={setActiveWorkItem}
        listOfWorks={listOfWorks}
        isVisible={isVisibleWorkModal}
        onClose={() => setIsVisibleWorkModal(false)}
      />
      <ModalAlcohol
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
      />
    </>
  );
};

export default ProfileEditing;
