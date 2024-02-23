import {FC, ReactElement, useState} from 'react';
import {Alert, FlatList, Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, Permission, PermissionStatus, RESULTS, check, request} from 'react-native-permissions';

import MaskInput from 'react-native-mask-input';

//import components
import useStyles from './styles.ts';
import Button from 'components/Button/Button';
import Input from 'components/Inputs/Input';
import {isIos} from 'constants/common';
import {gray1Color, transparentWhite16Color, whiteColor} from 'constants/colors';

//import icons
import Plus from 'assets/images/icons/plus.svg';
import Location from 'assets/images/icons/location.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import Clock from 'assets/images/icons/clock-white.svg';

const EventDetails: FC = (): ReactElement => {
  const eventTypes = [
    {id: 0, label: 'Custom'},
    {id: 1, label: 'Club'},
    {id: 2, label: 'Restaurant'},
  ];

  const [images, setImages] = useState<{image: null | string; id: number}[]>([
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
          const newImages = images.map(img => {
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
            scrollEnabled={false}
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
              <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(images[0].id)} style={styles.touchableImage}>
                {images[0].image ? (
                  <Image resizeMode="cover" source={{uri: images[0].image}} style={styles.eventPhotoSmallImage} />
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
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(images[1].id)} style={styles.touchableImage}>
                  {images[1].image ? (
                    <Image resizeMode="cover" source={{uri: images[1].image}} style={styles.eventPhotoSmallImage} />
                  ) : (
                    <Plus width={40} height={40} />
                  )}
                </TouchableOpacity>
                <View style={styles.imageNumber}>
                  <Text style={styles.eventPhotoNumberText}>2</Text>
                </View>
              </View>
              <View style={styles.eventPhotoSmallRightWr}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(images[2].id)} style={styles.touchableImage}>
                  {images[2].image ? (
                    <Image resizeMode="cover" source={{uri: images[2].image}} style={styles.eventPhotoSmallImage} />
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
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(images[3].id)} style={styles.touchableImage}>
                  {images[3].image ? (
                    <Image resizeMode="cover" source={{uri: images[3].image}} style={styles.eventPhotoSmallImage} />
                  ) : (
                    <Plus width={40} height={40} />
                  )}
                </TouchableOpacity>
                <View style={styles.imageNumber}>
                  <Text style={styles.eventPhotoNumberText}>4</Text>
                </View>
              </View>
              <View style={styles.eventPhotoSmallRightWr}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(images[4].id)} style={styles.touchableImage}>
                  {images[4].image ? (
                    <Image resizeMode="cover" source={{uri: images[4].image}} style={styles.eventPhotoSmallImage} />
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
        <Button title="Create event" buttonStyle={styles.button} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EventDetails;
