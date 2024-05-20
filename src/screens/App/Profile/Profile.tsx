import {ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Invitations from './screens/Invitations/Invitations';
import SafetyAndWellbeing from './screens/SafetyAndWellbeing/SafetyAndWellbeing';
import MyPlan from './screens/MyPlan/MyPlan';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import {FC, useCallback, useState} from 'react';
import Button from 'components/Button/Button';
import useStyles from './styles';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {myProfileViewPath} from 'constants/pathLocations';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {whiteColor} from 'constants/colors';
import {calculateAge} from 'helpers/calculateAge';

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

  const calculateCompleteness = (profile) => {
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
    navigation.navigate(myProfileViewPath);
  };

  const userAge = calculateAge(userInfo?.date);

  if (loading || !userInfo) {
    return <ActivityIndicator style={styles.scrollView} />;
  }

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
              <Image source={{uri: mainImage?.image}} style={styles.profileImage} />
            ) : (
              <View style={[styles.profileImage, {backgroundColor: whiteColor}]} />
            )}
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{`${userInfo?.name}${userInfo?.showAge ? `, ${userAge}` : ''}`}</Text>
            {userInfo?.accountConfirmed && <CheckStarWhite style={styles.checkStarIcon} />}
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Complete profile" buttonStyle={styles.button} buttonTitleStyle={styles.buttonTitle} onPress={goToMyProfileView} />
          </View>
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
                activeOpacity={0.7}
                onPress={() => setActiveTabId(id)}
                style={[styles.tabButton, isActive ? styles.tabButtonActive : styles.tabButtonInactive]}>
                <Text style={[styles.tabButtonText, isActive ? styles.tabButtonTextActive : styles.tabButtonTextInactive]}>{title}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.tabContentContainer}>{getTabContent()}</View>
      </ScrollView>
    </View>
  );
};

export default Profile;
