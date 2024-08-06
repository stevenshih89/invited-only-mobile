import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import InstagramSLider from 'components/InstagramSlider/InstagramSlider';
import {blackColor, lightGray5Color, lightGray6Color, lightGrayColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';
import Man from 'assets/images/app/man-rectangle.png';
import {Alert, FlatList, Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider';
import PersonIcon from 'assets/images/icons/person.svg';
import LocationIcon from 'assets/images/icons/location.svg';
import TablerGenderIcon from 'assets/images/icons/tabler_gender-bigender.svg';
import HomeIcon from 'assets/images/icons/home.svg';
import ArrowIcon from 'assets/images/icons/arrow-3.svg';
import WineIcon from 'assets/images/icons/milk.svg';
import SmokeIcon from 'assets/images/icons/smoke.svg';
import Job from 'assets/images/icons/job.svg';
import Gender from 'assets/images/icons/gender.svg';
import Cake from 'assets/images/icons/cake.svg';
import FlagAE from 'assets/images/flags/ae.svg';
import useStyles from './styles';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {profileEditingPath} from 'constants/pathLocations';
import ModalUserProfile from 'components/Modal/ModalUserProfile/ModalUserProfile.tsx';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native';
import {calculateAge} from 'helpers/calculateAge';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {useUser} from '../../../../../store/userStore';
import {useRoute} from '@react-navigation/native';

interface MyProfileViewProps {
  isShowEditButton?: boolean;
  isShowInstagramPhotos?: boolean;
  isModalVisible?: boolean;
  setModalVisible?: Dispatch<SetStateAction<boolean>>;
  route: any;
}

const MyProfileView: FC<MyProfileViewProps> = ({isModalVisible, setModalVisible, isShowInstagramPhotos = true}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});

  const [photosList, setPhotosList] = useState<[]>([]);  

  const route = useRoute();

  const isShowEditButton = route?.params?.isShowEditButton;
  const styles = useStyles();
  const navigation = useAppNavigation();
  const userHost = useUser((i: any) => i?.user);

  const goToProfileEditing = (): void => {
    navigation.navigate(profileEditingPath as never);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      const user = userHost?.uid;
      const uid = route?.params?.uid;
      console.log('route', route);
      console.log('uid', uid);
      console.log('userHost uid', user);
      if (user) {
        try {
          const userUid = uid !== undefined ? uid : user;
          const userInfoDoc = await firestore().collection('userInfo').doc(userUid).get();

          if (userInfoDoc?.exists) {
            setUserInfo(userInfoDoc?.data());
            const userPhotos = userInfoDoc?.data()?.photos;
            if (userPhotos?.length) {
              const mappedPhotos = userPhotos?.map((img: {id: number; image: string}) => img?.image);
              setPhotosList(mappedPhotos);
            }
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

  const userAge = calculateAge(userInfo?.date);

  if (loading || !userInfo) {
    return <ActivityIndicator style={{flex: 1, backgroundColor: blackColor}} />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: blackColor}}>
      <View style={{flex: 1, paddingTop: screenHeight / 48, paddingHorizontal: 20}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 20, paddingBottom: 70}}
          style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
          <View style={styles.wrapperFakeCard}>
            <TouchingSlider
              photos={photosList}
              confirmedAccount={userInfo?.accountConfirmed}
              isShowAccountInfo={false}
              isShowCardButtons={false}
              isShowWantsJoin={false}
              isShowInvitesTooltip={false}
              name={userInfo?.name}
              accountType={userInfo?.accountType}
              // homeAddress={userInfo?.homeAddress}
              homeAddress={userInfo?.location}
              age={userInfo?.showAge ? userAge : ''}
              isShowLocation={true}
              isPremium={userInfo?.accountPremium}
            />
            {/* {isShowEditButton && <Button title="Edit" buttonStyle={{marginTop: 20}} onPress={goToProfileEditing} />} */}
            {/* <View style={styles.bioWrapper}>
              {userInfo?.bio && (
                <>
                  <Text style={styles.titleSection}>Bio</Text>
                  <Text style={styles.textDescription}>{userInfo?.bio}</Text>
                </>
              )}
              <Text style={[styles.titleSection, styles.mt31]}>About me</Text>
              <View style={styles.wrapperTextTags}>
                <Text style={[styles.textTagsAboutMe, styles.ml18, {textTransform: 'capitalize'}]}>
                  <PersonIcon />
                  {` ${userInfo?.accountType}`}
                </Text>
                <Text style={[styles.textTagsAboutMe, styles.ml18, {textTransform: 'capitalize'}]}>
                  <TablerGenderIcon />
                  {` ${userInfo?.gender}`}
                </Text>
                {userInfo?.address && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <LocationIcon /> {userInfo?.address}
                  </Text>
                )}
                {userInfo?.homeAddress && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <HomeIcon /> {userInfo?.homeAddress}
                  </Text>
                )}
                {userInfo?.height && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <ArrowIcon /> {`${userInfo?.height}cm`}
                  </Text>
                )}
                {userInfo?.alcohol?.title && userInfo?.showAlcohol && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <WineIcon /> {userInfo?.alcohol?.title}
                  </Text>
                )}
                {userInfo?.smoke?.title && (
                  <Text style={[styles.textTagsAboutMe, {marginLeft: screenWidth / 33}]}>
                    <SmokeIcon /> {`${userInfo?.smoke?.title}`}
                  </Text>
                )}
              </View>
              {!!userInfo?.interests?.length && (
                <>
                  <Text style={[styles.titleSection, styles.mt31]}>Interests</Text>
                  <View style={{width: '100%'}}>
                    <FlatList
                      data={userInfo?.interests}
                      numColumns={3}
                      keyExtractor={({id}) => id.toString()}
                      scrollEnabled={false}
                      contentContainerStyle={{width: '100%'}}
                      ItemSeparatorComponent={() => <View style={{height: 10, width: 10}} />}
                      renderItem={({item: {title}}) => (
                        <View style={{paddingHorizontal: 5, maxWidth: screenWidth / 2 - 40, flex: 1}}>
                          <View
                            style={{
                              flex: 1,
                              borderRadius: 30,
                              paddingVertical: 8,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: lightGrayColor,
                            }}>
                            <Text style={{color: whiteColor, fontSize: RFValue(13, 812), fontFamily: Satoshi400}}>{title}</Text>
                          </View>
                        </View>
                      )}
                    />
                  </View>
                </>
              )}
              <View style={styles.wrapperImageSectionFaceGirl}>
                {photosList?.map((photo: any, index: number) => {
                  return <Image key={index.toString()} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />;
                })}
              </View>
              {isShowInstagramPhotos && <InstagramSLider photosList={photosList} />}
            </View> */}
            <View style={styles.basicsWrapper}>
              {/* <Text style={styles.testBasics}>My basics</Text> */}
              <Button onPress={goToProfileEditing} title={'Edit profile'}/>
              <View style={styles.wrapperTextTags}>
                {userInfo?.work?.title && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18, {textTransform: 'capitalize'}]}>
                    <View style={{width: 20}}>
                      <Job />
                    </View>
                    {userInfo?.work.title}
                  </Text>
                )}
                {userInfo?.accountType && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18, {textTransform: 'capitalize'}]}>
                    <View style={{width: 20}}>
                      <PersonIcon />
                    </View>
                    {` ${userInfo?.accountType}`}
                  </Text>
                )}
                {userInfo?.gender && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18, {textTransform: 'capitalize'}]}>
                    <View style={{width: 20}}>
                      <Gender />
                    </View>
                    {` ${userInfo?.gender}`}
                  </Text>
                )}
                {userInfo?.date && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18, {textTransform: 'capitalize'}]}>
                    <View style={{width: 20}}>
                      <Cake />
                    </View>
                    {` ${userInfo?.date}`}
                  </Text>
                )}
                {userInfo?.location && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <View style={{width: 20}}>
                      <LocationIcon />
                    </View>
                    {'Live in ' + userInfo?.location}
                  </Text>
                )}
                {userInfo?.homeAddress && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <View style={{width: 20}}>
                      <HomeIcon />
                    </View>
                    {userInfo?.homeAddress}
                  </Text>
                )}
                {userInfo?.height && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <View style={{width: 20}}>
                      <ArrowIcon />
                    </View>
                    {`${userInfo?.height}cm`}
                  </Text>
                )}
                {userInfo?.alcohol && userInfo?.showAlcohol && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <View style={{width: 20}}>
                      <WineIcon />
                    </View>
                    {userInfo?.alcohol}
                  </Text>
                )}
                {userInfo?.smoke?.title && (
                  <Text style={[styles.textTagsAboutMe, {marginLeft: screenWidth / 33}]}>
                    <View style={{width: 20}}>
                      <SmokeIcon />
                    </View>
                    {`${userInfo?.smoke?.title}`}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.wrapperAboutMe}>
              <Text style={styles.testBasics}>About me</Text>
              <Text style={styles.textAboutMe}>{userInfo?.bio ? userInfo.bio : 'Bio is empty'}</Text>
            </View>
            <View style={{marginTop: 34}}>
              <Text style={[styles.testBasics, {marginBottom: 14}]}>My interests</Text>
              <FlatList
                data={userInfo?.interests}
                numColumns={3}
                keyExtractor={({id}) => id.toString()}
                scrollEnabled={false}
                contentContainerStyle={{width: '100%'}}
                ItemSeparatorComponent={() => <View style={{height: 10, width: 10}} />}
                renderItem={({item: {title}}) => (
                  <View style={{maxWidth: screenWidth / 2 - 40, flex: 1}}>
                    <View
                      style={{
                        flex: 1,
                        borderRadius: 30,
                        paddingVertical: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: lightGrayColor,
                        // backgroundColor: lightGrayColor,
                      }}>
                      <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500}}>{title}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
            <View>
            {photosList?.map((item, index) => {
              return (index !== 0 && item) ? (
               <Image
                key={index}
                style={{height: 544, borderRadius: 20, marginTop: 34, width: '100%'}}
                source={{uri: photosList[index]}}
                />
              ) : null;
            })}
            </View>
            <View style={styles.wrapperAboutMe}>
              <Text style={styles.testBasics}>{userInfo?.name} location</Text>
              <Text style={styles.textAboutMe}>{typeof(userInfo?.location) === 'string'?userInfo?.location: 'Location not specified'}, 2.4 km away</Text>
              <View
                style={{
                  paddingHorizontal: 18,
                  marginTop: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  paddingVertical: 8,
                  borderRadius: 400,
                  borderWidth: 1,
                  borderColor: lightGray5Color,
                }}>
                {/* <FlagAE /> */}
                <Text style={styles.textLocation}>Lives in {typeof(userInfo?.location) === 'string'?userInfo?.location: 'Location not specified'}</Text>
              </View>
            </View>
          </View>
          <ModalUserProfile title={'Alex'} image={Man} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyProfileView;
