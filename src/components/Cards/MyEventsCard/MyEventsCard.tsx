import React, {FC} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';

//import components
import useStyles from 'components/Cards/MyEventsCard/styles.ts';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import IconPending from 'assets/images/icons/pending-clock.svg';
import IconAccepted from 'assets/images/icons/tick-circle.svg';
import IconEdit from 'assets/images/icons/edit.svg';
import IconMore from 'assets/images/icons/more.svg';
import CalendarBlank from 'assets/images/icons/CalendarBlank.svg';
import ProfileTwoUser from 'assets/images/icons/profile-2user.svg';
import Users from 'assets/images/icons/Users.svg';
import LoadingLoop from 'assets/images/icons/loading-loop.svg';
import Clock from 'assets/images/icons/clock-white.svg';
import {lightGray2Color, lightGreenColor} from 'constants/colors.ts';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, eventActiveInfoPath} from 'constants/pathLocations';
import {screenWidth} from 'constants/common.ts';

interface MyEventsCard {
  estimeTime?: string;
  activeState: boolean;
  invitingPeople?: any[];
  list?: any;
  allPeople?: number;
  textCityName?: string;
  numberOfGirlsInvited?: string;
  date?: string;
  imageBg?: string;
}

const MyEventsCard: FC<MyEventsCard> = props => {
  const {list, imageBg, activeState, estimeTime, date, invitingPeople, numberOfGirlsInvited, allPeople, textCityName} = props;
  const styles = useStyles();

  const navigation = useAppNavigation();

  const EventInReviewView = () => (
    <View style={styles.eventInReviewView}>
      <LoadingLoop />
      <Text style={styles.textEventInReview}>Event in review</Text>
      <View style={styles.rowEventInReview}>
        <Clock width={12} height={12} />
        <Text style={styles.textEstimeTime}>Estime time {estimeTime}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground borderRadius={14} source={{uri: imageBg}} style={styles.imageBackground}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={styles.linearGradientCard}>
          {activeState ? (
            <TouchableOpacity style={styles.header} onPress={() => navigation.navigate(commonStackPath, {screen: eventActiveInfoPath, params: {list: list}} as never)}>
              <View style={styles.userWrapper}>
                {invitingPeople?.map((i: any | boolean, index: number) => (
                  <View style={[styles.userItemWrapper, index !== 0 && styles.anotherUsers]}>
                    <Image style={styles.imageFakeGirl} source={{uri: i?.userPhoto}} />
                    {i?.status === 'accepted' ? (
                      <IconAccepted style={styles.iconStatus} width={21} height={21} />
                    ) : (
                      <IconPending style={styles.iconStatus} width={21} height={21} />
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.wrapperTextStartInviting}>
                <Text style={styles.textStartInviting}>{allPeople === invitingPeople?.length ? 'Guest list is full' : 'Start inviting'}</Text>
                <ArrowRight style={styles.arrowRightIcon} width={14} height={14} />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.wrapperEventInReviewView}>
              <EventInReviewView />
            </View>
          )}
          <View style={styles.footer}>
            <View style={styles.wrapperFooterInfo}>
              <View style={[styles.rowActiveStatus, {backgroundColor: activeState ? lightGreenColor : lightGray2Color}]}>
                <Text style={styles.textFooter}>{activeState ? 'Active' : 'Pending'}</Text>
              </View>
              <View style={styles.rowCountPeople}>
                <Users />
                <Text style={styles.textFooter}>
                  {invitingPeople?.length}/{allPeople}
                </Text>
              </View>
            </View>
            <View style={styles.wrapperFooterButtons}>
              <TouchableOpacity style={[styles.buttonEdit, activeState && {marginRight: screenWidth / 40}]}>
                <IconEdit width={16} height={16} />
              </TouchableOpacity>
              {activeState && (
                <TouchableOpacity style={styles.buttonMore}>
                  <IconMore />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.wrapperTextUnderCard}>
        <Text style={styles.textCityName}>{textCityName}</Text>
        <View style={styles.rowTextUnderFooter}>
          <ProfileTwoUser />
          <Text style={styles.textUnderFooter}>{numberOfGirlsInvited} x Girl invitation</Text>
        </View>
        <View style={styles.rowTextUnderFooter}>
          <CalendarBlank />
          <Text style={styles.textUnderFooter}>{moment(date).format('DD.MM.YYYY')}</Text>
        </View>
      </View>
    </View>
  );
};

export default MyEventsCard;
