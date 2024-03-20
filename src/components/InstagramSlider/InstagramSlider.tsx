import {FlatList, Image, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {gray1Color, whiteColor} from 'constants/colors';
import useStyles from './styles';
import {FC} from 'react';

interface InstagramSliderProps {
  photosList: any[];
}

const InstagramSlider: FC<InstagramSliderProps> = ({photosList}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.titleWr}>
        <Text style={styles.title}>{photosList?.length} instagram photos</Text>
      </View>
      <Swiper showsButtons={false} paginationStyle={styles.pagination} activeDotColor={whiteColor} dotColor={gray1Color}>
        {photosList?.length >= 1 && (
          <View>
            <FlatList
              data={photosList?.slice(0, 6)}
              scrollEnabled={false}
              numColumns={3}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({item}) => (
                <View style={styles.imageWr}>
                  <Image source={{uri: item}} style={styles.image} />
                </View>
              )}
            />
          </View>
        )}
        {photosList?.length > 6 && (
          <View>
            <FlatList
              data={photosList?.slice(6, 12)}
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
        {photosList?.length > 12 && (
          <View>
            <FlatList
              data={photosList?.slice(12, 18)}
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

export default InstagramSlider;
