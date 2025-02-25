import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Invitations from './screens/Invitations/Invitations';
import SafetyAndWellbeing from './screens/SafetyAndWellbeing/SafetyAndWellbeing';
import MyPlan from './screens/MyPlan/MyPlan';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import EditBlack from 'assets/images/icons/edit-black.svg';
import {FC} from 'react';
import Button from 'components/Button/Button';
import useStyles from './styles';
import {
  blackColor,
  lightGray9Color,
  transparentGray60Color,
  transparentWhite30Color,
  transparentWhite40Color,
  whiteColor,
} from 'constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import ModalChangeAccountType from 'components/Modal/ModalChangeAccountType';
import { useProfile } from 'hooks/useProfile';
import { ProgressCircle } from 'components/ProgressCircle/ProgressCircle';

const Profile: FC = () => {
  const {
    activeTabId,
    setActiveTabId,
    percentage,
    userInfo,
    userAge,
    totalGuests,
    eventsCount,
    rejectModalVisible,
    acceptModalVisible,
    setAcceptModalVisible,
    changeAccountTypeModalVisible,
    setChangeAccountModalVisible,
    tabList,
    goToMyProfileView} = useProfile();

  const styles = useStyles();

  const getTabContent = () => {
    switch (activeTabId) {
      case 0:
        return <MyPlan/>;
      case 1:
        return <SafetyAndWellbeing />;
      case 2:
        return <Invitations />;
      default:
        return <MyPlan />;
    }
  };

  return (
    <View style={styles.container}>
      {userInfo?.photos?.length > 0 && <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo.photos[0].image} />}
      {acceptModalVisible && (
        <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />
      )}
      {changeAccountTypeModalVisible && !acceptModalVisible && (
        <ModalChangeAccountType isVisible={changeAccountTypeModalVisible} userInfo={userInfo} setIsVisible={setChangeAccountModalVisible} />
      )}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View>
          <View style={styles.profileImageContainer}>
            <View style={styles.overlayContainer}>
              <View style={styles.overlayBackground}>
                <Text style={styles.percentageText}>{percentage}%</Text>
              </View>
            </View>
            {userInfo?.photos?.[0]?.image ? (
              <FastImage
                style={styles.profileImage}
                source={{
                  uri: userInfo?.photos?.[0]?.image,
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
      </ScrollView>
    </View>
  );
};

export default Profile;
