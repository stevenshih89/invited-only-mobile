import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

//import components
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from '@ant-design/react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Config from 'react-native-config';
import { components } from '@invited-only/invited-only-api';
import useStyles from './styles';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';

//import icons
import ArrowRightIcon from 'assets/images/icons/arrow-right.svg';
import PeopleIcon from 'assets/images/icons/profile-2user.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ClockIcon from 'assets/images/icons/clock-white.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import MapIcon from 'assets/images/icons/location.svg';

//import images
import { transparentWhite16Color, whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi700 } from 'constants/fonts';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';

interface EventInfoProps {
  event: components['schemas']['EventData'];
}

const EventInfo = ({ event }: EventInfoProps) => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const styles = useStyles();
  const [hostInfo, setHostInfo] = useState<components['schemas']['User']>();
  const [loading, setLoading] = useState(true);

  const { photos, placeName, hour, date, female, femaleFriend, male, uid, name } = event;

  const getHostInfo = async (uid: string) => {
    try {
      const host = await firestore().collection(apiUserInfoCollection).doc(uid).get();
      setHostInfo(host.data() as components['schemas']['User']);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      logErrorToSentry(e);
      // console.log(e);
    }
  };

  useEffect(() => {
    getHostInfo(uid);
  }, []);

  const goToProfileView = () => {

  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 50 }}
        style={{ flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid' }}>
        <View style={styles.wrapperFakeCard}>
          <TouchingSlider
            date={date}
            placeName={placeName}
            girls={`${female || 0} + ${femaleFriend || 0}`}
            eventPhotos={photos}
            isShowEventPreview={true}
            isShowWantsJoin={false}
            isShowInvitesTooltip={false}
            isShowCardButtons={false}
            photos={event.photos?.map((photo) => photo.image || '') || []}
            name={name}
            isPreview={false} item={undefined} activeType={0} scrollPositionPreview={0} eventsCreated={0} male={0} female={0} setCurrentEventCardPosition={function (value: number): void {
              throw new Error('Function not implemented.');
            }} setScrollPosition={function (value: number): void {
              throw new Error('Function not implemented.');
            }} />

          <View style={styles.bioWrapper}>
            <Text style={[styles.titleSection, { marginTop: 20 }]}>Event details</Text>
            <Text style={{ marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812) }}>Place name</Text>
            <Text style={{ marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812) }}>{placeName}</Text>
            <View style={{ width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14 }} />
            <Text style={[{ marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812) }, { marginTop: 20 }]}>
              Event name
            </Text>
            <Text style={{ marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812) }}>{name}</Text>
            <View style={{ width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14 }} />
            <Text style={[{ marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812) }, { marginTop: 20 }]}>
              Event description
            </Text>

            <View style={{ width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14 }} />
            <View style={{ marginTop: 28 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <CalendarIcon width={16} height={16} />
                <Text style={{ color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6 }}>{date}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <ClockIcon width={16} height={16} />
                <Text style={{ color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6 }}>{hour}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <MapIcon width={16} height={16} />
                {/* <Text style={{ color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6 }}>{address}</Text> */}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <PeopleIcon width={16} height={16} />
                <Text style={{ color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6 }}>
                  {`${female || 0} + ${femaleFriend || 0}`}x girl
                </Text>
              </View>
            </View>
            {photos?.map((i, index) => (
              <Image key={index} source={{ uri: i?.image }} style={[styles.imageBg, { marginTop: index === 0 ? 0 : 8 }]} />
            ))}
            <Text style={styles.titleSection}>Already joined</Text>
            <View>
              <View style={styles.wrapperNumberPeople}>
                <Text style={styles.textUnderSubTitle}>Female</Text>
                <View style={styles.rowNumberPeople}>
                  <Text style={styles.textNumberInvitedPeople}>{female}</Text>
                </View>
              </View>
            </View>
            <View>
              <View style={[styles.wrapperNumberPeople, { marginTop: 12 }]}>
                <Text style={styles.textUnderSubTitle}>Male</Text>
                <View style={styles.rowNumberPeople}>
                  <Text style={styles.textNumberInvitedPeople}>{male}</Text>
                </View>
              </View>
            </View>
            {loading ? (
              <ActivityIndicator color={whiteColor} size="small" />
            ) : (
              <>
                <Text style={styles.titleSection}>Host profile</Text>
                <View style={styles.wrapperHostProfile}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={{ uri: hostInfo?.photos?.[0]?.image || '' }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                      {/*<View style={styles.greenCircle} />*/}
                    </View>
                    <View style={{ marginLeft: 13 }}>
                      <Text style={styles.textSimon}>{hostInfo?.name}</Text>
                      {/*<Text style={styles.textOnline}>Online</Text>*/}
                    </View>
                  </View>
                  <TouchableOpacity onPress={goToProfileView}>
                    <Text style={styles.textSeeProfile}>
                      See profile <ArrowRightIcon width={14} height={14} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
          </View>
          <Text style={styles.textHideNadSendReport}>Reject and send report</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventInfo;
