import {FlatList, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FC, ReactElement} from 'react';

//import images
import FlashFilled from 'assets/images/icons/flash-filled.svg';
import FakeGirlOne from 'assets/images/app/fake-girl-1.png';
import FakeGirlTwo from 'assets/images/app/fake-girl-2.png';
import FakeGirlThere from 'assets/images/app/fake-girl-3.png';
import FakeGirlFour from 'assets/images/app/fake-girl-4.png';
import ManFace from 'assets/images/auth/man-face.png';
import RequestPlace1 from 'assets/images/app/requst-place-1.png';
import RequestPlace2 from 'assets/images/app/requst-place-2.png';
import ManFace2 from 'assets/images/app/request-man.png';
import Home from 'assets/images/icons/home.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import Location from 'assets/images/icons/location.svg';
import User from 'assets/images/icons/user.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import moment from 'moment';

//import components
import useStyles from './styles';
import {whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, eventInfoPath} from 'constants/pathLocations';

const Requests: FC = (): ReactElement => {
  const styles = useStyles();

  const navigation = useAppNavigation();

  const goToEventInfo = () => {
    navigation.navigate(commonStackPath, {screen: eventInfoPath});
  };

  const listOfHosts = [
    {id: 0, name: 'Simon', image: ManFace},
    {id: 1, name: 'Frank', image: ManFace2},
  ];

  const dataForHost = [
    {
      id: 0,
      name: 'Carla',
      age: 29,
      location: 'From in Bairro Alto',
      distance: 2,
      image: FakeGirlOne,
    },
    {
      id: 1,
      name: 'Carla',
      age: 29,
      location: 'From in Bairro Alto',
      distance: 2,
      image: FakeGirlTwo,
      isSuperLike: true,
    },
    {
      id: 2,
      name: 'Carla',
      age: 29,
      location: 'From in Bairro Alto',
      distance: 2,
      image: FakeGirlThere,
    },
    {
      id: 3,
      name: 'Carla',
      age: 29,
      location: 'From in Bairro Alto',
      distance: 2,
      image: FakeGirlFour,
    },
  ];

  const dataForGuest = [
    {
      id: 0,
      host: listOfHosts[0],
      location: 'Nammos Dubai',
      date: 2007000000012,
      invitations: {
        gender: 'Girl',
        count: 3,
      },
      isSuperInvite: true,
      image: RequestPlace1,
    },
    {
      id: 1,
      host: listOfHosts[1],
      location: 'Test text',
      date: 2007000000012,
      invitations: {
        gender: 'Girl',
        count: 2,
      },
      image: RequestPlace2,
    },
  ];

  const isHost = false;

  const renderItemForHost = ({item}: any) => {
    return (
      <View style={styles.itemContainer}>
        <ImageBackground style={styles.imageBackground} resizeMode="cover" source={item?.image}>
          <View style={[styles.itemContentContainer, {justifyContent: item?.isSuperLike ? 'space-between' : 'flex-end'}]}>
            {item?.isSuperLike && (
              <View style={styles.superLikeContainer}>
                <View style={styles.superLikeRow}>
                  <FlashFilled style={styles.superLikeIcon} />
                  <Text style={styles.superLikeText}>{`${item?.name} Super wants to join!`}</Text>
                </View>
              </View>
            )}
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
              style={styles.linearGradient}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <TouchableOpacity activeOpacity={0.7} style={styles.buttonContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>{item?.name}</Text>
                  <Text style={styles.ageText}>{item?.age}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <View style={styles.locationRow}>
                    <Home height={12} />
                    <Text style={styles.locationText}>{item?.location}</Text>
                  </View>
                  <ArrowRight height={12} />
                </View>
                <View style={styles.distanceContainer}>
                  <Location height={12} />
                  <Text style={styles.distanceText}>{`${item?.distance} kilometers away`}</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderItemForGuest = ({item}: any) => {
    return (
      <View style={styles.itemContainer}>
        <ImageBackground style={styles.imageBackground} resizeMode="cover" source={item?.image}>
          <View style={[styles.itemContentContainer, {justifyContent: item?.isSuperInvite ? 'space-between' : 'flex-end'}]}>
            {item?.isSuperInvite && (
              <View style={styles.superLikeContainer}>
                <View style={styles.superLikeRow}>
                  <FlashFilled style={styles.superLikeIcon} />
                  <Text style={styles.superLikeText}>Super invite you!`</Text>
                </View>
              </View>
            )}
            <TouchableOpacity activeOpacity={0.7} style={[styles.buttonContainer, {margin: 7}]} onPress={goToEventInfo}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Image source={item.host?.image} style={{width: 25, height: 25, borderRadius: 20}} />
                <View style={{marginLeft: 8}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(9, 812)}}>{item.host.name}</Text>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(6, 812)}}>Host</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(11, 812)}}>{item.location}</Text>
                <ArrowRight height={12} />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 6}}>
                <User width={10} height={10} />
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(10, 812),
                    marginLeft: 4,
                  }}>{`${item.invitations.count} x ${item.invitations.gender} invitation`}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Calendar width={10} height={10} />
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(10, 812),
                    marginLeft: 4,
                  }}>
                  {moment(item.date).format('D MMMM YYYY')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const list = isHost ? dataForHost : dataForGuest;

  return (
    <View style={styles.container}>
      {list.length ? (
        <FlatList
          // @ts-ignore
          data={list}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContentContainer}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          renderItem={isHost ? renderItemForHost : renderItemForGuest}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 70}}>
          <Text style={{color: whiteColor, textAlign: 'center', fontFamily: Satoshi400, fontSize: RFValue(30, 812), marginBottom: 18}}>
            You don't have any requests
          </Text>
          <Text style={{color: whiteColor, textAlign: 'center', fontFamily: Satoshi400, fontSize: RFValue(18, 812), marginBottom: 34}}>
            Add more information for yourself
          </Text>
          <Button title="See my profile" />
        </View>
      )}
    </View>
  );
};

export default Requests;
