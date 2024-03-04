import InstagramSLider from 'components/InstagramSlider/InstagramSlider';
import {lightGray6Color} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';
import Man from 'assets/images/app/man-rectangle.png';
import FakeGirlOne from 'assets/images/app/fake-girl-1.png';
import FakeGirlTwo from 'assets/images/app/fake-girl-2.png';
import FakeGirlThere from 'assets/images/app/fake-girl-3.png';
import FakeGirlFour from 'assets/images/app/fake-girl-4.png';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider';
import PersonIcon from 'assets/images/icons/person.svg';
import LocationIcon from 'assets/images/icons/location.svg';
import TablerGenderIcon from 'assets/images/icons/tabler_gender-bigender.svg';
import HomeIcon from 'assets/images/icons/home.svg';
import ArrowIcon from 'assets/images/icons/arrow-3.svg';
import WineIcon from 'assets/images/icons/milk.svg';
import SmokeIcon from 'assets/images/icons/smoke.svg';
import useStyles from './styles';

const MyProfileView = () => {
  const fakeGirlPhotos = [Man, FakeGirlOne, FakeGirlTwo, FakeGirlThere, FakeGirlFour];
  const handleOpenSuperInvite = () => {};
  const handleOpenMatch = () => {};

  const styles = useStyles();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: lightGray6Color}}>
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.wrapperFakeCard}>
            <TouchingSlider
              handleOpenSuperInvite={handleOpenSuperInvite}
              handleOpenMatch={handleOpenMatch}
              photos={fakeGirlPhotos}
              isShowCardButtons={false}
              isShowWantsJoin={false}
              isShowInvitesTooltip={false}
            />
            <View style={styles.bioWrapper}>
              <Text style={styles.titleSection}>Bio</Text>
              <Text style={styles.textDescription}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
              </Text>
              <Text style={[styles.titleSection, styles.mt31]}>About me</Text>
              <View style={styles.wrapperTextTags}>
                <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                  <PersonIcon />
                  Guest
                </Text>
                <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                  <TablerGenderIcon /> Woman
                </Text>
                <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                  <LocationIcon /> Dubai
                </Text>
                <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                  <HomeIcon /> Odessa
                </Text>
                <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                  <ArrowIcon /> 184 см
                </Text>
                <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                  <WineIcon /> Wine
                </Text>
                <Text style={[styles.textTagsAboutMe, {marginLeft: screenWidth / 33}]}>
                  <SmokeIcon /> Yes
                </Text>
              </View>
              <Text style={[styles.titleSection, styles.mt31]}>Interests</Text>
              <View style={styles.wrapperInterestsTags}>
                <View style={styles.interestsTags}>
                  <Text style={styles.textTagsInterests}>Business</Text>
                </View>
                <View style={styles.interestsTags}>
                  <Text style={styles.textTagsInterests}>Traveling</Text>
                </View>
                <View style={styles.interestsTags}>
                  <Text style={styles.textTagsInterests}>Clubs</Text>
                </View>
                <View style={styles.interestsTags}>
                  <Text style={styles.textTagsInterests}>Yacht</Text>
                </View>
                <View style={styles.interestsTags}>
                  <Text style={styles.textTagsInterests}>Luxury</Text>
                </View>
                <View style={styles.interestsTags}>
                  <Text style={styles.textTagsInterests}>Fitness</Text>
                </View>
              </View>
              <View style={styles.wrapperImageSectionFaceGirl}>
                <Image style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={Man} />
                <Image style={styles.imageFaceGirl} source={Man} />
              </View>
              <InstagramSLider />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyProfileView;
