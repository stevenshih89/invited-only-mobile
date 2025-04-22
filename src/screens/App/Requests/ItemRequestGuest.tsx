import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ActivityIndicator} from '@ant-design/react-native';
import React from 'react';
import {useUser} from '../../../store/userStore';
import {MatchData} from '../IO/screens/Match/Match';
import useStyles from './styles';
import { lightRed1Color, whiteColor} from 'constants/colors';
import { Satoshi700} from 'constants/fonts';

import {commonStackPath, eventActiveInfoPath} from 'constants/pathLocations';
import {useItemRequestGuest} from 'hooks/useItemRequestGuest';
import {Event} from 'src/types/event';
import {User} from 'src/types/userInfo';
import {useAppNavigation} from 'hooks/useAppNavigation';

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
