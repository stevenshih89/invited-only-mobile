import {FlatList, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {FC} from 'react';
import * as S from './InstagramSlider.style';
import {gray1Color, whiteColor} from 'constants/colors';

interface InstagramSliderProps {
  photosList: any[];
}

const InstagramSlider: FC<InstagramSliderProps> = ({photosList}) => {
  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title testID="instagram-slider-title">{photosList?.length} instagram photos</S.Title>
      </S.TitleWrapper>
      <Swiper
        showsButtons={false}
        paginationStyle={{justifyContent: 'flex-end', alignItems: 'flex-start', height: '102%'}}
        activeDotColor={whiteColor}
        dotColor={gray1Color}>
        {photosList?.length >= 1 && (
          <View>
            <FlatList
              testID="instagram-slider-flatlist"
              data={photosList?.slice(0, 6)}
              scrollEnabled={false}
              numColumns={3}
              ItemSeparatorComponent={() => <S.Separator />}
              renderItem={({item}) => (
                <S.ImageWrapper>
                  <S.Image testID="instagram-slider-image-unique" source={{uri: item}} />
                </S.ImageWrapper>
              )}
            />
          </View>
        )}
        {photosList?.length > 6 && (
          <View>
            <FlatList
              testID="instagram-slider-flatlist"
              data={photosList?.slice(6, 12)}
              scrollEnabled={false}
              numColumns={3}
              ItemSeparatorComponent={() => <S.Separator />}
              renderItem={({item}) => (
                <S.ImageWrapper>
                  <S.Image testID="instagram-slider-image-unique" source={item} />
                </S.ImageWrapper>
              )}
            />
          </View>
        )}
        {photosList?.length > 12 && (
          <View>
            <FlatList
              testID="instagram-slider-flatlist"
              data={photosList?.slice(12, 18)}
              scrollEnabled={false}
              numColumns={3}
              ItemSeparatorComponent={() => <S.Separator />}
              renderItem={({item}) => (
                <S.ImageWrapper>
                  <S.Image testID="instagram-slider-image-unique" source={item} />
                </S.ImageWrapper>
              )}
            />
          </View>
        )}
      </Swiper>
    </S.Container>
  );
};

export default InstagramSlider;
