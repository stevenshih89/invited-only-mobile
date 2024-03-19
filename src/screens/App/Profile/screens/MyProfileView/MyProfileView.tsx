import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import InstagramSLider from 'components/InstagramSlider/InstagramSlider';
import {lightGray6Color, transparentWhite16Color} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';
import Man from 'assets/images/app/man-rectangle.png';
import FakeGirlOne from 'assets/images/app/fake-girl-1.png';
import FakeGirlTwo from 'assets/images/app/fake-girl-2.png';
import FakeGirlThere from 'assets/images/app/fake-girl-3.png';
import FakeGirlFour from 'assets/images/app/fake-girl-4.png';
import {Alert, Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider';
import PersonIcon from 'assets/images/icons/person.svg';
import LocationIcon from 'assets/images/icons/location.svg';
import TablerGenderIcon from 'assets/images/icons/tabler_gender-bigender.svg';
import HomeIcon from 'assets/images/icons/home.svg';
import ArrowIcon from 'assets/images/icons/arrow-3.svg';
import WineIcon from 'assets/images/icons/milk.svg';
import SmokeIcon from 'assets/images/icons/smoke.svg';
import useStyles from './styles';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {profileEditingPath} from 'constants/pathLocations';
import ModalUserProfile from 'components/Modal/ModalUserProfile/ModalUserProfile.tsx';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native';
import useCalculateAge from 'hooks/useCalculateAge';

interface MyProfileViewProps {
  isShowEditButton?: boolean;
  isShowInstagramPhotos?: boolean;
  isModalVisible?: boolean;
  setModalVisible?: Dispatch<SetStateAction<boolean>>;
}

const MyProfileView: FC<MyProfileViewProps> = ({isModalVisible, setModalVisible, isShowEditButton = true, isShowInstagramPhotos = true}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const fakeGirlPhotos = [Man, FakeGirlOne, FakeGirlTwo, FakeGirlThere, FakeGirlFour];

  const styles = useStyles();
  const navigation = useAppNavigation();

  const goToProfileEditing = (): void => {
    navigation.navigate(profileEditingPath as never);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      const user = auth().currentUser;
      if (user) {
        try {
          const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();

          if (userInfoDoc.exists) {
            setUserInfo(userInfoDoc.data());
          } else {
            Alert.alert('Error', 'No user data found in Firestore');
          }
        } catch (error: any) {
          Alert.alert('Error', error.message || 'Something went wrong');
        }
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const userAge = useCalculateAge(userInfo?.date);

  if (loading || !userInfo) {
    return <ActivityIndicator style={{flex: 1, backgroundColor: lightGray6Color}} />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: lightGray6Color}}>
      <View style={{flex: 1, paddingTop: screenHeight / 48, paddingHorizontal: 20}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 20}}
          style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
          <View style={styles.wrapperFakeCard}>
            <TouchingSlider
              photos={fakeGirlPhotos}
              isShowCardButtons={false}
              isShowWantsJoin={false}
              isShowInvitesTooltip={false}
              name={userInfo?.name}
              age={userInfo?.showAge ? userAge : ''}
            />
            {isShowEditButton && <Button title="Edit" buttonStyle={{marginTop: 20}} onPress={goToProfileEditing} />}
            <View style={styles.bioWrapper}>
              {userInfo?.bio && (
                <>
                  <Text style={styles.titleSection}>Bio</Text>
                  <Text style={styles.textDescription}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                    ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                  </Text>
                </>
              )}
              <Text style={[styles.titleSection, styles.mt31]}>About me</Text>
              <View style={styles.wrapperTextTags}>
                <Text style={[styles.textTagsAboutMe, styles.ml18, {textTransform: 'capitalize'}]}>
                  <PersonIcon />
                  {` ${userInfo?.typeUser}`}
                </Text>
                <Text style={[styles.textTagsAboutMe, styles.ml18, {textTransform: 'capitalize'}]}>
                  <TablerGenderIcon />
                  {` ${userInfo?.gender}`}
                </Text>
                <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                  <LocationIcon /> Dubai
                </Text>
                <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                  <HomeIcon /> Odessa
                </Text>
                {!!userInfo?.height && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <ArrowIcon /> {`${userInfo?.height}cm`}
                  </Text>
                )}
                {!!userInfo?.alcohol && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <WineIcon /> {userInfo?.alcohol.title}
                  </Text>
                )}
                {userInfo?.smoke && (
                  <Text style={[styles.textTagsAboutMe, {marginLeft: screenWidth / 33}]}>
                    <SmokeIcon /> {`${userInfo?.smoke.title}`}
                  </Text>
                )}
              </View>
              {!!userInfo?.interests?.length && (
                <>
                  <Text style={[styles.titleSection, styles.mt31]}>Interests</Text>
                  <View style={styles.wrapperInterestsTags}>
                    {userInfo?.interests?.map((item: {id: number; title: string}) => (
                      <View key={item.id.toString()} style={styles.interestsTags}>
                        <Text style={styles.textTagsInterests}>{item.title}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
              <View style={styles.wrapperImageSectionFaceGirl}>
                <Image style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={Man} />
                <Image style={styles.imageFaceGirl} source={Man} />
              </View>
              {isShowInstagramPhotos && <InstagramSLider />}
            </View>
          </View>
          <ModalUserProfile title={'Alex'} image={Man} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyProfileView;
