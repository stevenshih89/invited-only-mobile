import {FlatList, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {gray1Color, whiteColor} from 'constants/colors';
import {FC} from 'react';
import * as S from './InstagramSlider.style';

interface InstagramSliderProps {
  photosList: any[];
}

const InstagramSlider: FC<InstagramSliderProps> = ({photosList}) => {
  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title>{photosList?.length} instagram photos</S.Title>
      </S.TitleWrapper>
      <Swiper showsButtons={false} paginationStyle={{ justifyContent: 'flex-end', alignItems: 'flex-start', height: '102%' }} activeDotColor={whiteColor} dotColor={gray1Color}>
        {photosList?.length >= 1 && (
          <View>
            <FlatList
              data={photosList?.slice(0, 6)}
              scrollEnabled={false}
              numColumns={3}
              ItemSeparatorComponent={() => <S.Separator />}
              renderItem={({item}) => (
                <S.ImageWrapper>
                  <S.Image source={{uri: item}} />
                </S.ImageWrapper>
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
              ItemSeparatorComponent={() => <S.Separator />}
              renderItem={({item}) => (
                <S.ImageWrapper>
                  <S.Image source={item} />
                </S.ImageWrapper>
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
              ItemSeparatorComponent={() => <S.Separator />}
              renderItem={({item}) => (
                <S.ImageWrapper>
                  <S.Image source={item} />
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
