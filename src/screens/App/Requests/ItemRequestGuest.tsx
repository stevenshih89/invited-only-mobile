import {black4Color, blackColor, grayColor, lightGreenColor, lightRed1Color, transparent60Color, whiteColor} from 'constants/colors';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import useStyles from './styles';
import FlashFillBlack from 'assets/images/icons/flash-filled-black.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import {ActivityIndicator} from '@ant-design/react-native';
import {useUser} from '../../../store/userStore';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {screenHeight} from 'constants/common';
import {calculateAge} from 'helpers/calculateAge';
import {convertToPmAmFormat} from 'helpers/convertToPmAmFormat';
import Button from 'components/Button/Button';

import {commonStackPath, eventActiveInfoPath, myProfileViewPath, userProfilePath} from 'constants/pathLocations';
import {useItemRequestGuest} from 'hooks/useItemRequestGuest';
import {eventTypes} from 'src/mocks/eventTypes';
import {Event} from 'src/types/event';
import {User} from 'src/types/userInfo';
import {MatchData} from '../IO/screens/Match/Match';
import {useAppNavigation} from 'hooks/useAppNavigation';
import React from 'react';

interface Props {
  list: {
    photos: Event.Photo[];
    uid: string;
    hour: any;
    date: any;
    name: string;
    usersList: Partial<User.Info>[];
    activeType: number;
    placeName: string;
  };
  item: Event.User;
  handleOpenMatch: (matchData: MatchData) => void;
  index: number;
}

const ItemRequestGuest = ({list, item, handleOpenMatch, index}: Props) => {
  const {photos, uid, hour, date, name, usersList, activeType, placeName} = list;

  const styles = useStyles();
  const user = useUser((i: any) => i?.user);

  const {loading, heightAnim, cardRef, handleInvite, handleReject, hostInfo, getMonth} = useItemRequestGuest({list, handleOpenMatch});

  const OverlayRight = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          zIndex: 1000,
          alignItems: 'center',
        }}>
        <View style={{borderRadius: 5, paddingHorizontal: 13, paddingVertical: 6, borderWidth: 2, borderColor: whiteColor}}>
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>ACCEPT</Text>
        </View>
      </View>
    );
  };

  const OverlayLeft = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          right: 0,
          left: 0,
          zIndex: 1000,
          alignItems: 'center',
        }}>
        <View style={{borderRadius: 5, paddingHorizontal: 13, paddingVertical: 6, borderWidth: 2, borderColor: lightRed1Color}}>
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: lightRed1Color}}>REJECT</Text>
        </View>
      </View>
    );
  };

  const navigation = useAppNavigation();

  if (item?.uid !== user?.uid) {
    return null;
  }

  return (
    <>
      {loading ? (
        <View style={{flex: 1}}>
          <ActivityIndicator color={whiteColor} size="small" />
        </View>
      ) : (
        <Animated.View style={[styles.itemContainer, {height: heightAnim, marginTop: index ? 30 : 0}]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(commonStackPath, {screen: eventActiveInfoPath, params: {list, isGuest: true}} as never)
            }></TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};

export default ItemRequestGuest;
