import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Invitations from './screens/Invitations/Invitations';
import SafetyAndWellbeing from './screens/SafetyAndWellbeing/SafetyAndWellbeing';
import MyPlan from './screens/MyPlan/MyPlan';
import LoaderIcon from 'assets/images/icons/loader.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import EditBlack from 'assets/images/icons/edit-black.svg';
import {FC, useCallback, useEffect, useState} from 'react';
import Button from 'components/Button/Button';
import useStyles from './styles';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {myProfileViewPath} from 'constants/pathLocations';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  blackColor,
  lightGray9Color,
  transparentGray60Color,
  transparentWhite30Color,
  transparentWhite40Color,
  whiteColor,
} from 'constants/colors';
import {calculateAge} from 'helpers/calculateAge';
import Svg, {Circle, G} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import {useAdminActions} from 'src/store/adminActions';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {getEventsIJoining} from 'helpers/getEventsIJoining';
import Config from 'react-native-config';
import Animated, {cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import ModalChangeAccountType from 'components/Modal/ModalChangeAccountType';

const Profile: FC = () => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const [activeTabId, setActiveTabId] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({} as any);
  const [totalGuests, setTotalGuests] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [mainImage, setMainImage] = useState({id: 0, image: ''} as any);

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);
  const changeAccountTypeModalVisible = useAdminActions((i: any) => i?.changeAccountTypeModalVisible);
  const setChangeAccountModalVisible = useAdminActions((i: any) => i?.setChangeAccountModalVisible);

  const rotationLoader = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      rotationLoader.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
      );
    }

    return () => {
      cancelAnimation(rotationLoader);
    };
  }, [rotationLoader, loading]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotationLoader.value}deg`}],
    };
  });

  const tabList = [
    {id: 0, title: 'My plan'},
    {id: 1, title: 'Safety'},
    {id: 2, title: 'App Invitations'},
  ];

  const calculateCompleteness = profile => {
    const requiredFields = ['chooseGuest', 'date', 'email', 'gender', 'homeAddress', 'interests', 'work', 'imageUser', 'bio', 'photos'];
    let presentFields = 0;

    for (const field of requiredFields) {
      if (profile.hasOwnProperty(field) && profile[field] !== null && profile[field] !== undefined) {
        presentFields++;
      }
    }

    const completenessPercentage = (presentFields / requiredFields.length) * 100;

    // Если все поля заполнены, вернуть 100%, иначе отнять проценты за отсутствующие поля
    if (completenessPercentage === 100) {
      return 100;
    } else {
      const missingFields = requiredFields.length - presentFields;
      const deductionPercentage = (missingFields / requiredFields.length) * 100;
      return completenessPercentage - deductionPercentage;
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchUserInfo = async () => {
        setLoading(true);
        const user = auth().currentUser;
        if (user) {
          try {
            const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(user.uid).get();

            if (userInfoDoc.exists) {
              setUserInfo(userInfoDoc.data());
              const calculate = Math.floor(calculateCompleteness(userInfoDoc.data()));
              setPercentage(calculate);
              const userImage = userInfoDoc.data()?.photos?.find(({id}: any) => id === 0);
              if (userImage) {
                setMainImage(userImage);
              }
              Image.prefetch(userImage.image).catch(error => {
                // console.error('image prefetching error: ', error);
              });
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

  const styles = useStyles();
  const navigation = useAppNavigation();

  const getTabContent = () => {
    switch (activeTabId) {
      case 0:
        return <MyPlan />;
      case 1:
        return <SafetyAndWellbeing />;
      case 2:
        return <Invitations />;
      default:
        return <MyPlan />;
    }
  };

  const goToMyProfileView = () => {
    // @ts-ignore
    navigation.navigate(myProfileViewPath, {
      isShowEditButton: true,
      isPreview: false,
    });
  };

  const getGuestList = async () => {
    let totalParticipants = 0;
    try {
      for (const eventId of userInfo?.eventsList) {
        const eventDoc = await firestore().collection(apiEventsCollection).doc(eventId).get();
        if (eventDoc.exists) {
          const data = eventDoc.data();
          totalParticipants += data?.male + data?.female;
        }
      }
      setTotalGuests(totalParticipants);
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(apiEventsCollection)
      .onSnapshot(async querySnapshot => {
        const count = await getEventsIJoining(querySnapshot, userInfo?.uid);
        setEventsCount(count);
      });

    return () => unsubscribe();
  }, [userInfo]);

  useEffect(() => {
    getGuestList();
  }, [userInfo]);

  const userAge = calculateAge(userInfo?.date);

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: blackColor,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View style={[animatedStyle]}>
          <LoaderIcon />
        </Animated.View>
      </View>
    );
  }

  const ProgressCircle = ({size, strokeWidth, progress, color, backgroundColor}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Svg width={size} height={size} style={{position: 'absolute', zIndex: 10}}>
          <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
            <Circle cx="50%" cy="50%" r={radius} stroke={backgroundColor} strokeWidth={strokeWidth} fill="none" />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {userInfo?.photos?.length > 0 && <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo.photos[0].image} />}
      {acceptModalVisible && <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />}
      {changeAccountTypeModalVisible && !acceptModalVisible && <ModalChangeAccountType isVisible={changeAccountTypeModalVisible} userInfo={userInfo} setIsVisible={setChangeAccountModalVisible} />}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View>
          <View style={styles.profileImageContainer}>
            <View style={styles.overlayContainer}>
              <View style={styles.overlayBackground}>
                <Text style={styles.percentageText}>{percentage}%</Text>
              </View>
            </View>
            {mainImage?.image ? (
              <FastImage
                style={styles.profileImage}
                source={{
                  uri: mainImage?.image,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <View style={[styles.profileImage, {backgroundColor: whiteColor}]} />
            )}
            <View style={[styles.buttonContainer, {position: 'absolute', bottom: 0, zIndex: 20}]}>
              <Button
                title="Complete profile"
                buttonStyle={styles.button}
                buttonTitleStyle={styles.buttonTitle}
                onPress={goToMyProfileView}
              />
              <View style={{position: 'absolute', right: 14, top: 10}}>
                <EditBlack width={14} height={14} />
              </View>
            </View>
            <View style={{position: 'absolute', bottom: 80, zIndex: 0}}>
              <ProgressCircle size={175} strokeWidth={4} progress={percentage} color="white" backgroundColor={transparentGray60Color} />
            </View>
          </View>
          <View style={styles.nameContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.nameText}>{`${userInfo?.name}${userInfo?.date ? ',' : ''}`}</Text>
              <Text style={styles.ageText}>{` ${`${userAge}`}`}</Text>
              {userInfo?.accountConfirmed && <CheckStarWhite style={styles.checkStarIcon} />}
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  styles.accountTypeWrapper,
                  {
                    backgroundColor: userInfo?.accountType === 'host' ? blackColor : whiteColor,
                  },
                ]}>
                <Text style={[styles.accountTypeText, {color: userInfo?.accountType === 'host' ? whiteColor : blackColor}]}>
                  {userInfo?.accountType === 'host' ? 'Host' : 'Guest'}
                </Text>
              </View>
              {userInfo?.accountType?.toLowerCase() === 'host' && userInfo?.accountPremium && (
                <LinearGradient
                  colors={['#977B4A', '#E5D291', '#A28453']}
                  style={styles.accountTypeWrapperPremium}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  {true && <Text style={styles.accountTypePremium}>Premium</Text>}
                </LinearGradient>
              )}
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 19,
            marginTop: 30,
            // justifyContent: 'space-between',
            // padding: 20
            alignSelf: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: whiteColor,
                fontSize: RFValue(20, 812),
                fontFamily: Satoshi700,
              }}>
              {userInfo?.accountType === 'host' ? userInfo?.eventsList?.length || 0 : eventsCount ?? 0}
            </Text>
            <Text
              style={{
                color: whiteColor,
                fontSize: RFValue(14, 812),
                fontFamily: Satoshi400,
                marginTop: 4.5,
              }}>
              {userInfo?.accountType === 'host' ? 'Total Events' : 'Events List'}
            </Text>
          </View>
          <View style={{width: 1, borderRadius: 1, height: 36, backgroundColor: whiteColor, marginHorizontal: 57}} />
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: whiteColor,
                fontSize: RFValue(20, 812),
                fontFamily: Satoshi700,
              }}>
              {userInfo?.accountType === 'host' ? totalGuests : userInfo?.joinEvents ?? 0}
            </Text>
            <Text
              style={{
                color: whiteColor,
                fontSize: RFValue(14, 812),
                fontFamily: Satoshi400,
                marginTop: 4.5,
              }}>
              {userInfo?.accountType === 'host' ? 'Guest List' : 'Total Events Attended'}
            </Text>
          </View>
        </View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={tabList}
          style={[styles.flatListContainer, {marginTop: 18}]}
          contentContainerStyle={{paddingLeft: 20}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          ItemSeparatorComponent={() => <View style={styles.flatListItemSeparator} />}
          renderItem={({item: {id, title}}) => {
            const isActive = activeTabId === id;
            const isDisabled = id === 2 && !userInfo?.accountConfirmed;
            return (
              <TouchableOpacity
                disabled={isDisabled}
                activeOpacity={0.7}
                onPress={() => setActiveTabId(id)}
                style={[
                  styles.tabButton,
                  isActive ? styles.tabButtonActive : styles.tabButtonInactive,
                  {backgroundColor: isDisabled ? transparentWhite40Color : isActive ? whiteColor : lightGray9Color},
                ]}>
                <Text
                  style={[
                    styles.tabButtonText,
                    isActive ? styles.tabButtonTextActive : styles.tabButtonTextInactive,
                    {color: isDisabled ? transparentWhite30Color : isActive ? lightGray9Color : whiteColor},
                  ]}>
                  {title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.tabContentContainer}>{getTabContent()}</View>
        {/* <Payment /> */}
      </ScrollView>
    </View>
  );
};

export default Profile;
