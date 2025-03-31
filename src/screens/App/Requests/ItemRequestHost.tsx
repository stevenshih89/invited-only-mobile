import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native';
import useStyles from './styles';
import {Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {lightRed1Color, whiteColor} from 'constants/colors';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {myProfileViewPath, userProfilePath} from 'constants/pathLocations.ts';
import {screenHeight} from 'constants/common';
import {useItemRequestHost} from 'hooks/useItemRequestHost';
import {User} from 'src/types/userInfo';
import {MatchData} from '../IO/screens/Match/Match';

interface Props {
  item: Partial<User.Info>;
  handleOpenMatch: (value: MatchData) => void;
  setIsVisibleModalFullEvent: (value: Boolean) => void;
  fetchHostRequests: () => void;
}

const ItemRequestHost = ({item, handleOpenMatch, setIsVisibleModalFullEvent, fetchHostRequests}: Props) => {
  const styles = useStyles();
  const navigation = useAppNavigation();

  const {cardRef, handleInvite, handleReject, goToProfileView} = useItemRequestHost({
    item,
    handleOpenMatch,
    setIsVisibleModalFullEvent,
    fetchHostRequests,
  });

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
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>INVITE</Text>
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

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(userProfilePath, {screen: myProfileViewPath, params: {uid: item.uid}})}
      style={{
        paddingHorizontal: 7,
        borderRadius: 12,
        width: '50%',
        height: screenHeight / 3.7,
      }}></TouchableOpacity>
  );
};

export default ItemRequestHost;
