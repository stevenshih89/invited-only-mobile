import TouchingSlider from 'components/TouchingSlider/TouchingSlider';
import {screenHeight} from 'constants/common';
import {ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import React, {useRef} from 'react';

import {transparentWhite16Color} from 'constants/colors';

//import icons
import LocationIcon from 'assets/images/icons/location.svg';
import TablerGenderIcon from 'assets/images/icons/tabler_gender-bigender.svg';
import ArrowIcon from 'assets/images/icons/arrow-3.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import FastImage from 'react-native-fast-image';
import useStyles from 'screens/App/IO/styles.ts';
import {calculateAge} from 'helpers/calculateAge';
import {useUser} from 'src/store/userStore';
import * as S from './CardFakeState.style';

const CardsFakeState = ({handleSwipeFakeCard, OverlayRight, OverlayLeft, item}: any) => {
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const styles = useStyles();

  const {user} = useUser();

  const girlPhotos1 = [
    'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/user_photos%2FgMp0lX0rPcfFe6vkV9EhfTu5OU93_1735915281875?alt=media&token=4f280a0d-b6d0-4a64-b109-1b185edde764',
    'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/user_photos%2FgMp0lX0rPcfFe6vkV9EhfTu5OU93_1735915254641?alt=media&token=ac8a9b7e-0738-48f7-9cf0-ab8fd45b1a12',
    'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/user_photos%2FgMp0lX0rPcfFe6vkV9EhfTu5OU93_1735915309653?alt=media&token=a1664634-bcb9-47b3-ba21-1e6d38a07d87',
  ];

  const girlPhotos2 = [
    'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/user_photos%2FbjKkDs5nmgbN8Q4ArsFskwmJo5h2_1735913616179?alt=media&token=770e4927-77e9-4212-9750-caa7f97d6f24',
    'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/user_photos%2FbjKkDs5nmgbN8Q4ArsFskwmJo5h2_1735913624943?alt=media&token=9cf178e4-f9e7-4d55-80b7-0f269693cd91',
  ];

  const activeEvent = {
    photos: [
      {
        id: 0,
        image:
          'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/images%2FR0zqHQpcGOfcjLUAHL5tI251GZ92_1735923423588?alt=media&token=c13783a7-d89d-4ba5-b7fb-09aea3b24170',
      },
    ],
    female: 5,
    male: 4,
  };

  const handleSwipeCardRight = (ref: any) => {
    if (ref.current) {
      // @ts-ignore
      ref.current?.swipeCardRight();
      handleSwipeFakeCard();
    }
  };

  const handleSwipeCardLeft = (ref: any) => {
    if (ref.current) {
      // @ts-ignore
      ref.current?.swipeCardLeft();
      handleSwipeFakeCard();
    }
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: 10,
          height: '90%',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        pointerEvents="box-none"
        >
        <TinderCard
          ref={cardRef1}
          // @ts-ignore
          cardWidth="100%"
          // @ts-ignore
          cardHeight="100%"
          onSwipedLeft={handleSwipeFakeCard}
          onSwipedRight={handleSwipeFakeCard}
          OverlayLabelRight={OverlayRight}
          OverlayLabelLeft={OverlayLeft}
          disableBottomSwipe={true}
          disableTopSwipe={true}
          cardStyle={{
            borderRadius: 22,
            height: '100%',
          }}>
          <ScrollView scrollEventThrottle={20} showsVerticalScrollIndicator={false} style={{borderRadius: 22, height: screenHeight - 250}}>
            <S.WrapperFakeCard key={'0'}>
              <TouchingSlider
                name={'Nina'}
                age={calculateAge('2025-01-14')}
                homeAddress={'Dubai'}
                isShowInvitesTooltip={false}
                isLocked={false}
                confirmedAccount={true}
                onReject={() => handleSwipeCardLeft(cardRef1)}
                onInvite={() => handleSwipeCardRight(cardRef1)}
                handleOpenSuperInvite={() => handleSwipeCardRight(cardRef1)}
                photos={girlPhotos1}
                accountType={'guest'}
                isShowWantsJoin={false}
                isPremium={false}
                activeEvent={activeEvent}
                location={'Dubai'}
                placeName={'Dubai'}
                joinEvents={['1']}
                online={true}
                date={'2025-01-14'}
                item={item}
                userInfo={user}
                isPreview={false}
              />
              <S.BioWrapper>
                <S.TitleSection style={[false ? styles.mt31 : {}]}>My basics</S.TitleSection>
                <S.WrapperTextTags>
                  <S.TextTagsAboutMe style={[styles.ml18]}>
                    <View style={{marginRight: 4}}>
                      <TablerGenderIcon />
                    </View>
                    Woman
                  </S.TextTagsAboutMe>
                  <S.TextTagsAboutMe style={[styles.ml18]}>
                    <View style={{marginRight: 4}}>
                      <LocationIcon />
                    </View>
                    Dubai
                  </S.TextTagsAboutMe>
                  <S.TextTagsAboutMe style={[styles.ml18]}>
                    <View style={{marginRight: 4}}>
                      <ArrowIcon />
                    </View>
                    165 см
                  </S.TextTagsAboutMe>
                </S.WrapperTextTags>
                <S.WrapperInterests>
                  <S.TitleSection>My interests</S.TitleSection>
                  <S.WrapperInterestsTags>
                    {['Vip Tabels', 'Restaurant', 'Yacht Party'].map((interest: string | null, idx: number) => (
                      <S.InterestsTags key={idx}>
                        <S.TextTagsInterests>{interest}</S.TextTagsInterests>
                      </S.InterestsTags>
                    ))}
                  </S.WrapperInterestsTags>
                </S.WrapperInterests>
                <S.WrapperImageSectionFaceGirl>
                  {girlPhotos1?.map((photo: string, photoIndex: number) => (
                    <FastImage key={photoIndex} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />
                  ))}
                </S.WrapperImageSectionFaceGirl>
                <S.WrapperButtonsFooter>
                  <S.ButtonCloseOrCheck  onPress={() => handleSwipeCardLeft(cardRef1)}>
                    <S.BorderButton
                      style={{
                        top: -1,
                        left: -1,
                      }}
                    />
                    <S.BorderButton
                      style={{
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <S.RoundButton>
                      <CloseIcon />
                    </S.RoundButton>
                  </S.ButtonCloseOrCheck>
                  <TouchableWithoutFeedback onPress={() => handleSwipeCardRight(cardRef1)}>
                    <S.ButtonFlash>
                      <S.BorderButton
                        style={{
                          top: -1,
                          left: -1,
                        }}
                      />
                      <S.BorderButton
                        style={{
                          right: -1,
                          bottom: -1,
                        }}
                      />
                      <S.RoundButton>
                        <FlashIcon />
                      </S.RoundButton>
                    </S.ButtonFlash>
                  </TouchableWithoutFeedback>
                  <S.ButtonCloseOrCheck onPress={() => handleSwipeCardRight(cardRef1)}>
                    <S.BorderButton
                      style={{
                        top: -1,
                        left: -1,
                      }}
                    />
                    <S.BorderButton
                      style={{
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <S.RoundButton>
                      <CheckIcon />
                    </S.RoundButton>
                  </S.ButtonCloseOrCheck>
                </S.WrapperButtonsFooter>
              </S.BioWrapper>
            </S.WrapperFakeCard>
          </ScrollView>
        </TinderCard>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          height: '90%',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        pointerEvents="box-none"
        key={'0'}>
        <TinderCard
          ref={cardRef2}
          // @ts-ignore
          cardWidth="100%"
          // @ts-ignore
          cardHeight="100%"
          onSwipedLeft={handleSwipeFakeCard}
          onSwipedRight={handleSwipeFakeCard}
          OverlayLabelRight={OverlayRight}
          OverlayLabelLeft={OverlayLeft}
          disableBottomSwipe={true}
          disableTopSwipe={true}
          cardStyle={{
            borderRadius: 22,
            height: '100%',
          }}>
          <ScrollView scrollEventThrottle={20} showsVerticalScrollIndicator={false} style={{borderRadius: 22, height: screenHeight - 250}}>
            <S.WrapperFakeCard key={'1'}>
              <TouchingSlider
                name={'Kristin'}
                age={calculateAge('2025-01-14')}
                homeAddress={'Dubai'}
                isShowInvitesTooltip={false}
                isLocked={false}
                confirmedAccount={true}
                onReject={() => handleSwipeCardLeft(cardRef2)}
                onInvite={() => handleSwipeCardRight(cardRef2)}
                handleOpenSuperInvite={() => handleSwipeCardRight(cardRef2)}
                photos={girlPhotos2}
                accountType={'guest'}
                isShowWantsJoin={false}
                isPremium={false}
                activeEvent={activeEvent}
                location={'Dubai'}
                placeName={'Dubai'}
                joinEvents={['1']}
                online={true}
                date={'2025-01-14'}
                item={item}
                userInfo={user}
                isPreview={false}
              />
              <S.BioWrapper>
                <S.TitleSection style={[false ? styles.mt31 : {}]}>My basics</S.TitleSection>
                <S.WrapperTextTags>
                  <S.TextTagsAboutMe style={[styles.ml18]}>
                    <View style={{marginRight: 4}}>
                      <TablerGenderIcon />
                    </View>
                    Woman
                  </S.TextTagsAboutMe>
                  <S.TextTagsAboutMe style={[styles.ml18]}>
                    <View style={{marginRight: 4}}>
                      <LocationIcon />
                    </View>
                    Dubai
                  </S.TextTagsAboutMe>
                  <S.TextTagsAboutMe style={[styles.ml18]}>
                    <View style={{marginRight: 4}}>
                      <ArrowIcon />
                    </View>
                    168 см
                  </S.TextTagsAboutMe>
                </S.WrapperTextTags>
                <S.WrapperInterests>
                  <S.TitleSection>My interests</S.TitleSection>
                  <S.WrapperInterestsTags>
                    {['Pool Party', 'Restaurant', 'Yacht Party'].map((interest: string | null, idx: number) => (
                      <S.InterestsTags key={idx}>
                        <S.TextTagsInterests>{interest}</S.TextTagsInterests>
                      </S.InterestsTags>
                    ))}
                  </S.WrapperInterestsTags>
                </S.WrapperInterests>
                <S.WrapperImageSectionFaceGirl>
                  {girlPhotos2?.map((photo: string, photoIndex: number) => (
                    <FastImage key={photoIndex} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />
                  ))}
                </S.WrapperImageSectionFaceGirl>
                <S.WrapperButtonsFooter>
                  <S.ButtonCloseOrCheck onPress={() => handleSwipeCardLeft(cardRef2)}>
                    <S.BorderButton
                      style={{
                        top: -1,
                        left: -1,
                      }}
                    />
                    <S.BorderButton
                      style={{
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <S.RoundButton>
                      <CloseIcon />
                    </S.RoundButton>
                  </S.ButtonCloseOrCheck>
                  <TouchableWithoutFeedback onPress={() => handleSwipeCardRight(cardRef2)}>
                    <S.ButtonFlash>
                      <S.BorderButton
                        style={{
                          top: -1,
                          left: -1,
                        }}
                      />
                      <S.BorderButton
                        style={{
                          right: -1,
                          bottom: -1,
                        }}
                      />
                      <S.RoundButton>
                        <FlashIcon />
                      </S.RoundButton>
                    </S.ButtonFlash>
                  </TouchableWithoutFeedback>
                  <S.ButtonCloseOrCheck onPress={() => handleSwipeCardRight(cardRef2)}>
                      <S.BorderButton
                        style={{
                          top: -1,
                          left: -1,
                        }}
                      />
                      <S.BorderButton
                        style={{
                          right: -1,
                          bottom: -1,
                        }}
                      />
                      <S.RoundButton>
                        <CheckIcon />
                      </S.RoundButton>
                  </S.ButtonCloseOrCheck>
                </S.WrapperButtonsFooter>
              </S.BioWrapper>
            </S.WrapperFakeCard>
          </ScrollView>
        </TinderCard>
      </View>
    </>
  );
};

export default CardsFakeState;
