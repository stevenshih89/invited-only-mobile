import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';

//import components
import useStyles from './styles';
import {userProfilePath} from 'constants/pathLocations.ts';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';

//import icons
import ArrowRightIcon from 'assets/images/icons/arrow-right.svg';
import PersonIcon from 'assets/images/icons/person.svg';
import PeopleIcon from 'assets/images/icons/profile-2user.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ClockIcon from 'assets/images/icons/clock-white.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import MapIcon from 'assets/images/icons/location.svg';

//import images
import FakePhoto from 'assets/images/app/fake-photo.png';
import ImageBg from 'assets/images/app/join-event-bg.png';
import {transparentWhite16Color} from 'constants/colors';

const EventInfo = ({navigation, route}: any) => {
  const styles = useStyles();

  const {list} = route?.params;
  const {photos, placeName, meetingSpot, description, hour, date, address, female, femaleFriend, male, maleFriend, name} = list;

  const iconsArrayMale = Array.from({length: male}, (_, index) => index);
  const iconsArrayFemale = Array.from({length: female}, (_, index) => index);

  console.log('list on event info', list);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 20, paddingBottom: 50}}
        style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
        <View style={styles.wrapperFakeCard}>
          <TouchingSlider isShowEventPreview={true} isShowWantsJoin={false} isShowInvitesTooltip={false} isShowCardButtons={false} photos={photos} />

          <View style={styles.bioWrapper}>
            <Text style={styles.titleSection}>Event Details</Text>
            <Text style={styles.subTitle}>Place name</Text>
            <Text style={styles.textUnderSubTitle}>{placeName}</Text>
            <Text style={[styles.subTitle, {marginTop: 20}]}>Event name</Text>
            <Text style={styles.textUnderSubTitle}>{meetingSpot}</Text>
            <Text style={[styles.subTitle, {marginTop: 20}]}>Event description</Text>
            <Text style={styles.textDescription}>{description}</Text>
            <View style={{marginTop: 28}}>
              <View style={styles.fdrAlc}>
                <CalendarIcon width={16} height={16} />
                <Text style={styles.textInfo}>{date}</Text>
              </View>
              <View style={styles.fdrAlc}>
                <ClockIcon width={16} height={16} />
                <Text style={styles.textInfo}>{hour}</Text>
              </View>
              <View style={styles.fdrAlc}>
                <MapIcon width={16} height={16} />
                <Text style={styles.textInfo}>{address}</Text>
              </View>
              <View style={styles.fdrAlc}>
                <PeopleIcon width={16} height={16} />
                <Text style={styles.textInfo}>{female + femaleFriend}x girl</Text>
              </View>
            </View>
            {photos?.map((i, index) => (
              <Image source={{uri: i?.image}} style={[styles.imageBg, {marginTop: index === 0 ? 0 : 8}]} />
            ))}
            <Text style={styles.titleSection}>Already joined</Text>
            <View>
              <View style={styles.wrapperNumberPeople}>
                <Text style={styles.textUnderSubTitle}>Female</Text>
                <View style={styles.rowNumberPeople}>
                  <Text style={styles.textNumberInvitedPeople}>{female}</Text>
                </View>
              </View>
              <View style={styles.rowPersonIcon}>
                {iconsArrayFemale?.map(index => (
                  <View key={index} style={[styles.wrapperPersonIcon, {marginLeft: index === 0 ? 0 : 10}]}>
                    <PersonIcon width={18} height={18} />
                  </View>
                ))}
              </View>
            </View>
            <View>
              <View style={[styles.wrapperNumberPeople, {marginTop: 12}]}>
                <Text style={styles.textUnderSubTitle}>Male</Text>
                <View style={styles.rowNumberPeople}>
                  <Text style={styles.textNumberInvitedPeople}>{male}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 12, marginBottom: 28}}>
                {iconsArrayMale?.map(index => (
                  <View key={index} style={[styles.wrapperPersonIcon, {marginLeft: index === 0 ? 0 : 10}]}>
                    <PersonIcon width={18} height={18} />
                  </View>
                ))}
              </View>
            </View>
            <Text style={styles.titleSection}>Host profile</Text>
            <View style={styles.wrapperHostProfile}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <Image source={FakePhoto} style={{width: 40, height: 40, borderRadius: 50}} />
                  {/*<View style={styles.greenCircle} />*/}
                </View>
                <View style={{marginLeft: 13}}>
                  <Text style={styles.textSimon}>{name}</Text>
                  {/*<Text style={styles.textOnline}>Online</Text>*/}
                </View>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate(userProfilePath)}>
                <Text style={styles.textSeeProfile}>
                  See profile <ArrowRightIcon width={14} height={14} />
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapperButtonsFooter}>
              <TouchableOpacity style={styles.buttonCloseOrCheck}>
                <CloseIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonFlash}>
                <FlashIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCloseOrCheck}>
                <CheckIcon />
              </TouchableOpacity>
            </View>
            <Text style={styles.textHideNadSendReport}>Reject and send report</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventInfo;
