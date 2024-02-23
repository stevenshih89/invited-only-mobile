import {FlatList, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import FlashFilled from 'assets/images/icons/flash-filled.svg';
import FakeGirlOne from 'assets/images/app/fake-girl-1.png';
import FakeGirlTwo from 'assets/images/app/fake-girl-2.png';
import FakeGirlThere from 'assets/images/app/fake-girl-3.png';
import FakeGirlFour from 'assets/images/app/fake-girl-4.png';
import Home from 'assets/images/icons/home.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import Location from 'assets/images/icons/location.svg';

import {FC, ReactElement} from 'react';
import useStyles from './styles';

const Requests: FC = (): ReactElement => {
  const styles = useStyles();
  const data = [
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
      id: 1,
      name: 'Carla',
      age: 29,
      location: 'From in Bairro Alto',
      distance: 2,
      image: FakeGirlThere,
    },
    {
      id: 1,
      name: 'Carla',
      age: 29,
      location: 'From in Bairro Alto',
      distance: 2,
      image: FakeGirlFour,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={styles.listContentContainer}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <ImageBackground style={styles.imageBackground} resizeMode="cover" source={item.image}>
              <View style={styles.itemContentContainer}>
                {item.isSuperLike && (
                  <View style={styles.superLikeContainer}>
                    <View style={styles.superLikeRow}>
                      <FlashFilled style={styles.superLikeIcon} />
                      <Text style={styles.superLikeText}>{`${item.name} Super Like you!`}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity activeOpacity={0.7} style={styles.buttonContainer}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.ageText}>{item.age}</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <View style={styles.locationRow}>
                      <Home height={12} />
                      <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                    <ArrowRight height={12} />
                  </View>
                  <View style={styles.distanceContainer}>
                    <Location height={12} />
                    <Text style={styles.distanceText}>{`${item.distance} kilometers away`}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
};

export default Requests;
