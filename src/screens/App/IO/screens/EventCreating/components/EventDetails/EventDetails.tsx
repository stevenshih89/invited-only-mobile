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
import {black1Color, gray1Color, orangeClose, toggleColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import {showToast} from 'helpers/showToast.ts';
import {uploadImage} from 'helpers/uploadImage.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';

//import icons
import Plus from 'assets/images/icons/plus.svg';
import Location from 'assets/images/icons/location.svg';
import Calendar from 'assets/images/icons/calendar-new.svg';
import Clock from 'assets/images/icons/clock-grey.svg';
import Close from 'assets/images/icons/close.svg';
import {IOPath} from 'constants/pathLocations.ts';
import auth from '@react-native-firebase/auth';
import {useUser} from '../../../../../../../store/userStore';
import moment from "moment";
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi500 } from 'constants/fonts.ts';
import { Switch } from '@ant-design/react-native';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';
import InstagramSlider from 'components/InstagramSlider/InstagramSlider.tsx';

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
  }, [prevImages]);

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
            if (img.id === imageId) {
              if(img.id === 0) {
                setMainImage(image.uri)
              }
              return {...img, image: image.uri};
            }
            return img;
          });
          setImages(newImages);
        }
      },
    );
  };

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
        style={styles.scrollView}>
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
                    backgroundColor: activeType === item.id ? whiteColor : transparentWhite16Color,
                  },
                ]}>
                <Text style={[styles.eventTypeItemText, {color: activeType === item.id ? black1Color : whiteColor,}]}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
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
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(photos[1].id)} style={styles.touchableImage}>
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
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(photos[2].id)} style={styles.touchableImage}>
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
        <View style={styles.eventDetailsWr}>
          <Text style={styles.eventDetailsTitle}>Event details</Text>
          <Input value={name} onChange={val => setName(val)} placeholder="Enter event name" label="Event name" labelStyle={styles.inputLabel} />
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
            <Text style={{fontSize: RFValue(14, 812), fontFamily: Satoshi500, color: whiteColor}}>Are you responsible for the pick up?</Text>
            <Switch trackColor={{false: gray1Color, true: toggleColor}} />
          </View>
        </View>
        <Button
          loading={loading}
          title={isEditing ? 'Save changes' : 'Continue'}
          buttonStyle={styles.button}
          onPress={() => {
            isEditing ? handleSaveChanges() : setTabState('eventPreview')
            setCurrentCreateStap(3);
          }}
        />
        <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity onPress={() => {
            setTabState('invitedOnly')
            setCurrentCreateStap(1);
          }}>
            <Text style={{color: whiteColor, fontSize: RFValue(20, 812), fontFamily: Satoshi500}}>Previous step</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EventDetails;
