import {Dispatch, FC, SetStateAction, useCallback, useContext, useEffect, useState} from 'react';
import InstagramSLider from 'components/InstagramSlider/InstagramSlider';
import {blackColor, lightGray5Color, lightGray6Color, lightGrayColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';
import Man from 'assets/images/app/man-rectangle.png';
import {Alert, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider';
import PersonIcon from 'assets/images/icons/person.svg';
import LocationIcon from 'assets/images/icons/home.svg';
import TablerGenderIcon from 'assets/images/icons/tabler_gender-bigender.svg';
import HomeIcon from 'assets/images/icons/home.svg';
import ArrowIcon from 'assets/images/icons/arrow-3.svg';
import WineIcon from 'assets/images/icons/milk.svg';
import SmokeIcon from 'assets/images/icons/smoke.svg';
import Job from 'assets/images/icons/job.svg';
import Gender from 'assets/images/icons/gender.svg';
import Cake from 'assets/images/icons/cake.svg';

//Flags
import FlagAE from 'assets/images/flags/ae.svg';
import FlagDE from 'assets/images/flags/de.svg';
import FlagES from 'assets/images/flags/es.svg';
import FlagFR from 'assets/images/flags/fr.svg';
import FlagIL from 'assets/images/flags/il.svg';
import FlagIT from 'assets/images/flags/it.svg';
import FlagKR from 'assets/images/flags/kr.svg';
import FlagPL from 'assets/images/flags/pl.svg';
import FlagPT from 'assets/images/flags/pt.svg';
import FlagUA from 'assets/images/flags/ua.svg';
import FlagUS from 'assets/images/flags/us.svg';

import useStyles from './styles';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {profileEditingPath} from 'constants/pathLocations';
import ModalUserProfile from 'components/Modal/ModalUserProfile/ModalUserProfile.tsx';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';
import {calculateAge} from 'helpers/calculateAge';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {useUser} from '../../../../../store/userStore';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {User} from 'src/types/userInfo';
import {pipe} from 'helpers/pipe';
import { EventContext } from 'contexts/EventContext';
import ModalReport from 'components/Modal/ModalReport/ModalReport';

interface MyProfileViewProps {
  isShowEditButton?: boolean;
  isShowInstagramPhotos?: boolean;
  isModalVisible?: boolean;
  setModalVisible?: Dispatch<SetStateAction<boolean>>;
  route: any;
}

const filterPhotos = (photos: User.Photo[]): User.Photo[] => photos.filter(p => p.image !== null);
const mapPhotos = (photos: User.Photo[]): (string | null)[] => photos.map(p => p.image);

const processUserPhotos = pipe<string[]>(filterPhotos, mapPhotos);

const MyProfileView: FC<MyProfileViewProps> = ({isModalVisible, setModalVisible, isShowInstagramPhotos = true}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const [photosList, setPhotosList] = useState<string[]>([]);

  const route = useRoute();

  const isShowEditButton = route?.params?.isShowEditButton;
  const styles = useStyles();
  const navigation = useAppNavigation();
  const userHost = useUser((i: any) => i?.user);

  // const [reportedItem, setReportedItem] = useState<string>('');
  const [modalReport, setModalReport] = useState<boolean>(false);

  const {activeEvent} = useContext(EventContext);

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
            const userInfoDoc = await firestore().collection('userInfo').doc(userUid).get();

            if (userInfoDoc?.exists) {
              setUserInfo(userInfoDoc?.data());
              const userPhotos = userInfoDoc?.data()?.photos;
              if (userPhotos?.length) {
                const mappedPhotos = processUserPhotos(userPhotos);
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
    }, []),
  );

  const userAge = calculateAge(userInfo?.date);

  if (loading || !userInfo) {
    return (
      <View style={{flex: 1, backgroundColor: blackColor}}>
        <ActivityIndicator style={{flex: 1, backgroundColor: blackColor}} />
      </View>
    );
  }

  const getFlag = (flag: string) => {
    switch (flag) {
      case 'us':
        return <FlagUS />;
      case 'ua':
        return <FlagUA />;
      case 'ae':
        return <FlagAE />;
      case 'de':
        return <FlagDE />;
      case 'fr':
        return <FlagFR />;
      case 'es':
        return <FlagES />;
      case 'il':
        return <FlagIL />;
      case 'it':
        return <FlagIT />;
      case 'kr':
        return <FlagKR />;
      case 'pl':
        return <FlagPL />;
      case 'pt':
        return <FlagPT />;
      default:
        return;
    }
  };

  const handleScroll = event => {
    const positionY = event.nativeEvent.contentOffset.y;
    setScrollPosition(positionY);
  };

  // const isHost = userHost?.accountType === 'host';

  const handleReport = () => {
    // const currEvent = isHost ? activeEvent : event;
    // setReportedItem({uid, event: currEvent});
    setModalReport(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: blackColor}}>
      <ModalReport
            modalReport={modalReport}
            setModalReport={setModalReport}
            uidSender={userHost?.uid}
            uid={route?.params?.uid}
          />
      <View style={{flex: 1, paddingTop: screenHeight / 48, paddingHorizontal: 20}}>
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={20}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 20, paddingBottom: 58}}
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
              location={userInfo?.location}
              age={userInfo?.showAge ? userAge : ''}
              isShowLocation={true}
              isPremium={userInfo?.accountPremium}
              isProfile={true}
              isPreview={route?.params?.isPreview}
              scrollPositionPreview={scrollPosition}
              eventsCreated={userInfo?.eventsList?.length}
              joinEvents={userInfo?.joinEvents}
            />
            <View style={styles.basicsWrapper}>
              {!isShowEditButton&& <Text style={styles.testBasics}>My basics</Text>}
              {isShowEditButton && <Button onPress={goToProfileEditing} title={'Edit profile'} />}
              <View style={styles.wrapperTextTags}>
                {userInfo?.work?.title && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18, {textTransform: 'capitalize'}]}>
                    <View style={{width: 20}}>
                      <Job />
                    </View>
                    {userInfo?.work.title}
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
                {userInfo?.location && (
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <View style={{width: 20}}>
                      <LocationIcon />
                    </View>
                    {'Live in ' + userInfo?.location}
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
            {userInfo?.bio && <View style={styles.wrapperAboutMe}>
                <Text style={styles.testBasics}>About me</Text>
                <Text style={styles.textAboutMe}>{userInfo?.bio}</Text>
            </View>}
            {userInfo?.showLanguages && userInfo?.languages?.length > 0 && (
                <View style={{marginTop: screenHeight / 55}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(18, 812)}}>Languages</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {userInfo?.languages?.map(item => (
                      <View style={{borderColor: lightGrayColor, borderWidth: 1, padding: 8, borderRadius: 30, flexDirection: 'row', alignItems: 'center', marginTop: 14, marginRight: 4}}>
                        {getFlag(item.flag)}
                        <Text style={{fontSize: RFValue(16, 812), color: whiteColor, fontFamily: Satoshi400, marginLeft: 10}}>{` ${item.title}`}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            <View style={{marginTop: screenHeight / 55}}>
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
                      }}>
                      <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500}}>{title}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
            {!isShowEditButton && photosList.length > 1 && <TouchableOpacity onPress={handleReport} style={{marginTop: 34}}>
              <Text style={{
                fontSize: RFValue(16,812),
                color: whiteColor,
                fontFamily: Satoshi700,
                textAlign: 'center'
              }}>
                Block and Report
              </Text>
            </TouchableOpacity>}
            <View>
              {photosList?.map((item, index) => {
                return index !== 0 && item ? (
                  <Image
                    key={index}
                    style={{height: 544, borderRadius: 20, marginTop: 34, width: '100%'}}
                    source={{uri: photosList[index]}}
                  />
                ) : null;
              })}
            </View>
            {!isShowEditButton && <TouchableOpacity onPress={handleReport} style={{marginTop: 34}}>
              <Text style={{
                fontSize: RFValue(16,812),
                color: whiteColor,
                fontFamily: Satoshi700,
                textAlign: 'center'
              }}>
                Block and Report
              </Text>
            </TouchableOpacity>}
          </View>
          <ModalUserProfile title={'Alex'} image={Man} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyProfileView;
