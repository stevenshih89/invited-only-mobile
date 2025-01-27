import { black4Color, blackColor, lightGray18Color, lightGreenColor, whiteColor } from "constants/colors";
import { FC } from "react";
import { Text, View } from "react-native";
import Button from 'components/Button/Button.tsx';
import Modal from 'react-native-modal';
import useStyles from "./styles";
import FastImage from "react-native-fast-image";
import { Satoshi400, Satoshi500, Satoshi700 } from "constants/fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { getUsersListAccepted } from "helpers/getUsersListAccepted";

interface RemindersStartingI {
    isModalVisible: boolean;
    setEventStarting: (value: boolean) => void;
    currentEvent: {
      name: string;
      photos: { image: string }[];
      usersList: any[];
      male: number;
      female: number;
    };
    hoursUntilEvent?: number;
    time: string;
    incrementCount: () => void;
  }

const ModalEventRemindersStarting: FC<RemindersStartingI> = ({
    isModalVisible,
    setEventStarting,
    currentEvent,
    hoursUntilEvent,
    time,
    incrementCount,
}) => {
    const styles = useStyles()
    return (
      <Modal
      isVisible={isModalVisible}
      backdropOpacity={1}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={blackColor}
      testID={'bottom-half-modal-open-button'}
      onBackdropPress={() => {
        incrementCount();
        setEventStarting(false);        
        
      }}
      onSwipeComplete={() => {
        incrementCount()
        setEventStarting(false);
      }}
      style={styles.modalStyles}
      swipeDirection={['down']}>
      <View style={styles.wrapper}>
        <View style={styles.whiteLine} />
        <View style={{width: '100%', backgroundColor: whiteColor, borderRadius: 30, padding: 9}}>
          <View style={{width: '100%'}}>
            <FastImage resizeMode="cover" source={{uri: currentEvent?.photos?.[0]?.image}} style={[styles.eventImage]}>
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
            </FastImage>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 17,
                paddingVertical: 22,
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              {currentEvent?.name && (
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
                      fontSize: currentEvent?.name.length > 10 ? RFValue(16, 812) : RFValue(20, 812),
                      marginTop: 4,
                    }}>
                    {currentEvent?.name}
                  </Text>
                </View>
              )}
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
                <FastImage style={{width: 40, height: 40, borderRadius: 40}} source={{uri: currentEvent?.photos[0]?.image}} />
                <View style={{marginLeft: 10, alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: currentEvent?.name?.length > 10 ? RFValue(22, 812) : RFValue(26, 812),
                      color: blackColor,
                      fontFamily: Satoshi700,
                    }}>
                    {getUsersListAccepted(currentEvent?.usersList)}/{currentEvent?.male + currentEvent?.female}
                  </Text>
                  <Text
                    style={{
                      fontSize: currentEvent?.name.length > 10 ? RFValue(10, 812) : RFValue(12, 812),
                      color: blackColor,
                      fontFamily: Satoshi500,
                    }}>
                    Guest List
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {!!hoursUntilEvent && <Text style={styles.textAreYouSure}>{`Event starting in ${hoursUntilEvent}h!`}</Text>}
        <Button
          onPress={async () => {
            if (time === '0') {
              setEventStarting(false);
            } else {
              incrementCount()
              setEventStarting(false);
            }
          }}
          title={time === '0' ? 'Im on my way' : 'Confirm'}
          buttonStyle={styles.button}
        />
      </View>
      {/* <OnTheWayModal />
      <OpenChatModal /> */}
    </Modal>
  );
}

export default ModalEventRemindersStarting