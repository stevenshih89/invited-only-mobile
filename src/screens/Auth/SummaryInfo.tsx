import {backgroundGradientColors, lightGray16Color, whiteColor} from 'constants/colors';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {AuthContext} from 'contexts/AuthContext';
import {useContext} from 'react';
import LogoSecondary2 from 'assets/images/auth/logo-secondary-2.svg';
import {Outfit500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight, screenWidth} from 'constants/common';
import Button from 'components/Button/Button';
import LinearGradient from 'react-native-linear-gradient';

const SummaryInfo = () => {
  const navigation = useAppNavigation();

  const {onBoarding} = useContext(AuthContext);

  const flattenedPhotos = onBoarding.filter((item: {photos: []}) => item.photos)[0]?.photos;
  const imageUser = flattenedPhotos?.find((photo: {id: number}) => photo.id === 0)?.image;
  const name: string = onBoarding.find((item: {name: string}) => item.name)?.name;
  const accountType = onBoarding.find((item: {accountType: string}) => item.accountType)?.accountType;

  const handleNext = () => {
    navigation.navigate('/invitation-code', {cameFromSummary: true});
  };

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, paddingHorizontal: 24, justifyContent: 'space-between'}}>
          <View>
            <View style={{flexDirection: 'row', marginTop: 32, width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                style={{
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: lightGray16Color,
                }}>
                <ArrowLeft />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: screenHeight / 20}}>
              <View style={{backgroundColor: whiteColor, height: 100, width: 26}} />
              <View style={{alignItems: 'flex-end', flexDirection: 'column', flex: 1}}>
                <Text style={{fontFamily: Outfit500, fontSize: RFValue(58, 932), color: whiteColor, lineHeight: 60}}>
                  {name?.split(' ')[0]}
                </Text>
                <Text style={{textTransform: 'capitalize', color: whiteColor, fontFamily: Outfit500, fontSize: RFValue(14, 932)}}>
                  {accountType}
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
              {imageUser && (
                <Image source={{uri: imageUser}} style={{width: screenWidth / 1.5, height: screenWidth / 1.5, borderRadius: 300}} />
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 20}}>
              <LogoSecondary2 />
              <View style={{borderWidth: 24, borderColor: whiteColor, borderStyle: 'solid', borderRadius: 100, width: 100, height: 100}} />
            </View>
          </View>
          <View style={{marginVertical: 4}}>
            <Button title="Continue" onPress={handleNext} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SummaryInfo;
