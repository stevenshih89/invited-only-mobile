import {Dispatch, FC, ReactElement, SetStateAction, useEffect, useState} from 'react';
import {Alert, FlatList, Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, Permission, PermissionStatus, RESULTS, check, request} from 'react-native-permissions';
import MaskInput from 'react-native-mask-input';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import components
import useStyles from './styles.ts';
import Button from 'components/Button/Button';
import Input from 'components/Inputs/Input';
import {isIos} from 'constants/common';
import {gray1Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {showToast} from 'helpers/showToast.ts';
import {uploadImage} from 'helpers/uploadImage.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';

//import icons
import Plus from 'assets/images/icons/plus.svg';
import Location from 'assets/images/icons/location.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import Clock from 'assets/images/icons/clock-white.svg';
import {IOPath} from 'constants/pathLocations.ts';
import auth from '@react-native-firebase/auth';

interface EventDetailsProps {
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
  femaleFriend?: number;
  maleFriend?: number;
}

const EventDetails: FC<EventDetailsProps> = ({
  isEditing,
  setIsVisibleSaveModal,
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
}): ReactElement => {
  const eventTypes = [
    {id: 0, label: 'Custom'},
    {id: 1, label: 'Table'},
    {id: 2, label: 'Club'},
    {id: 3, label: 'Restaurant'},
  ];

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

  const [activeType, setActiveType] = useState(eventTypes[0].id);
  const [placeName, setPlaceName] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [address, setAddress] = useState('');
  const [meetingSpot, setMeetingSpot] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useAppNavigation();

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
    try {
      await firestore().collection('Events').doc(userId).update({
        photos: imageUrl,
      });
      console.log('Events image updated successfully.');
    } catch (e) {
      console.error('Error updating events image: ', e);
    }
  };

  const handleCreateEvent = async () => {
    try {
      setLoading(true);
      const uid: string | number[] = uuid.v4();
      const user = auth().currentUser;

      let imagesUri: any[] = [];

      console.log('imagesUri', imagesUri);
      console.log('images', photos);
      // @ts-ignore
      await firestore()
        .collection('Events')
        .doc(uid)
        .set({
          activeType: activeType,
          female: female,
          name: name,
          description: description,
          date: date,
          hour: hour,
          address: address,
          meetingSpot: meetingSpot,
          male: male,
          femaleFriend: femaleFriend,
          maleFriend: maleFriend,
          placeName: placeName,
          id: uid,
          uid: user?.uid,
          id: uid,
        })
        .then(async () => {
          photos?.map(async (imagePath, index) => {
            await uploadImage(imagePath?.image, uid).then(img => imagesUri.push({id: index, image: img}));
            await updatePhotosImage(uid, imagesUri).then(() => {
              showToast('success', 'Go to my events >', 'Event successfully created ');
              showToast('pending', 'Your event in review.', 'Estimate time review 2h');
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
      console.log(e);
      showToast('cancel', '', `${e}`);
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
                    borderColor: activeType === item.id ? whiteColor : transparentWhite16Color,
                  },
                ]}>
                <Text style={styles.eventTypeItemText}>{item.label}</Text>
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
            placeholder="Jameson Jackson"
          />
          <Text style={styles.eventPhotosText}>Event photos</Text>
          <View style={styles.flex}>
            <View style={styles.eventPhotoLargeWr}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(photos[0].id)} style={styles.touchableImage}>
                {photos[0].image ? (
                  <Image resizeMode="cover" source={{uri: photos[0].image}} style={styles.eventPhotoSmallImage} />
                ) : (
                  <Plus width={40} height={40} />
                )}
              </TouchableOpacity>
              <View style={styles.imageNumber}>
                <Text style={styles.eventPhotoNumberText}>1</Text>
              </View>
            </View>
            <View style={[styles.eventPhotoRow, {marginBottom: 8}]}>
              <View style={styles.eventPhotoSmallLeftWr}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(photos[1].id)} style={styles.touchableImage}>
                  {photos[1].image ? (
                    <Image resizeMode="cover" source={{uri: photos[1].image}} style={styles.eventPhotoSmallImage} />
                  ) : (
                    <Plus width={40} height={40} />
                  )}
                </TouchableOpacity>
                <View style={styles.imageNumber}>
                  <Text style={styles.eventPhotoNumberText}>2</Text>
                </View>
              </View>
              <View style={styles.eventPhotoSmallRightWr}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(photos[2].id)} style={styles.touchableImage}>
                  {photos[2].image ? (
                    <Image resizeMode="cover" source={{uri: photos[2].image}} style={styles.eventPhotoSmallImage} />
                  ) : (
                    <Plus width={40} height={40} />
                  )}
                </TouchableOpacity>
                <View style={styles.imageNumber}>
                  <Text style={styles.eventPhotoNumberText}>3</Text>
                </View>
              </View>
            </View>
            <View style={styles.eventPhotoRow}>
              <View style={styles.eventPhotoSmallLeftWr}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(photos[3].id)} style={styles.touchableImage}>
                  {photos[3].image ? (
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
                  {photos[4].image ? (
                    <Image resizeMode="cover" source={{uri: photos[4].image}} style={styles.eventPhotoSmallImage} />
                  ) : (
                    <Plus width={40} height={40} />
                  )}
                </TouchableOpacity>
                <View style={styles.imageNumber}>
                  <Text style={styles.eventPhotoNumberText}>5</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.eventDetailsWr}>
          <Text style={styles.eventDetailsTitle}>Event details</Text>
          <Input value={name} onChange={val => setName(val)} placeholder="Jameson Birthday party" label="Name" labelStyle={styles.inputLabel} />
          <Input
            value={description}
            onChange={val => setDescription(val)}
            placeholder="Jameson Jackson"
            label="Description"
            labelStyle={styles.inputLabel}
          />
          <Text style={styles.maskInputLabel}>Date</Text>
          <View style={styles.maskInputWr}>
            <MaskInput
              style={styles.maskInput}
              keyboardAppearance="dark"
              value={date}
              keyboardType="number-pad"
              onChangeText={(masked: any) => setDate(masked)}
              placeholder="12.10.2024"
              placeholderTextColor={gray1Color}
              mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
            />
            <View style={styles.inputIcon}>
              <Calendar />
            </View>
          </View>
          <Text style={styles.maskInputLabel}>Hour</Text>
          <View style={styles.maskInputWr}>
            <MaskInput
              style={styles.maskInput}
              keyboardAppearance="dark"
              value={hour}
              keyboardType="number-pad"
              onChangeText={(masked: any) => setHour(masked)}
              placeholder="00:30"
              placeholderTextColor={gray1Color}
              mask={[/\d/, /\d/, ':', /\d/, /\d/]}
            />
            <View style={styles.inputIcon}>
              <Clock />
            </View>
          </View>
          <Input
            value={address}
            onChange={val => setAddress(val)}
            placeholder="Dubai"
            label="Address"
            InputIcon={Location}
            labelStyle={styles.inputLabel}
          />
          <Input
            value={meetingSpot}
            onChange={val => setMeetingSpot(val)}
            placeholder="Bar entrance"
            labelStyle={styles.inputLabel}
            label="Meeting spot"
            InputIcon={Location}
          />
        </View>
        <Button
          loading={loading}
          title={isEditing ? 'Save changes' : 'Create event'}
          buttonStyle={styles.button}
          onPress={() => handleCreateEvent()}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EventDetails;
