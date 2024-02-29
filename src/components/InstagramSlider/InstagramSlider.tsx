import {FlatList, Image, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import FakeSmallGirlOne from 'assets/images/app/fake-small-girl-1.png';
import FakeSmallGirlTwo from 'assets/images/app/fake-small-girl-2.png';
import FakeSmallGirlThree from 'assets/images/app/fake-small-girl-3.png';
import FakeSmallGirlFour from 'assets/images/app/fake-small-girl-4.png';
import FakeSmallGirlFive from 'assets/images/app/fake-small-girl-5.png';
import FakeSmallGirlSix from 'assets/images/app/fake-small-girl-6.png';
import {screenHeight, screenWidth} from 'constants/common';
import {gray1Color, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

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

  return (
    <View style={{width: '100%', height: screenHeight / 3.2}}>
      <View style={{marginBottom: 14}}>
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812)}}>{fakeSmallGirlPhotos.length} instagram photos</Text>
      </View>
      <Swiper
        showsButtons={false}
        paginationStyle={{justifyContent: 'flex-end', alignItems: 'flex-start', height: '102%'}}
        activeDotColor={whiteColor}
        dotColor={gray1Color}>
        {fakeSmallGirlPhotos.length >= 1 && (
          <View>
            <FlatList
              data={fakeSmallGirlPhotos.slice(0, 6)}
              scrollEnabled={false}
              numColumns={3}
              ItemSeparatorComponent={() => <View style={{height: 14}} />}
              renderItem={({item}) => (
                <View style={{width: screenWidth / 3 - 28}}>
                  <Image source={item} style={{width: screenWidth / 3 - 42, height: screenWidth / 3 - 42, borderRadius: 10}} />
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
              ItemSeparatorComponent={() => <View style={{height: 14}} />}
              renderItem={({item}) => (
                <View style={{width: screenWidth / 3 - 28}}>
                  <Image source={item} style={{width: screenWidth / 3 - 42, height: screenWidth / 3 - 42, borderRadius: 10}} />
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
              ItemSeparatorComponent={() => <View style={{height: 14}} />}
              renderItem={({item}) => (
                <View style={{width: screenWidth / 3 - 28}}>
                  <Image source={item} style={{width: screenWidth / 3 - 42, height: screenWidth / 3 - 42, borderRadius: 10}} />
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
