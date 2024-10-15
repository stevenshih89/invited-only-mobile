import {Dispatch, FC, ReactElement, SetStateAction, useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, Permission, PermissionStatus, RESULTS, check, request} from 'react-native-permissions';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import DatePicker from 'react-native-date-picker';

//import components
import useStyles from './styles.ts';
import Button from 'components/Button/Button';
import Input from 'components/Inputs/Input';
import {isIos} from 'constants/common';
import {gray1Color, orangeClose, toggleColor, whiteColor} from 'constants/colors';
import {showToast} from 'helpers/showToast.ts';
import {uploadImage} from 'helpers/uploadImage.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';

//import icons
import Plus from 'assets/images/icons/plus.svg';
import Calendar from 'assets/images/icons/calendar-new.svg';
import Clock from 'assets/images/icons/clock-grey.svg';
import Close from 'assets/images/icons/close.svg';
import {IOPath} from 'constants/pathLocations.ts';
import auth from '@react-native-firebase/auth';
import {useUser} from '../../../../../../../store/userStore/index.ts';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi500} from 'constants/fonts.ts';
import {Switch} from '@ant-design/react-native';
import { eventTypes } from 'src/mocks/eventTypes.ts';

interface EventPreviewProps {
  isEditing?: boolean;
  setIsVisibleSaveModal: Dispatch<SetStateAction<boolean>>;
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
}

