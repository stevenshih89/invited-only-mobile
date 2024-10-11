import React, {FC, useCallback, useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';

//import components
import useStyles from 'components/Modal/ModalEventRemindes/styles.ts';
import Button from 'components/Button/Button.tsx';

//import icons
import {black4Color, blackColor, lightGray18Color, lightGreenColor, whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {commonStackPath, eventEditingPath} from 'constants/pathLocations';
import {ACCEPTED_STATUS} from 'constants/common';
import FastImage from 'react-native-fast-image';
import { useUser } from 'src/store/userStore';
import { getUsersListAccepted } from 'helpers/getUsersListAccepted';

interface ModalFullEvent {
  isVisible: boolean;
  idEvent: string;
  setIsVisibleModalFullEvent: any;
  actualActiveEventDataProps?: any;
  totalQuantityGuestsProps?: any;
  acceptQuantityGuestProps?: any;
  totalRequestsGuestsProps?: any;
}

const ModalFullEvent: FC<ModalFullEvent> = ({
  idEvent,
  isVisible,
  setIsVisibleModalFullEvent,
  actualActiveEventDataProps,
  totalQuantityGuestsProps,
  acceptQuantityGuestProps,
  totalRequestsGuestsProps,
}) => {
  const [actualActiveEventData, setActualActiveEventData] = useState([]);
  const [totalQuantityGuests, setTotalQuantityGuests] = useState<number>(0);
  const [acceptQuantityGuest, setAcceptQuantityGuest] = useState<number>(0);
  const [totalRequestsGuests, setTotalRequestsGuests] = useState<number>(0);

  const styles = useStyles();

  const navigation = useNavigation();

  const user = useUser((i: any) => i?.user);

  const getActiveEventData = async () => {
    const getEventData = await firestore().collection('Events').doc(idEvent).get();
    if (!getEventData.exists) {
      return;
    }
    const data = getEventData.data();
    setActualActiveEventData(data);
    setTotalQuantityGuests(data?.male + data?.female);
    setAcceptQuantityGuest(data?.usersList.filter(item => item.status === ACCEPTED_STATUS).length);
  };

  useFocusEffect(
    useCallback(() => {
      getActiveEventData();
    }, []),
  );

  return (
    <View>
      <Modal
        isVisible={isVisible}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={blackColor}
        backdropOpacity={1}
        onBackdropPress={() => setIsVisibleModalFullEvent(false)}
        onSwipeComplete={() => setIsVisibleModalFullEvent(false)}
        testID={'bottom-half-modal-open-button'}
        style={styles.modalStyles}
        swipeDirection={['down']}>
        <View style={styles.wrapper}>
          <View style={styles.whiteLine} />
          <View style={{width: '100%', padding: 9, backgroundColor: whiteColor, borderRadius: 30}}>
            <FastImage
              resizeMode="cover"
              source={{
                uri: actualActiveEventDataProps
                  ? actualActiveEventDataProps?.photos?.[0]?.image
                  : actualActiveEventData?.photos?.[0]?.image,
              }}
              style={[styles.eventImage, {justifyContent: 'flex-end'}]}>
              {actualActiveEventData?.statusEvent && (
                <View
                  style={{
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    backgroundColor: lightGreenColor,
                    borderRadius: 5,
                    alignSelf: 'flex-start',
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi500,
                      fontSize: RFValue(12, 812),
                    }}>
                    Active
                  </Text>
                </View>
              )}
            </FastImage>
            <View style={{flexDirection: 'row', paddingHorizontal: 17, paddingVertical: 22, justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <View>
                <Text
                  style={{
                    color: lightGray18Color,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(16, 812),
                  }}>
                  Name
                </Text>
                <Text
                  style={{
                    color: black4Color,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(20, 812),
                    marginTop: 4
                  }}>
                  {actualActiveEventData?.name}
                </Text>
              </View>
              <View
              style={{
                borderWidth: 1,
                borderColor: blackColor,
                borderRadius: 10,
                flexDirection: 'row',
                paddingHorizontal: 16,
                paddingVertical: 7,
                alignItems: 'center',
              }}>
              <FastImage
                style={{width: 40, height: 40, borderRadius: 40}}
                source={{uri: user?.photos[0]?.image}}
              />
              <View style={{marginLeft: 10, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: RFValue(26, 812),
                    color: blackColor,
                    fontFamily: Satoshi700,
                  }}>
                  {getUsersListAccepted(actualActiveEventData?.usersList)}/{actualActiveEventData?.male + actualActiveEventData?.female}
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(12, 812),
                    color: blackColor,
                    fontFamily: Satoshi500,
                  }}>
                  Guest List
                </Text>
              </View>
            </View>
            </View>
          </View>
          <Text
            style={{
              color: whiteColor,
              fontFamily: Satoshi500,
              fontSize: RFValue(30, 812),
              textAlign: 'center',
              marginTop: 20,
              width: '90%'
            }}>{`Change guest list from ${totalQuantityGuestsProps ? totalQuantityGuestsProps : totalQuantityGuests} to ${
            totalQuantityGuestsProps ? totalQuantityGuestsProps : totalQuantityGuests + 1
          }?`}</Text>
          <View style={{width: '100%'}}>
            <Button
              onPress={() => {
                navigation.navigate(commonStackPath, {
                  screen: eventEditingPath,
                  params: {
                    isEditingItems: actualActiveEventDataProps ? actualActiveEventDataProps : actualActiveEventData,
                    isEditing: true,
                  },
                });
                setIsVisibleModalFullEvent(false);
              }}
              title="Yes, change my guest list"
              buttonStyle={styles.button}
            />
            <TouchableOpacity style={{marginBottom: 30}} onPress={() => setIsVisibleModalFullEvent(false)}>
              <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812), textAlign: 'center'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalFullEvent;
