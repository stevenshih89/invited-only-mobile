import {lightGray6Color, transparentWhite16Color} from 'constants/colors';
import {FC, ReactElement, useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, View} from 'react-native';
import MyPhotos from './MyPhotos';
import MyInterests from './MyInterests';
import {screenHeight} from 'constants/common';
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
import ModalLocation from './ModalLocation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileEditing: FC = (): ReactElement => {
  const [isVisibleSmokeModal, setIsVisibleSmokeModal] = useState<boolean>(false);
  const [isVisibleGenderModal, setIsVisibleGenderModal] = useState<boolean>(false);
  const [isVisibleHeightModal, setIsVisibleHeightModal] = useState<boolean>(false);
  const [isVisibleWorkModal, setIsVisibleWorkModal] = useState<boolean>(false);
  const [isVisibleAlcoholModal, setIsVisibleAlcoholModal] = useState<boolean>(false);
  const [isVisibleBirthdayModal, setIsVisibleBirthdayModal] = useState<boolean>(false);
  const [isVisibleLocationModal, setIsVisibleLocationModal] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [interestsLoading, setInterestsLoading] = useState<boolean>(false);

  const [showWorkOnMyProfile, setShowWorkOnMyProfile] = useState(false);
  const [activeWorkItem, setActiveWorkItem] = useState(null);

  const [bio, setBio] = useState<string>('');

  const [showGenderOnMyProfile, setShowGenderOnMyProfile] = useState(false);

  const [activeGenderItem, setActiveGenderItem] = useState(null);

  const [listOfGenders] = useState([
    {
      id: 0,
      title: 'Male',
    },
    {
      id: 1,
      title: 'Female',
    },
    {
      id: 2,
      title: 'Other',
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

  const setDefaultInterests = (userInterests: string[]) => {
    const newListOfInterests = listOfInterests.map(interest => {
      const isSelected = userInterests.includes(interest.title);
      return {...interest, isSelected};
    });
    setListOfInterests(newListOfInterests);
  };

  const setDefaultBio = (userBio: string) => {
    setBio(userBio);
  };

  useEffect(() => {
    const fetchUserInterests = async () => {
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
          if (documentSnapshot.data()?.showWorkOnMyProfile) {
            setShowWorkOnMyProfile(documentSnapshot.data()?.showWorkOnMyProfile);
          }
          if (documentSnapshot.data()?.gender) {
            setActiveGenderItem(documentSnapshot.data()?.gender);
          }
          if (documentSnapshot.data()?.showGenderOnMyProfile) {
            setShowGenderOnMyProfile(documentSnapshot.data()?.showGenderOnMyProfile);
          }
        } catch (error: any) {
          Alert.alert('Error', error.message || 'Something went wrong');
        }
        setInterestsLoading(false);
      }
    };
    fetchUserInterests();
  }, []);

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
        await firestore().collection('userInfo').doc(user.uid).update({
          interests: reqInterests,
          bio: bio,
          work: activeWorkItem,
          showWorkOnMyProfile,
          gender: activeGenderItem.title,
          showGenderOnMyProfile,
        });
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
        setLoadingSave(false);
      }
    }
    setLoadingSave(false);
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
            <MyPhotos />
            <MyInterests listOfInterests={listOfInterests} setListOfInterests={setListOfInterests} loading={interestsLoading} />
            <MyBio bio={bio} setBio={setBio} />
            <MyBasics
              activeWorkItem={activeWorkItem}
              setIsVisibleSmokeModal={setIsVisibleSmokeModal}
              setIsVisibleGenderModal={setIsVisibleGenderModal}
              setIsVisibleHeightModal={setIsVisibleHeightModal}
              setIsVisibleWorkModal={setIsVisibleWorkModal}
              setIsVisibleAlcoholModal={setIsVisibleAlcoholModal}
              setIsVisibleBirthdayModal={setIsVisibleBirthdayModal}
              setIsVisibleLocationModal={setIsVisibleLocationModal}
            />
            <LanguagesKnow />
            <Button title="Save" buttonStyle={{marginTop: 34}} onPress={saveUserInfo} loading={loadingSave} />
          </ScrollView>
        </View>
      </SafeAreaView>
      <ModalSmoke isVisible={isVisibleSmokeModal} onClose={() => setIsVisibleSmokeModal(false)} />
      <ModalGender
        showGenderOnMyProfile={showGenderOnMyProfile}
        setShowGenderOnMyProfile={setShowGenderOnMyProfile}
        activeGenderItem={activeGenderItem}
        setActiveGenderItem={setActiveGenderItem}
        listOfGenders={listOfGenders}
        isVisible={isVisibleGenderModal}
        onClose={() => setIsVisibleGenderModal(false)}
      />
      <ModalHeight isVisible={isVisibleHeightModal} onClose={() => setIsVisibleHeightModal(false)} />
      <ModalWork
        showWorkOnMyProfile={showWorkOnMyProfile}
        setShowWorkOnMyProfile={setShowWorkOnMyProfile}
        activeWorkItem={activeWorkItem}
        setActiveWorkItem={setActiveWorkItem}
        listOfWorks={listOfWorks}
        isVisible={isVisibleWorkModal}
        onClose={() => setIsVisibleWorkModal(false)}
      />
      <ModalAlcohol isVisible={isVisibleAlcoholModal} onClose={() => setIsVisibleAlcoholModal(false)} />
      <ModalBirthday isVisible={isVisibleBirthdayModal} onClose={() => setIsVisibleBirthdayModal(false)} />
      <ModalLocation isVisible={isVisibleLocationModal} onClose={() => setIsVisibleLocationModal(false)} />
    </>
  );
};

export default ProfileEditing;
