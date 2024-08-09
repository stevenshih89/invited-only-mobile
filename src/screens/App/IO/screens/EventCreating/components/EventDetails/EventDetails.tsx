import {Dispatch, FC, ReactElement, SetStateAction, useEffect, useState} from 'react';
import {Alert, FlatList, Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, Permission, PermissionStatus, RESULTS, check, request} from 'react-native-permissions';
import MaskInput from 'react-native-mask-input';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import DatePicker from 'react-native-date-picker';

//import components
import useStyles from './styles.ts';
import Button from 'components/Button/Button';
import Input from 'components/Inputs/Input';
import {isIos} from 'constants/common';
import {black1Color, black3Color, errorColor, gray1Color, lightGray10Color, lightGray2Color, orangeClose, toggleColor, transparentWhite16Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {showToast} from 'helpers/showToast.ts';
import {uploadImage} from 'helpers/uploadImage.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';

//import icons
import Plus from 'assets/images/icons/plus.svg';
import Location from 'assets/images/icons/location.svg';
import Calendar from 'assets/images/icons/calendar-new.svg';
import CalendarRed from 'assets/images/icons/calendar-red.svg';
import Clock from 'assets/images/icons/clock-grey.svg';
import ClockRed from 'assets/images/icons/clock-red.svg';
import Close from 'assets/images/icons/close.svg';
import {IOPath} from 'constants/pathLocations.ts';
import auth from '@react-native-firebase/auth';
import {useUser} from '../../../../../../../store/userStore';
import moment from "moment";
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi400, Satoshi500 } from 'constants/fonts.ts';
import { Switch } from '@ant-design/react-native';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';
import InstagramSlider from 'components/InstagramSlider/InstagramSlider.tsx';
import ModalAddPhoto from './ModalAddPhoto.tsx';

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
  address: string
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
  setIsVisibleSaveModal,
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
  femaleFriend,
  maleFriend,
  id,
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
  setLoading,
  open, 
  setOpen,
  openHour, 
  setOpenHour,
  userHost,
}): ReactElement => {
  const eventTypes = [
    {id: 0, label: 'Custom'},
    {id: 1, label: 'Table'},
    {id: 2, label: 'Club'},
    {id: 3, label: 'Restaurant'},
  ];  
    
  const [modalAddPhotoVisible, setModalAddPhotoVisible] = useState(false);
  const [photosId, setPhotosId] = useState();
  const [addressEmpty, setAddressEmpty] = useState(false)
  const [placeNameEmpty, setPlaceNameEmpty] = useState(false)
  const [eventNameEmpty, setEventNameEmpty] = useState(false)
  const [dateEmpty, setDateEmpty] = useState(false)
  const [hourEmpty, setHourEmpty] = useState(false)
  
  useEffect(() => {
    if(address) setAddressEmpty(false)
    if(placeName) setPlaceNameEmpty(false)
    if(name) setEventNameEmpty(false)
    if(date) setDateEmpty(false)
    if(hour) setHourEmpty(false)
  },[address, placeName, name, date, hour])
  
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
  }, []);

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
    const photoLibraryPermission = await makePermissionsRequest(isIos ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

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
              if(img.id === 0) {
                setMainImage(image.uri)
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
        return { ...img, image: 'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/placeholders%2FFrame%201321315887.jpg?alt=media&token=dd4f9b58-f90b-415e-85f8-52de10eb0e68' };
      }
      return img;
    });
    setImages(newPhotos);
    setModalAddPhotoVisible(false);
  }

  const checkFieldsNotEmpty = () => {

    let hasEmptyField = false;

    if(!address) {
      setAddressEmpty(true)
      hasEmptyField= true
    }
    if(!placeName) {
      setPlaceNameEmpty(true)
      hasEmptyField= true
    }
    if(!name) {
      setEventNameEmpty(true)
      hasEmptyField= true
    }
    if(!date) {
      setDateEmpty(true)
      hasEmptyField= true
    }
    if(!hour) {
      setHourEmpty(true)
      hasEmptyField= true
    }

    if (!hasEmptyField) {
      checkPhotos();
    }
  }

  const checkPhotos = () => {
    const newPhotos = photos.map(img => {
      if(img.id != 3 && img.id != 4) {
        if (img.image === null) {
          return { ...img, image: 'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/FCMImages%2Fevent-placeholder.png?alt=media&token=a077a866-8a9f-45e6-a8d9-9e49a9509296' };
        }
        return img
      }
      return img;
    });
    setImages(newPhotos);
    setCurrentCreateStap(3);
    setTabState('eventPreview')
  }

  const deleteImage = (id: number) => {
    const newPhotos = photos.map(img => {
      if (img.id === id) {
        return { ...img, image: null };
      }
      return img;
    });
  
    setImages(newPhotos);
  };

  const updatePhotosImage = async (userId: string | null, imageUrl: string) => {
    try {
      await firestore().collection('Events').doc(userId).update({
        photos: imageUrl,
      });
      console.log('Events image updated successfully.');
    } catch (e) {
      console.error('Error updating events image: ', e);
    }
  };

  const compareArrays = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      for (let key in arr1[i]) {
        if (arr1[i][key] !== arr2[i][key]) {
          return false;
        }
      }
    }

    return true;
  };
  const handleSaveChanges = async () => {
    try {
      console.log('photos', photos);
      console.log('compareArrays', compareArrays(photos, photos));

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
      console.log(e);
    }
  };

  return (
    <View style={styles.root}>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainerContent}
        style={styles.scrollView}
        enableResetScrollToCoords={false}
        >
        <View style={styles.eventTypeWr}>
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
                    backgroundColor: activeType === item.id ? whiteColor : lightGray2Color,
                  },
                ]}>
                <Text style={[styles.eventTypeItemText, {color: activeType === item.id ? black1Color : whiteColor,}]}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* <View style={styles.eventPlaceWr}> */}
          <View style={{backgroundColor: black3Color, borderRadius: 20, padding: 20, marginBottom: 24}}>
          <Input
            required
            isError={placeNameEmpty}
            errorText={placeNameEmpty? 'Incorrect place name': ''}
            containerInnerStyle={{borderColor: placeNameEmpty? errorColor: '', borderWidth: placeNameEmpty? 1: 0}}
            placeholderTextColor={placeNameEmpty? errorColor: transparentWhite30Color}
            label="Place name"
            labelStyle={styles.inputLabel}
            value={placeName}
            onChange={val => setPlaceName(val)}
            placeholder="Enter place name"
          />
          <Input
            required
            isError={addressEmpty}
            errorText={addressEmpty? 'Incorrect address': ''}
            containerInnerStyle={{borderColor: addressEmpty? errorColor: '', borderWidth: addressEmpty? 1: 0}}
            value={address}
            onChange={val => setAddress(val)}
            placeholder="Enter adress"
            placeholderTextColor={addressEmpty? errorColor: transparentWhite30Color}
            label="Address"
            // InputIcon={Location}
            labelStyle={styles.inputLabel}
          />
          {/* <Text>Incorrect address</Text> */}
          </View>
          
          <View style={{
              padding: 20, 
              backgroundColor: black3Color,
              borderRadius: 20,
              marginBottom: 24
            }}>
          <Text style={styles.eventPhotosText}>Event photos <Text style={{color: errorColor}}>*</Text></Text>
          <View style={styles.flex}>
            <View style={styles.eventPhotoLargeWr}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => {
                setPhotosId(photos[0].id)
                setModalAddPhotoVisible(true)
              }} style={styles.touchableImage}>
                {photos[0]?.image ? (
                  <>
                    <Image resizeMode="cover" source={{uri: photos[0].image}} style={styles.eventPhotoSmallImage} />
                    
                      <View style={{position: 'absolute', top: 12, right: 12}}>
                        <TouchableOpacity 
                        onPress={() => deleteImage(0)}
                        style={{justifyContent: 'center', alignItems: 'center', width: 26, height: 26, borderRadius: 13, backgroundColor: orangeClose}}>
                          <Close/>
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
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                  setPhotosId(photos[1].id)
                  setModalAddPhotoVisible(true)
                }} style={styles.touchableImage}>
                  {photos[1]?.image ? (
                    <>
                      <Image resizeMode="cover" source={{uri: photos[1].image}} style={styles.eventPhotoSmallImage} />
                    <View style={{position: 'absolute', top: 12, right: 12}}>
                        <TouchableOpacity 
                        onPress={() => deleteImage(1)}
                        style={{justifyContent: 'center', alignItems: 'center', width: 26, height: 26, borderRadius: 13, backgroundColor: orangeClose}}>
                          <Close/>
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
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                  setPhotosId(photos[2].id)
                  setModalAddPhotoVisible(true)
                }} style={styles.touchableImage}>
                  {photos[2]?.image ? (
                    <>
                      <Image resizeMode="cover" source={{uri: photos[2].image}} style={styles.eventPhotoSmallImage} />
                    <View style={{position: 'absolute', top: 12, right: 12}}>
                        <TouchableOpacity 
                        onPress={() => deleteImage(2)}
                        style={{justifyContent: 'center', alignItems: 'center', width: 26, height: 26, borderRadius: 13, backgroundColor: orangeClose}}>
                          <Close/>
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
        {/* </View> */}
        <View style={styles.eventDetailsWr}>
          <Text style={styles.eventDetailsTitle}>Event details</Text>
          <Input 
            required 
            isError={eventNameEmpty}
            errorText={eventNameEmpty? 'Incorrect event name': ''}
            containerInnerStyle={{borderColor: eventNameEmpty? errorColor: '', borderWidth: eventNameEmpty? 1: 0}}
            placeholderTextColor={eventNameEmpty? errorColor: transparentWhite30Color}
            value={name} 
            onChange={val => setName(val)} 
            placeholder="Enter event name (Or just the place name)" 
            label="Event name" labelStyle={styles.inputLabel} />
          <Input
            value={description}
            onChange={val => setDescription(val)}
            placeholder="Enter description"
            label="Description"
            labelStyle={styles.inputLabel}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', flex: 1, marginRight: 10}}>
          <Text style={styles.maskInputLabel}>Date <Text style={{color: errorColor}}>*</Text></Text>
          <View style={{marginBottom: 26,}}>
          <TouchableOpacity onPress={() => setOpen(true)} style={[styles.maskInputWr, {borderWidth: dateEmpty? 1: 0, borderColor: dateEmpty? errorColor: ''}]}>
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
            {dateEmpty? <CalendarRed />: <Calendar/>}
            <Text style={[styles.maskInput, {color: dateEmpty? errorColor: whiteColor, opacity: date? 1 : 0.35,}]}>{date ? date : 'MM/DD/YY'}</Text>
          </TouchableOpacity>
          {dateEmpty && <Text style={{color: errorColor, marginTop: 10, fontSize: RFValue(14, 812), fontFamily: Satoshi400}}>Incorrect date</Text>}
          </View>
          </View>
          <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={styles.maskInputLabel}>Hour <Text style={{color: errorColor}}>*</Text></Text>
          <View>
          <TouchableOpacity onPress={() => setOpenHour(true)} style={[styles.maskInputWr, {borderWidth: hourEmpty? 1: 0, borderColor: dateEmpty? errorColor: ''}]}>
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
            {hourEmpty? <ClockRed />: <Clock />}
            <Text style={[styles.maskInput, {color: hourEmpty? errorColor: whiteColor, opacity: hour? 1 : 0.35}]}>{hour ? hour : '00:30'}</Text>
          </TouchableOpacity>
          {hourEmpty && <Text style={{color: errorColor, marginTop: 10, fontSize: RFValue(14, 812), fontFamily: Satoshi400}}>Incorrect hour</Text>}
          </View>
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
            <Text style={{fontSize: RFValue(14, 812), fontFamily: Satoshi500, color: whiteColor}}>Are you responsible for the pick up?</Text>
            <Switch trackColor={{false: gray1Color, true: toggleColor}} />
          </View>
        </View>
        <View style={{flexDirection: 'row', width:'100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity onPress={() => {
            setTabState('invitedOnly')
            setCurrentCreateStap(1);
          }}>
            <Text style={{color: whiteColor, fontSize: RFValue(20, 812), fontFamily: Satoshi500}}>Back</Text>
          </TouchableOpacity>
        </View>
        <Button
          // disabled={
          //   !placeName ||
          //   !address ||
          //   !name ||
          //   !date ||
          //   !hour ||
          //   !photos[0].image
          // }
          loading={loading}
          title={'Continue'}
          buttonStyle={styles.button}
          onPress={() => {
            checkFieldsNotEmpty()
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
