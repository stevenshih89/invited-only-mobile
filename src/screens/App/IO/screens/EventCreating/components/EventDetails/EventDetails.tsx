import React, {Dispatch, FC, ReactElement, SetStateAction, useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Image, Keyboard, LayoutRectangle, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, Permission, PermissionStatus, RESULTS, check, request} from 'react-native-permissions';
import DatePicker from 'react-native-date-picker';

//import components
import useStyles from './styles.ts';
import Button from 'components/Button/Button';
import Input from 'components/Inputs/Input';
import {isIos} from 'constants/common';
import {black1Color, black3Color, errorColor, lightGray2Color, orangeClose, transparentWhite30Color, whiteColor} from 'constants/colors';

//import icons
import Plus from 'assets/images/icons/plus.svg';
import Calendar from 'assets/images/icons/calendar-new.svg';
import CalendarRed from 'assets/images/icons/calendar-red.svg';
import Clock from 'assets/images/icons/clock-grey.svg';
import ClockRed from 'assets/images/icons/clock-red.svg';
import Close from 'assets/images/icons/close.svg';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';

import ModalAddPhoto from './ModalAddPhoto.tsx';
import {eventTypes} from 'src/mocks/eventTypes.ts';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import HintCard from 'components/HintCard';
import {hostHintSteps} from 'constants/hints.ts';
import {useDemoFlowStore} from '../../../../../../../store/demoFlowStore';
import {useRoute} from '@react-navigation/native';
import HandIC from 'assets/images/icons/hand.svg';
import {demoFlowStackPath, demoIOPath} from 'constants/pathLocations.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import uuid from 'react-native-uuid';
import {useUser} from 'src/store/userStore/index.ts';

interface ImageType {
  image: null | string;
  id: number;
}

interface EventDetailsProps {
  isEditing?: boolean;
  setTabState: Dispatch<SetStateAction<string>>;
  setMainImage: Dispatch<SetStateAction<any>>;
  setIsVisibleSaveModal: Dispatch<SetStateAction<boolean>>;
  setCurrentCreateStap: Dispatch<SetStateAction<number>>;
  prevImages: {image: null | string; id: number}[];
  prevActiveType: number;
  prevPlaceName?: string;
  prevName?: string;
  prevDescription?: string;
  prevDate?: string;
  prevHour?: string;
  prevAddress?: string;
  prevMeetingSpot?: string;
  female?: number;
  male?: number;
  id?: string;
  femaleFriend?: number;
  maleFriend?: number;
  activeType: number;
  setActiveType: Dispatch<SetStateAction<number>>;
  photos: ImageType[];
  setImages: Dispatch<SetStateAction<ImageType[]>>;
  placeName: string;
  setPlaceName: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  datePicker: Date;
  setDatePicker: Dispatch<SetStateAction<Date>>;
  hourPicker: Date;
  setHourPicker: Dispatch<SetStateAction<Date>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  hour: string;
  setHour: Dispatch<SetStateAction<string>>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  meetingSpot: string;
  setMeetingSpot: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  openHour: boolean;
  setOpenHour: Dispatch<SetStateAction<boolean>>;
  userHost: any;
}

