import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Invitations from './Invitations/Invitations';
import SafetyAndWellbeing from './SafetyAndWellbeing/SafetyAndWellbeing';
import MyPlan from './MyPlan/MyPlan';
import Man from 'assets/images/auth/man.png';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import {useState} from 'react';
import Button from 'components/Button/Button';
import useStyles from './styles';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {myProfileViewPath} from 'constants/pathLocations';

const Profile = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  const percentage = 10;
  const name = 'Jameson';
  const age = 22;
  const isConfirmed = true;
  const tabList = [
    {id: 0, title: 'My Plan'},
    {id: 1, title: 'Safety & Wellbeing'},
    {id: 2, title: 'Invitations'},
  ];

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
    navigation.navigate(myProfileViewPath);
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
            <Image source={Man} style={styles.profileImage} />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{`${name}, ${age}`}</Text>
            {isConfirmed && <CheckStarWhite style={styles.checkStarIcon} />}
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
