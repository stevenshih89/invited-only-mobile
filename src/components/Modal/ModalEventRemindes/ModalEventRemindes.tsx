import React, {FC, useState} from 'react';
import {View, Text, Image} from 'react-native';
import Modal from 'react-native-modal';

//import components
import useStyles from 'components/Modal/ModalEventRemindes/styles.ts';
import Button from 'components/Button/Button.tsx';
import {showToast} from 'helpers/showToast.ts';

//import icons
import CalendarIcon from 'assets/images/icons/calendar.svg';
import PeopleIcon from 'assets/images/icons/person.svg';
import FlashIcon from 'assets/images/icons/flash.svg';

interface ModalEventRemindeProps {
  eventStarting: boolean;
  setEventStarting: boolean | any;
  time: string;
  image: any;
  city: string;
  date: string;
  girlInvitation: number | string;
}

const ModalEventRemindes: FC<ModalEventRemindeProps> = ({girlInvitation,date, city, setEventStarting, eventStarting, time, image}) => {
  const [chahModal, setChatModal] = useState<boolean>(false);
  const [onTheWayState, setOnTheWayState] = useState<boolean>(false);
  const styles = useStyles();

  const OnTheWayModal = () => {
    return (
      <Modal
        isVisible={chahModal}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={() => setChatModal(false)}
        onSwipeComplete={() => setChatModal(false)}
        style={styles.modalStyles}
        swipeDirection={['down']}>
        <View style={styles.wrapperCancelEvent}>
          <View style={styles.whiteLine} />
          <View>
            <Image resizeMode="contain" source={{uri: image}} style={styles.eventImage} />
          </View>
          <View style={styles.main}>
            <Text style={styles.textCity}>{city}</Text>
            <View style={styles.fdr}>
              <PeopleIcon />
              <Text style={styles.textGirlInvitation}>{girlInvitation} x Girl invitation </Text>
            </View>
            <View style={styles.fdr}>
              <CalendarIcon width={19} height={19} />
              <Text style={styles.textDate}>{date}</Text>
            </View>
          </View>
          <View style={[styles.fdr, {alignItems: 'center'}]}>
            <Text style={styles.textAreYouSure}>Are you on the way?</Text>
          </View>
          <Button
            onPress={() => {
              showToast('success', 'Go to my events!');
              setChatModal(false);
              setEventStarting(false);
            }}
            title="Im on my way"
            buttonStyle={styles.button}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setChatModal(false);
            }}
            title="Go to my event"
            buttonStyle={{width: '100%'}}
          />
        </View>
      </Modal>
    );
  };

  const OpenChatModal = () => {
    return (
      <Modal
        isVisible={onTheWayState}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={() => setOnTheWayState(false)}
        onSwipeComplete={() => setOnTheWayState(false)}
        style={styles.modalStyles}
        swipeDirection={['down']}>
        <View style={styles.wrapperOnTheWay}>
          <View style={styles.whiteLine} />
          <View>
            <Image source={{uri: image}} style={styles.userPhoto} />
            {/*{online && <View style={styles.greenCircle} />}*/}
            <View style={styles.greenCircle} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text style={styles.title}>Alexa</Text>
            <FlashIcon width={19} height={19} />
          </View>
          <Text style={styles.textAreYouSure}>Are you sure you want to remove Alexf?</Text>
          <Text style={styles.textDescription}>Nammos Dubai place?</Text>
          <Button
            onPress={() => {
              setOnTheWayState(false);
              setChatModal(false);
              setEventStarting(false);
            }}
            title="Chat"
            buttonStyle={styles.button}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setOnTheWayState(false);
            }}
            title="Close"
            buttonStyle={{width: '100%'}}
          />
        </View>
      </Modal>
    );
  };

  return (
    <Modal
      isVisible={eventStarting}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.94)'}
      testID={'bottom-half-modal-open-button'}
      onBackdropPress={() => setEventStarting(false)}
      onSwipeComplete={() => setEventStarting(false)}
      style={styles.modalStyles}
      swipeDirection={['down']}>
      <View style={styles.wrapper}>
        <View style={styles.whiteLine} />
        <View>
          <Image resizeMode="cover" source={{uri: image}} style={styles.eventImage} />
        </View>
        <View style={styles.main}>
          <Text style={styles.textCity}>{city}</Text>
          <View style={styles.fdr}>
            <PeopleIcon />
            <Text style={styles.textGirlInvitation}>{girlInvitation} x Girl invitation </Text>
          </View>
          <View style={styles.fdr}>
            <CalendarIcon width={19} height={19} />
            <Text style={styles.textDate}>{date}</Text>
          </View>
        </View>
        <Text style={styles.textAreYouSure}>Event starting in {time}!</Text>
        <Button
          onPress={() => {
            showToast('success', 'By Alexa');
            setEventStarting(false);
            // setModalVisible(false);
          }}
          title="Confirm"
          buttonStyle={styles.button}
        />
        <Button
          variant="transparent"
          onPress={() => {
            setChatModal(true);
            // setOnTheWayState(true);
          }}
          title="Go to my event"
          buttonStyle={{width: '100%'}}
        />
      </View>
      <OnTheWayModal />
      <OpenChatModal />
    </Modal>
  );
};

export default ModalEventRemindes;