const EventPreview: FC<EventPreviewProps> = ({
  isEditing,
  setIsVisibleSaveModal,
  female,
  male,
  femaleFriend,
  maleFriend,
  id,
}): ReactElement => {
  const [photos, setImages] = useState<{image: null | string; id: number}[]>([
    {
      id: 0,
      image: null,
    },
    {
      id: 1,
      image: null,
    },
    {
      id: 2,
      image: null,
    },
    {
      id: 3,
      image: null,
    },
    {
      id: 4,
      image: null,
    },
  ]);

  const [activeType] = useState(eventTypes[0].id);
  const [placeName, setPlaceName] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [datePicker, setDatePicker] = useState(new Date());
  const [hourPicker, setHourPicker] = useState(new Date());
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [address, setAddress] = useState('');
  const [meetingSpot, setMeetingSpot] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [openHour, setOpenHour] = useState(false);
  const navigation = useAppNavigation();
  const userHost = useUser((i: any) => i?.user);

  // useEffect(() => {
  //   if (isEditing) {
  //     setImages(prevImages);
  //     setActiveType(prevActiveType);
  //     setPlaceName(prevPlaceName ?? '');
  //     setName(prevName ?? '');
  //     setDescription(prevDescription ?? '');
  //     setDate(prevDate ?? '');
  //     setHour(prevHour ?? '');
  //     setAddress(prevAddress ?? '');
  //     setMeetingSpot(prevMeetingSpot ?? '');
  //   }
  // }, [prevImages]);

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

  const openLibrary = async (imageId: number): Promise<void> => {
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
            if (img.id === imageId) {
              return {...img, image: image.uri};
            }
            return img;
          });
          setImages(newImages);
        }
      },
    );
  };

  const updatePhotosImage = async (userId: string | null, imageUrl: string) => {
    if (!userId) {
      return;
    }
    try {
      await firestore().collection('Events').doc(userId).update({
        photos: imageUrl,
      });
      // console.log('Events image updated successfully.');
    } catch (e) {
      // console.error('Error updating events image: ', e);
    }
  };

  // const compareArrays = (arr1, arr2) => {
  //   if (arr1.length !== arr2.length) {
  //     return false;
  //   }

  //   for (let i = 0; i < arr1.length; i++) {
  //     for (let key in arr1[i]) {
  //       if (arr1[i][key] !== arr2[i][key]) {
  //         return false;
  //       }
  //     }
  //   }

  //   return true;
  // };

  const handleSaveChanges = async () => {
    try {
      await firestore().collection('Events').doc(id).update({
        eventTypes,
        placeName,
        name,
        description,
        date,
        hour,
        address,
        meetingSpot,
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const handleCreateEvent = async () => {
    try {
      setLoading(true);
      const uid: string | number[] = uuid.v4();
      const user = auth().currentUser;

      if (photos[0] === null) {
        Alert.alert('Please add the main picture');
      }

      let imagesUri: any[] = [];

      // console.log('imagesUri', imagesUri);
      // console.log('images', photos);
      // @ts-ignore
      await firestore()
        .collection('Events')
        .doc(`${uid}`)
        .set({
          activeType: activeType,
          female: female,
          name: name,
          oldName: name,
          description: description,
          date: date,
          oldDate: date,
          hour: hour,
          oldHour: hour,
          address: address,
          meetingSpot: meetingSpot,
          male: male,
          femaleFriend: femaleFriend,
          maleFriend: maleFriend,
          placeName: placeName,
          id: uid,
          uid: user?.uid,
          requestsList: [],
          usersList: [],
          nameNewViewed: [],
          dateNewViewed: [],
          hourNewViewed: [],
          statusEvent: false,
          eventReviewed: false,
          hostImage: userHost?.photos[0]?.image,
          hostName: userHost?.name,
        })
        .then(async () => {
          photos?.map(async (imagePath, index) => {
            await uploadImage(imagePath?.image, uid).then(img => imagesUri.push({id: index, image: img}));
            await updatePhotosImage(`${uid}`, imagesUri).then(() => {
              showToast('inviteMatch', 'Go to my events >', 'Event successfully created ');
              showToast('inviteMatch', 'Your event in review.', 'Estimate time review 2h');
              isEditing ? setIsVisibleSaveModal(true) : null;
              setLoading(false);
              navigation.navigate(IOPath as never);
            });
          });
          await firestore()
            .collection('userInfo')
            .doc(user?.uid)
            .update({
              eventsList: firestore.FieldValue.arrayUnion(uid),
            });
        });
    } catch (e) {
      setLoading(false);
      // console.log(e);
      showToast('inviteMatch', '', `${e}`);
    }
  };

  return (
    <View style={styles.root}>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainerContent}
        style={styles.scrollView}>
        {/* <View style={styles.eventTypeWr}>
          <Text style={styles.eventTypeTitle}>Event type</Text>
          <FlatList
            data={eventTypes}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.eventTypeSeparator} />}
            renderItem={({item}: any) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setActiveType(item.id)}
                style={[
                  styles.eventTypeItem,
                  {
                    backgroundColor: activeType === item.id ? whiteColor : transparentWhite16Color,
                  },
                ]}>
                <Text style={[styles.eventTypeItemText, {color: activeType === item.id ? black1Color : whiteColor,}]}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View> */}
        <View style={styles.eventPlaceWr}>
          <Input
            label="Place name"
            labelStyle={styles.inputLabel}
            value={placeName}
            onChange={val => setPlaceName(val)}
            placeholder="Enter place name"
          />
          <Input
            value={address}
            onChange={val => setAddress(val)}
            placeholder="Enter adress"
            label="Address"
            // InputIcon={Location}
            labelStyle={styles.inputLabel}
          />
          <Text style={styles.eventPhotosText}>Event photos</Text>
          <View style={styles.flex}>
            <View style={styles.eventPhotoLargeWr}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(photos[0].id)} style={styles.touchableImage}>
                {photos[0]?.image ? (
                  <>
                    <Image resizeMode="cover" source={{uri: photos[0].image}} style={styles.eventPhotoSmallImage} />

                    <View style={{position: 'absolute', top: 12, right: 12}}>
                      <TouchableOpacity
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
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(photos[1].id)} style={styles.touchableImage}>
                  {photos[1]?.image ? (
                    <>
                      <Image resizeMode="cover" source={{uri: photos[1].image}} style={styles.eventPhotoSmallImage} />
                      <View style={{position: 'absolute', top: 12, right: 12}}>
                        <TouchableOpacity
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
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(photos[2].id)} style={styles.touchableImage}>
                  {photos[2]?.image ? (
                    <>
                      <Image resizeMode="cover" source={{uri: photos[2].image}} style={styles.eventPhotoSmallImage} />
                      <View style={{position: 'absolute', top: 12, right: 12}}>
                        <TouchableOpacity
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
            {/* <View style={styles.eventPhotoRow}>
              <View style={styles.eventPhotoSmallLeftWr}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(photos[3].id)} style={styles.touchableImage}>
                  {photos[3]?.image ? (
                    <Image resizeMode="cover" source={{uri: photos[3].image}} style={styles.eventPhotoSmallImage} />
                  ) : (
                    <Plus width={40} height={40} />
                  )}
                </TouchableOpacity>
                <View style={styles.imageNumber}>
                  <Text style={styles.eventPhotoNumberText}>4</Text>
                </View>
              </View>
              <View style={styles.eventPhotoSmallRightWr}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(photos[4].id)} style={styles.touchableImage}>
                  {photos[4]?.image ? (
                    <Image resizeMode="cover" source={{uri: photos[4].image}} style={styles.eventPhotoSmallImage} />
                  ) : (
                    <Plus width={40} height={40} />
                  )}
                </TouchableOpacity>
                <View style={styles.imageNumber}>
                  <Text style={styles.eventPhotoNumberText}>5</Text>
                </View>
              </View>
            </View> */}
          </View>
        </View>
        <View style={styles.eventDetailsWr}>
          <Text style={styles.eventDetailsTitle}>Event details</Text>
          <Input
            value={name}
            onChange={val => setName(val)}
            placeholder="Enter event name"
            label="Event name"
            labelStyle={styles.inputLabel}
          />
          <Input
            value={description}
            onChange={val => setDescription(val)}
            placeholder="Enter description"
            label="Description"
            labelStyle={styles.inputLabel}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', flex: 1, marginRight: 10}}>
              <Text style={styles.maskInputLabel}>Date</Text>
              <TouchableOpacity onPress={() => setOpen(true)} style={styles.maskInputWr}>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={datePicker}
                  onConfirm={dateItem => {
                    const data = moment(dateItem).format('DD.MM.YYYY');
                    setOpen(false);
                    setDate(data);
                    setDatePicker(dateItem);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <Calendar />
                <Text style={styles.maskInput}>{date ? date : 'MM/DD/YY'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={styles.maskInputLabel}>Hour</Text>
              <TouchableOpacity onPress={() => setOpenHour(true)} style={styles.maskInputWr}>
                <DatePicker
                  modal
                  mode="time"
                  open={openHour}
                  date={hourPicker}
                  onConfirm={dateItem => {
                    setOpenHour(false);
                    const time = moment(dateItem).format('HH:mm');
                    setHour(time);
                    setHourPicker(dateItem);
                  }}
                  onCancel={() => {
                    setOpenHour(false);
                  }}
                />
                <Clock />
                <Text style={styles.maskInput}>{hour ? hour : '00:30'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Input
            value={meetingSpot}
            onChange={val => setMeetingSpot(val)}
            placeholder="Enter meeting spot"
            labelStyle={styles.inputLabel}
            label="Meeting spot"
            // InputIcon={Location}
          />
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: RFValue(14, 812), fontFamily: Satoshi500, color: whiteColor}}>
              Are you responsible for the pick up?
            </Text>
            <Switch trackColor={{false: gray1Color, true: toggleColor}} />
          </View>
        </View>
        <Button
          loading={loading}
          title={isEditing ? 'Save changes' : 'Continue'}
          buttonStyle={styles.button}
          onPress={() => (isEditing ? handleSaveChanges() : handleCreateEvent())}
        />
        <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity>
            <Text style={{color: whiteColor, fontSize: RFValue(20, 812), fontFamily: Satoshi500}}>Previous step</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EventPreview;
