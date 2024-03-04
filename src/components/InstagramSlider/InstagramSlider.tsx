import {FlatList, Image, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import FakeSmallGirlOne from 'assets/images/app/fake-small-girl-1.png';
import FakeSmallGirlTwo from 'assets/images/app/fake-small-girl-2.png';
import FakeSmallGirlThree from 'assets/images/app/fake-small-girl-3.png';
import FakeSmallGirlFour from 'assets/images/app/fake-small-girl-4.png';
import FakeSmallGirlFive from 'assets/images/app/fake-small-girl-5.png';
import FakeSmallGirlSix from 'assets/images/app/fake-small-girl-6.png';
import {gray1Color, whiteColor} from 'constants/colors';
import useStyles from './styles';

const InstagramSLider = () => {
  const fakeSmallGirlPhotos = [
    FakeSmallGirlOne,
    FakeSmallGirlTwo,
    FakeSmallGirlThree,
    FakeSmallGirlFour,
    FakeSmallGirlFive,
    FakeSmallGirlSix,
    FakeSmallGirlFive,
    FakeSmallGirlSix,
    FakeSmallGirlThree,
  ];

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.titleWr}>
        <Text style={styles.title}>{fakeSmallGirlPhotos.length} instagram photos</Text>
      </View>
      <Swiper showsButtons={false} paginationStyle={styles.pagination} activeDotColor={whiteColor} dotColor={gray1Color}>
        {fakeSmallGirlPhotos.length >= 1 && (
          <View>
            <FlatList
              data={fakeSmallGirlPhotos.slice(0, 6)}
              scrollEnabled={false}
              numColumns={3}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({item}) => (
                <View style={styles.imageWr}>
                  <Image source={item} style={styles.image} />
                </View>
              )}
            />
          </View>
        )}
        {fakeSmallGirlPhotos.length > 6 && (
          <View>
            <FlatList
              data={fakeSmallGirlPhotos.slice(6, 12)}
              scrollEnabled={false}
              numColumns={3}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({item}) => (
                <View style={styles.imageWr}>
                  <Image source={item} style={styles.image} />
                </View>
              )}
            />
          </View>
        )}
        {fakeSmallGirlPhotos.length > 12 && (
          <View>
            <FlatList
              data={fakeSmallGirlPhotos.slice(12, 18)}
              scrollEnabled={false}
              numColumns={3}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({item}) => (
                <View style={styles.imageWr}>
                  <Image source={item} style={styles.image} />
                </View>
              )}
            />
          </View>
        )}
      </Swiper>
    </View>
  );
};

export default InstagramSLider;
