import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {FC, ReactNode, useEffect, useState} from 'react';
import {blackColor, orangeClose, transparentWhite30Color, whiteColor} from 'constants/colors';
import CheckCircleIcon from 'assets/images/icons/check-circle.svg';
import {Image} from 'react-native';
import {Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';

interface FullEventProps {
  activeEvent: any;
  totalQuantityGuests: number;
  totalRequestsGuests?: number;
  acceptQuantityGuest: number;
  rightComponent?: ReactNode;
  text: string;
  styleContainer?: StyleProp<ViewStyle>;
}

const FullEvent: FC<FullEventProps> = ({activeEvent, totalRequestsGuests, rightComponent, text, styleContainer}) => {
  const [actualActiveEventData, setActualActiveEventData] = useState([]);

  const getActiveEventData = async () => {
    const getEventData = (await firestore().collection('Events').doc(activeEvent.id).get()).data();
    if (getEventData) {
      setActualActiveEventData(getEventData);
    }
  };

  useEffect(() => {
    getActiveEventData();
  }, [activeEvent]);

  return (
    <View style={[{paddingHorizontal: 20, marginBottom: 18, width: '100%'}, styleContainer]}>
      <View
        style={{
          backgroundColor: orangeClose,
          borderRadius: 10,
          width: '100%',
          paddingVertical: 6,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {actualActiveEventData?.usersList?.map((item, index) => {
            if (item.status === 'invite_match' && index < 2) {
              return (
                <View key={item.uid} style={{alignItems: 'center', justifyContent: 'center'}}>
                  {index < 1 ? (
                    <Image
                      style={{width: 32, height: 32, borderRadius: 32, borderWidth: 1, borderColor: whiteColor}}
                      source={{uri: item.userPhoto}}
                    />
                  ) : (
                    <Image
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 32,
                        borderWidth: 1,
                        borderColor: whiteColor,
                        transform: [{translateX: -10}],
                      }}
                      source={{uri: item.userPhoto}}
                    />
                  )}
                  <View style={{position: 'absolute', left: index < 1 ? 7 : -2}}>
                    <CheckCircleIcon width={18} height={18} />
                  </View>
                </View>
              );
            }
            return null;
          })}
          {totalRequestsGuests && activeEvent?.usersList?.length > 1 ? (
            <View
              style={{
                width: 32,
                height: 32,
                transform: [{translateX: activeEvent?.usersList?.length >= 2 ? -20 : -10}],
                borderRadius: 32,
                borderWidth: 1,
                borderColor: transparentWhite30Color,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: whiteColor,
                  borderRadius: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: blackColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(10, 812),
                    textAlign: 'center',
                  }}>
                  {`+${totalRequestsGuests}`}
                </Text>
              </View>
            </View>
          ) : null}
          <Text
            style={{
              fontFamily: Satoshi700,
              transform: [
                {
                  translateX:
                    activeEvent?.usersList?.length >= 2 && totalRequestsGuests ? -20 : activeEvent?.usersList?.length > 1 ? -10 : 0,
                },
              ],
              fontSize: RFValue(11, 812),
              color: whiteColor,
              marginLeft: 6,
            }}>
            {text}
          </Text>
        </View>
        {rightComponent && rightComponent}
      </View>
    </View>
  );
};

export default FullEvent;
