import {ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Invitations from './screens/Invitations/Invitations';
import SafetyAndWellbeing from './screens/SafetyAndWellbeing/SafetyAndWellbeing';
import MyPlan from './screens/MyPlan/MyPlan';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import EditBlack from 'assets/images/icons/edit-black.svg';
import {FC, useCallback, useState} from 'react';
import Button from 'components/Button/Button';
import useStyles from './styles';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {myProfileViewPath} from 'constants/pathLocations';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {transparentGray60Color, whiteColor} from 'constants/colors';
import {calculateAge} from 'helpers/calculateAge';
import Payment from 'screens/Auth/Payment/Payment';
import Svg, {Circle, G} from 'react-native-svg';
import {screenHeight} from 'constants/common';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const Profile: FC = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({} as any);

  const [mainImage, setMainImage] = useState({id: 0, image: ''} as any);

  const tabList = [
    {id: 0, title: 'My Plan'},
    {id: 1, title: 'Safety & Wellbeing'},
    {id: 2, title: 'Invitations'},
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
            const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();

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
    });
  };

  const userAge = calculateAge(userInfo?.date);

  if (loading || !userInfo) {
    return <ActivityIndicator style={styles.scrollView} />;
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
              // <Image source={{uri: mainImage?.image}} style={styles.profileImage} />
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
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.nameText}>{`${userInfo?.name}${userInfo?.showAge ? `, ${userAge}` : ''}`}</Text>
              {userInfo?.accountConfirmed && <CheckStarWhite style={styles.checkStarIcon} />}
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.accountTypeWrapper}>
                {userInfo?.accountType?.toLowerCase() === 'host' && <Text style={styles.accountTypeText}>Host</Text>}
                {userInfo?.accountType?.toLowerCase() === 'guest' && <Text style={styles.accountTypeText}>Guest</Text>}
              </View>
              {userInfo?.accountPremium && (
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
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={tabList}
          style={styles.flatListContainer}
          contentContainerStyle={{paddingLeft: 20}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          ItemSeparatorComponent={() => <View style={styles.flatListItemSeparator} />}
          renderItem={({item: {id, title}}) => {
            const isActive = activeTabId === id;
            return (
              <TouchableOpacity
                disabled={id === 2 && !userInfo?.accountConfirmed}
                activeOpacity={0.7}
                onPress={() => setActiveTabId(id)}
                style={[styles.tabButton, isActive ? styles.tabButtonActive : styles.tabButtonInactive]}>
                <Text style={[styles.tabButtonText, isActive ? styles.tabButtonTextActive : styles.tabButtonTextInactive]}>{title}</Text>
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