const EventDetails: FC<EventDetailsProps> = ({
  isEditing,
  setCurrentCreateStap,
  setTabState,
  setMainImage,
  prevImages,
  prevActiveType,
  prevPlaceName,
  prevName,
  prevDescription,
  prevDate,
  prevHour,
  prevAddress,
  prevMeetingSpot,
  female,
  male,
  photos,
  setImages,
  activeType,
  setActiveType,
  placeName,
  setPlaceName,
  name,
  setName,
  description,
  setDescription,
  datePicker,
  setDatePicker,
  hourPicker,
  setHourPicker,
  date,
  setDate,
  hour,
  setHour,
  address,
  setAddress,
  meetingSpot,
  setMeetingSpot,
  loading,
  open,
  setOpen,
  openHour,
  setOpenHour,
}): ReactElement => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const [modalAddPhotoVisible, setModalAddPhotoVisible] = useState(false);
  const [photosId, setPhotosId] = useState();
  const [addressEmpty, setAddressEmpty] = useState(false);
  const [placeNameEmpty, setPlaceNameEmpty] = useState(false);
  const [eventNameEmpty] = useState(false);
  const [dateEmpty, setDateEmpty] = useState(false);
  const [hourEmpty, setHourEmpty] = useState(false);
  const route = useRoute();
  const navigation = useAppNavigation();
  const {hintStep, setHintStep, setIsVisibleSwipeGuide, setEvent} = useDemoFlowStore();
  const scrollViewRef = useRef<KeyboardAwareScrollView | null>(null);
  const [eventDetailsViewCoord, setEventDetailsViewCoord] = useState<LayoutRectangle | null>(null);
  const [eventTypeViewCoord, setEventTypeViewCoord] = useState<LayoutRectangle | null>(null);
  const {user} = useUser();
  const isDemo = (route?.params as {isDemo?: boolean})?.isDemo;
  const isActiveHint4Step = hintStep === 4;
  const isActiveHint5Step = hintStep === 5;

  useEffect(() => {
    if (address) {
      setAddressEmpty(false);
    }
    if (placeName) {
      setPlaceNameEmpty(false);
    }

    if (date) {
      setDateEmpty(false);
    }
    if (hour) {
      setHourEmpty(false);
    }
  }, [address, placeName, name, date, hour]);

  useEffect(() => {
    if (isEditing) {
      setImages(prevImages);
      setActiveType(prevActiveType);
      setPlaceName(prevPlaceName ?? '');
      setName(prevName ?? '');
      setDescription(prevDescription ?? '');
      setDate(prevDate ?? '');
      setHour(prevHour ?? '');
      setAddress(prevAddress ?? '');
      setMeetingSpot(prevMeetingSpot ?? '');
    }
    try {
      analytics().logScreenView({
        screen_name: 'event_creating_event_details_screen',
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (isDemo && scrollViewRef?.current?.scrollToPosition) {
      if (hintStep === 4 && eventTypeViewCoord) {
        scrollViewRef?.current?.scrollToPosition(0, eventTypeViewCoord.y, true);
      } else if (hintStep === 5 && eventDetailsViewCoord) {
        scrollViewRef?.current?.scrollToPosition(0, eventDetailsViewCoord.y - 200, true);
      }
    }
  }, [isDemo, hintStep, eventDetailsViewCoord, eventTypeViewCoord]);

  const styles = useStyles();

  const makePermissionsRequest = async (permission: Permission): Promise<PermissionStatus> => {
    const result = await check(permission);
    switch (result) {
      case RESULTS.DENIED:
        const requestResult = await request(permission);
        if (requestResult === RESULTS.BLOCKED) {
          Alert.alert('Permission not granted');
        }
        return requestResult;
      case RESULTS.BLOCKED:
        Alert.alert('Permission not granted');
        break;
    }

    return result;
  };

  const openLibrary = async (): Promise<void> => {
    const photoLibraryPermission = await makePermissionsRequest(
      isIos ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    );

    if (photoLibraryPermission !== RESULTS.GRANTED && photoLibraryPermission !== RESULTS.LIMITED) {
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.9,
      },
      (response: ImagePickerResponse) => {
        if (!response.assets) {
          return;
        }
        if (response.assets[0].uri) {
          const image = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          const newImages = photos.map(img => {
            if (img.id === photosId) {
              if (img.id === 0) {
                setMainImage(image.uri);
              }
              return {...img, image: image.uri};
            }
            return img;
          });
          setImages(newImages);
          setModalAddPhotoVisible(false);
        }
      },
    );
  };

  const addPlaceholderPhoto = () => {
    const newPhotos = photos.map(img => {
      if (img.id === photosId) {
        return {
          ...img,
          image:
            'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2Fevent_preview.png?alt=media&token=0de5918d-5690-48fb-9b0a-018c73948805',
        };
      }
      return img;
    });
    setImages(newPhotos);
    setModalAddPhotoVisible(false);
  };

  const checkFieldsNotEmpty = () => {
    let hasEmptyField = false;

    if (!address) {
      setAddressEmpty(true);
      hasEmptyField = true;
    }
    if (!placeName) {
      setPlaceNameEmpty(true);
      hasEmptyField = true;
    }
    if (!date) {
      setDateEmpty(true);
      hasEmptyField = true;
    }
    if (!hour) {
      setHourEmpty(true);
      hasEmptyField = true;
    }

    if (!hasEmptyField) {
      checkPhotos();
    }
  };

  const checkPhotos = () => {
    const newPhotos = photos.map(img => {
      if (img.id != 3 && img.id != 4) {
        if (img.image === null) {
          return {
            ...img,
            image:
              'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2Fevent_preview.png?alt=media&token=0de5918d-5690-48fb-9b0a-018c73948805',
          };
        }
        return img;
      }
      return img;
    });
    setImages(newPhotos);
    setCurrentCreateStap(3);
    setTabState('eventPreview');
  };

  const deleteImage = (id: number) => {
    const newPhotos = photos.map(img => {
      if (img.id === id) {
        return {...img, image: null};
      }
      return img;
    });

    setImages(newPhotos);
  };

  const handleScroll = () => {
    Keyboard.dismiss();
  };

  const handleNextStep = () => {
    checkFieldsNotEmpty();
  };

  const handleSkipHints = () => {
    const uid: string = uuid.v4() as string;
    const demoEvent = {
      name: 'Red Mirage',
      date: '07.02.2025',
      hour: '21:30',
      address: 'Nad AJ Sheba 1 - Dubai',
      male: 50,
      placeName: 'Irisol Dubai',
      id: uid,
      uid: user?.uid,
      rejectsList: [],
      requestsList: [],
      usersList: [],
      statusEvent: false,
      eventReviewed: false,
      hostImage: user?.photos?.[0]?.image,
      hostName: user?.name,
      photos: [
        {
          id: 0,
          image:
            'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2FImage.png?alt=media&token=14b8e084-7280-4e49-abd4-0aeb3503c133',
        },
      ],
      isCancelled: false,
      createdAt: moment().format('YYYY-MM-DD'),
    };
    setEvent(demoEvent);

    navigation.navigate(demoFlowStackPath, {screen: demoIOPath} as never);
    setHintStep(8);
    setIsVisibleSwipeGuide(true);
  };

  return (
    <View
      style={{
        ...styles.root,
        zIndex: isDemo && (isActiveHint4Step || isActiveHint5Step) ? 1111 : 1,
      }}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainerContent}
        style={styles.scrollView}
        enableResetScrollToCoords={false}
        enableAutomaticScroll={true}
        keyboardDismissMode="on-drag">
        {isDemo && <View style={styles.overlayContainer} />}
        <View
          style={{
            ...styles.eventTypeWr,
            zIndex: isDemo && isActiveHint4Step ? 111 : -1,
          }}
          onLayout={event => setEventTypeViewCoord(event.nativeEvent.layout)}>
          <Text style={styles.eventTypeTitle}>Event type</Text>
          <FlatList
            data={eventTypes}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{
              height: isDemo && isActiveHint4Step ? 60 : 'auto',
            }}
            ItemSeparatorComponent={() => <View style={styles.eventTypeSeparator} />}
            renderItem={({item, index}: any) => (
              <View
                style={{
                  position: 'relative',
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setActiveType(item.id)}
                  style={[
                    styles.eventTypeItem,
                    {
                      backgroundColor: activeType === item.id ? whiteColor : lightGray2Color,
                    },
                  ]}>
                  <Text style={[styles.eventTypeItemText, {color: activeType === item.id ? black1Color : whiteColor}]}>{item.label}</Text>
                  {isDemo && isActiveHint4Step && index === 0 && (
                    <View style={styles.handIconContainer}>
                      <HandIC />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
          {isDemo && isActiveHint4Step && (
            <View style={styles.stepHint4Container}>
              <HintCard
                currentStep={hintStep}
                description={hostHintSteps[hintStep - 1]?.description}
                onSkipAction={handleSkipHints}
                onStepChange={setHintStep}
                onNextAction={() => {}}
                isNextBtnDisabled={female === 0 && male === 0}
                totalSteps={hostHintSteps.length}
                title={hostHintSteps[hintStep - 1]?.title}
              />
            </View>
          )}
        </View>
        <View style={{backgroundColor: black3Color, borderRadius: 20, padding: 20, marginBottom: 24, zIndex: -1}}>
          <Input
            required
            isError={placeNameEmpty}
            errorText={placeNameEmpty ? 'Incorrect place name' : ''}
            containerInnerStyle={{borderColor: placeNameEmpty ? errorColor : '', borderWidth: placeNameEmpty ? 1 : 0}}
            placeholderTextColor={placeNameEmpty ? errorColor : transparentWhite30Color}
            label="Place name (Location)"
            labelStyle={styles.inputLabel}
            value={placeName}
            onChange={val => setPlaceName(val)}
            placeholder="Enter place name"
            onBlur={handleScroll}
          />
          <Input
            required
            isError={addressEmpty}
            errorText={addressEmpty ? 'Incorrect address' : ''}
            containerInnerStyle={{borderColor: addressEmpty ? errorColor : '', borderWidth: addressEmpty ? 1 : 0}}
            value={address}
            onChange={val => setAddress(val)}
            placeholder="Enter adress"
            placeholderTextColor={addressEmpty ? errorColor : transparentWhite30Color}
            label="Address"
            labelStyle={styles.inputLabel}
            onBlur={handleScroll}
          />
        </View>

        <View
          style={{
            padding: 20,
            backgroundColor: black3Color,
            borderRadius: 20,
            marginBottom: 24,
          }}>
          <Text style={styles.eventPhotosText}>
            Event photos <Text style={{color: errorColor}}>*</Text>
          </Text>
          <View style={styles.flex}>
            <View style={styles.eventPhotoLargeWr}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setPhotosId(photos[0].id);
                  setModalAddPhotoVisible(true);
                }}
                style={styles.touchableImage}>
                {photos[0]?.image ? (
                  <>
                    <Image resizeMode="cover" source={{uri: photos[0].image}} style={styles.eventPhotoSmallImage} />

                    <View style={{position: 'absolute', top: 12, right: 12}}>
                      <TouchableOpacity
                        onPress={() => deleteImage(0)}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 26,
                          height: 26,
                          borderRadius: 13,
                          backgroundColor: orangeClose,
                        }}>
                        <Close />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <Plus width={40} height={40} />
                )}
              </TouchableOpacity>
              <View style={{position: 'absolute', bottom: 18, width: '100%', alignItems: 'center'}}>
                <View style={styles.imageNumber}>
                  <Text style={styles.eventPhotoNumberText}>Main</Text>
                </View>
              </View>
            </View>
            <View style={[styles.eventPhotoRow, {marginBottom: 8}]}>
              <View style={styles.eventPhotoSmallLeftWr}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setPhotosId(photos[1].id);
                    setModalAddPhotoVisible(true);
                  }}
                  style={styles.touchableImage}>
                  {photos[1]?.image ? (
                    <>
                      <Image resizeMode="cover" source={{uri: photos[1].image}} style={styles.eventPhotoSmallImage} />
                      <View style={{position: 'absolute', top: 12, right: 12}}>
                        <TouchableOpacity
                          onPress={() => deleteImage(1)}
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 26,
                            height: 26,
                            borderRadius: 13,
                            backgroundColor: orangeClose,
                          }}>
                          <Close />
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <Plus width={40} height={40} />
                  )}
                </TouchableOpacity>
                <View style={{position: 'absolute', bottom: 18, width: '100%', alignItems: 'center'}}>
                  <View style={styles.imageNumber}>
                    <Text style={styles.eventPhotoNumberText}>2</Text>
                  </View>
                </View>
              </View>
              <View style={styles.eventPhotoSmallRightWr}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setPhotosId(photos[2].id);
                    setModalAddPhotoVisible(true);
                  }}
                  style={styles.touchableImage}>
                  {photos[2]?.image ? (
                    <>
                      <Image resizeMode="cover" source={{uri: photos[2].image}} style={styles.eventPhotoSmallImage} />
                      <View style={{position: 'absolute', top: 12, right: 12}}>
                        <TouchableOpacity
                          onPress={() => deleteImage(2)}
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 26,
                            height: 26,
                            borderRadius: 13,
                            backgroundColor: orangeClose,
                          }}>
                          <Close />
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <Plus width={40} height={40} />
                  )}
                </TouchableOpacity>
                <View style={{position: 'absolute', bottom: 18, width: '100%', alignItems: 'center'}}>
                  <View style={styles.imageNumber}>
                    <Text style={styles.eventPhotoNumberText}>3</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.eventDetailsWr,
            zIndex: isDemo && isActiveHint5Step ? 111 : -1,
          }}
          onLayout={event => setEventDetailsViewCoord(event.nativeEvent.layout)}>
          {isDemo && isActiveHint5Step && (
            <View style={styles.stepHint5Container}>
              <HintCard
                currentStep={hintStep}
                description={hostHintSteps[hintStep - 1]?.description}
                onSkipAction={handleSkipHints}
                onStepChange={setHintStep}
                onNextAction={handleNextStep}
                isNextBtnDisabled={female === 0 && male === 0}
                totalSteps={hostHintSteps.length}
                directionVertical={'bottom'}
                title={hostHintSteps[hintStep - 1]?.title}
              />
            </View>
          )}
          <Text style={[styles.eventDetailsTitle, {opacity: isDemo ? 0.5 : 1}]}>Event details</Text>
          <Input
            required={false}
            isError={false}
            errorText={''}
            editable={!isDemo}
            containerInnerStyle={{borderColor: '', borderWidth: 0, opacity: isDemo ? 0.5 : 1}}
            placeholderTextColor={transparentWhite30Color}
            value={name}
            onChange={val => setName(val)}
            placeholder="Enter event name (Or just the place name)"
            label="Event name"
            labelStyle={[styles.inputLabel, {opacity: isDemo ? 0.5 : 1}]}
            onBlur={handleScroll}
          />
          <Input
            value={description}
            onChange={val => setDescription(val)}
            placeholder="Enter description"
            containerInnerStyle={{opacity: isDemo ? 0.5 : 1}}
            editable={!isDemo}
            label="Description"
            labelStyle={[styles.inputLabel, {opacity: isDemo ? 0.5 : 1}]}
            onBlur={handleScroll}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', flex: 1, marginRight: 10}}>
              <Text style={[styles.maskInputLabel, {opacity: isDemo ? 0.5 : 1}]}>
                Date <Text style={{color: errorColor}}>*</Text>
              </Text>
              <View style={{marginBottom: 26, opacity: isDemo ? 0.5 : 1}}>
                <TouchableOpacity
                  onPress={() => {
                    !isDemo && setOpen(true);
                  }}
                  disabled={isDemo}
                  style={[
                    styles.maskInputWr,
                    {
                      borderWidth: dateEmpty ? 1 : 0,
                      borderColor: dateEmpty ? errorColor : '',
                    },
                  ]}>
                  <DatePicker
                    modal
                    mode="date"
                    open={open}
                    date={datePicker}
                    onConfirm={date => {
                      const data = moment(date).format('DD.MM.YYYY');
                      setOpen(false);
                      setDate(data);
                      setDatePicker(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                  {dateEmpty ? <CalendarRed /> : <Calendar />}
                  <Text
                    style={[
                      styles.maskInput,
                      {
                        color: dateEmpty ? errorColor : whiteColor,
                        opacity: date ? 1 : 0.35,
                      },
                    ]}>
                    {date ? date : 'MM/DD/YY'}
                  </Text>
                </TouchableOpacity>
                {dateEmpty && (
                  <Text style={{color: errorColor, marginTop: 10, fontSize: RFValue(14, 812), fontFamily: Satoshi400}}>Incorrect date</Text>
                )}
              </View>
            </View>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={[styles.maskInputLabel, {opacity: isDemo ? 0.5 : 1}]}>
                Hour <Text style={{color: errorColor}}>*</Text>
              </Text>
              <View style={{opacity: isDemo ? 0.5 : 1}}>
                <TouchableOpacity
                  onPress={() => {
                    !isDemo && setOpenHour(true);
                  }}
                  disabled={isDemo}
                  style={[
                    styles.maskInputWr,
                    {
                      borderWidth: hourEmpty ? 1 : 0,
                      borderColor: dateEmpty ? errorColor : '',
                    },
                  ]}>
                  <DatePicker
                    modal
                    mode="time"
                    open={openHour}
                    date={hourPicker}
                    onConfirm={date => {
                      setOpenHour(false);
                      const time = moment(date).format('HH:mm');
                      setHour(time);
                      setHourPicker(date);
                    }}
                    onCancel={() => {
                      setOpenHour(false);
                    }}
                  />
                  {hourEmpty ? <ClockRed /> : <Clock />}
                  <Text
                    style={[
                      styles.maskInput,
                      {
                        color: hourEmpty ? errorColor : whiteColor,
                        opacity: hour ? 1 : 0.35,
                      },
                    ]}>
                    {hour ? hour : '00:30'}
                  </Text>
                </TouchableOpacity>
                {hourEmpty && (
                  <Text style={{color: errorColor, marginTop: 10, fontSize: RFValue(14, 812), fontFamily: Satoshi400}}>Incorrect hour</Text>
                )}
              </View>
            </View>
          </View>
          <Input
            value={meetingSpot}
            onChange={val => setMeetingSpot(val)}
            placeholder="Enter meeting spot"
            labelStyle={[styles.inputLabel, {opacity: isDemo ? 0.5 : 1}]}
            label="Meeting spot"
            editable={!isDemo}
            containerInnerStyle={{opacity: isDemo ? 0.5 : 1}}
            onBlur={handleScroll}
          />
        </View>
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity
              onPress={() => {
                setTabState('invitedOnly');
                setCurrentCreateStap(1);
              }}>
              <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500}}>Back</Text>
            </TouchableOpacity>
          </View>
          <Button
            loading={loading}
            title={'Continue'}
            buttonStyle={styles.button}
            onPress={() => {
              checkFieldsNotEmpty();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      <ModalAddPhoto
        isVisible={modalAddPhotoVisible}
        onClose={() => setModalAddPhotoVisible(false)}
        openLibrary={openLibrary}
        addPlaceholderPhoto={addPlaceholderPhoto}
      />
    </View>
  );
};

export default EventDetails;
