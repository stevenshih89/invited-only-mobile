import {FlatList, Text, View} from 'react-native';
import {FC, ReactElement, useState} from 'react';

//import images
import FakeGirlOne from 'assets/images/app/fake-girl-1.png';
import FakeGirlTwo from 'assets/images/app/fake-girl-2.png';
import FakeGirlThere from 'assets/images/app/fake-girl-3.png';
import FakeGirlFour from 'assets/images/app/fake-girl-4.png';
import ManFace from 'assets/images/auth/man-face.png';
import RequestPlace1 from 'assets/images/app/requst-place-1.png';
import RequestPlace2 from 'assets/images/app/requst-place-2.png';
import ManFace2 from 'assets/images/app/request-man.png';

//import components
import useStyles from './styles';
import {whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import ItemRequestGuest from './ItemRequestGuest';
import ItemRequestHost from './ItemRequestHost';

const Requests: FC = (): ReactElement => {
  const styles = useStyles();

  const listOfHosts = [
    {id: 0, name: 'Simon', image: ManFace},
    {id: 1, name: 'Frank', image: ManFace2},
  ];

  const [dataForGuest, setDataForGuest] = useState([
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
    {
      id: 2,
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
      id: 3,
      host: listOfHosts[1],
      location: 'Test text',
      date: 2007000000012,
      invitations: {
        gender: 'Girl',
        count: 2,
      },
      image: RequestPlace2,
    },
    {
      id: 4,
      host: listOfHosts[1],
      location: 'Test text',
      date: 2007000000012,
      invitations: {
        gender: 'Girl',
        count: 2,
      },
      image: RequestPlace2,
    },
  ]);

  const [dataForHost, setDataForHost] = useState([
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
    {
      id: 4,
      name: 'Carla',
      age: 29,
      location: 'From in Bairro Alto',
      distance: 2,
      image: FakeGirlOne,
    },
  ]);

  const isHost = false;

  const handleSwipeGuestCard = (id: number) => {
    const newData = dataForGuest.filter(item => item.id !== id);
    setDataForGuest(newData);
  };

  const handleSwipeHostCard = (id: number) => {
    const newData = dataForHost.filter(item => item.id !== id);
    setDataForHost(newData);
  };

  const list = isHost ? dataForHost : dataForGuest;

  return (
    <View style={styles.container}>
      {list.length ? (
        <FlatList
          // @ts-ignore
          data={list}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContentContainer}
          extraData={list}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          renderItem={({item}) =>
            isHost ? (
              <ItemRequestHost item={item} handleSwipeHostCard={handleSwipeHostCard} />
            ) : (
              // @ts-ignore
              <ItemRequestGuest item={item} handleSwipeGuestCard={handleSwipeGuestCard} />
            )
          }
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
