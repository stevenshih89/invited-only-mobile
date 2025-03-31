import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {useFormikContext} from 'formik';
import * as S from './EventPlaceStep.style';
import {CreateEventFormValues} from '../../CreateEventFlow';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ModalAddPhoto from './AddPhotoMoald/ModalAddPhoto';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EventPlaceStep = () => {
  const {values, setFieldValue} = useFormikContext<CreateEventFormValues>();
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(null);
  const [photos, setPhotos] = useState<{[key: number]: string | null}>({
    1: null, // Main photo
    2: null, // Additional photo 1
    3: null, // Additional photo 2
  });

  const handleOpenPhotoModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsPhotoModalVisible(true);
  };

  const handleOpenCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets.length > 0 && currentPhotoIndex !== null) {
      const photoUri = result.assets[0].uri;
      if (photoUri) {
        setPhotos(prev => ({...prev, [currentPhotoIndex]: photoUri}));
        setIsPhotoModalVisible(false);
      }
    }
  };

  const handleOpenLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets.length > 0 && currentPhotoIndex !== null) {
      const photoUri = result.assets[0].uri;
      if (photoUri) {
        setPhotos(prev => ({...prev, [currentPhotoIndex]: photoUri}));
        setIsPhotoModalVisible(false);
      }
    }
  };

  const handleAddPlaceholderPhoto = () => {
    if (currentPhotoIndex !== null) {
      // Use a placeholder image URL or local asset
      const placeholderUri = 'https://via.placeholder.com/300';
      setPhotos(prev => ({...prev, [currentPhotoIndex]: placeholderUri}));
      setIsPhotoModalVisible(false);
    }
  };

  return (
    <View>
      <LinearGradient
        colors={['black', 'transparent']}
        style={{position: 'absolute', top: 0, left: 0, right: 0, height: 20, zIndex: 1}}
        pointerEvents="none"
      />

      {/* Bottom Fade (black) */}
      <LinearGradient
        colors={['transparent', 'black']}
        style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 20, zIndex: 1}}
        pointerEvents="none"
      />
      <S.Container>
        <S.Card>
          <S.CardTitle>Overview</S.CardTitle>
          <S.FieldContainer>
            <S.FieldLabel>Event name</S.FieldLabel>
            <S.Input>
              <S.StyledTextInput
                name={'eventName'}
                placeholder="Enter event name"
                placeholderTextColor="#767676"
                value={values.eventName}
                onChangeText={(value: string) => setFieldValue('eventName', value)}
              />
            </S.Input>
          </S.FieldContainer>
          <S.RowContainer>
            <S.HalfFieldContainer>
              <S.FieldLabel>Date *</S.FieldLabel>
              <S.Input>
                <S.StyledTextInput
                  placeholder="MM/DD/YY"
                  placeholderTextColor="#767676"
                  value={values.date}
                  onChangeText={(value: string) => setFieldValue('date', value)}
                />
              </S.Input>
            </S.HalfFieldContainer>

            {/* Hour Field */}
            <S.HalfFieldContainer>
              <S.FieldLabel>Hour *</S.FieldLabel>
              <S.Input>
                <S.StyledTextInput
                  placeholder="00:00"
                  placeholderTextColor="#767676"
                  value={values.hour}
                  onChangeText={(value: string) => setFieldValue('hour', value)}
                />
              </S.Input>
            </S.HalfFieldContainer>
          </S.RowContainer>

          {/* Description Field */}
          <S.FieldContainer>
            <S.FieldLabel>Description</S.FieldLabel>
            <S.Input>
              <S.StyledTextInput
                placeholder="Enter description"
                placeholderTextColor="#767676"
                value={values.description}
                onChangeText={(value: string) => setFieldValue('description', value)}
              />
            </S.Input>
          </S.FieldContainer>
        </S.Card>

        {/* Location Card */}
        <S.Card>
          <S.CardTitle>Location</S.CardTitle>

          {/* Place Name Field */}
          <S.FieldContainer>
            <S.FieldLabel>Place name *</S.FieldLabel>
            <S.Input>
              <S.StyledTextInput
                placeholder="Enter place name"
                placeholderTextColor="#767676"
                value={values.placeName}
                onChangeText={(value: string) => setFieldValue('placeName', value)}
              />
            </S.Input>
          </S.FieldContainer>

          {/* Address Field */}
          <S.FieldContainer>
            <S.FieldLabel>Address *</S.FieldLabel>
            <S.Input>
              <S.StyledTextInput
                placeholder="Enter address"
                placeholderTextColor="#767676"
                value={values.address}
                onChangeText={(value: string) => setFieldValue('address', value)}
              />
            </S.Input>
          </S.FieldContainer>

          {/* Meeting Spot Field */}
          <S.FieldContainer>
            <S.FieldLabel>Meeting spot</S.FieldLabel>
            <S.Input>
              <S.StyledTextInput
                placeholder="Enter meeting spot"
                placeholderTextColor="#767676"
                value={values.meetingSpot}
                onChangeText={(value: string) => setFieldValue('meetingSpot', value)}
              />
            </S.Input>
          </S.FieldContainer>
        </S.Card>

        {/* Event Photos Card */}
        <S.Card>
          <S.CardTitle>Event Photos</S.CardTitle>
          <S.PhotosContainer>
            {/* Main Photo */}
            <S.MainPhotoContainer>
              {photos[1] ? (
                <S.AddPhotoButton onPress={() => handleOpenPhotoModal(1)}>
                  <Image source={{uri: photos[1]}} style={{width: '100%', height: '100%', borderRadius: 10}} />
                </S.AddPhotoButton>
              ) : (
                <S.AddPhotoButton onPress={() => handleOpenPhotoModal(1)}>
                  <S.AddPhotoText>Main</S.AddPhotoText>
                </S.AddPhotoButton>
              )}
            </S.MainPhotoContainer>

            {/* Additional Photos Row */}
            <S.PhotosRow>
              <S.SmallPhotoContainer>
                {photos[2] ? (
                  <S.AddPhotoButton onPress={() => handleOpenPhotoModal(2)}>
                    <Image source={{uri: photos[2]}} style={{width: '100%', height: '100%', borderRadius: 10}} />
                  </S.AddPhotoButton>
                ) : (
                  <S.AddPhotoButton onPress={() => handleOpenPhotoModal(2)}>
                    <S.AddPhotoText>2</S.AddPhotoText>
                  </S.AddPhotoButton>
                )}
              </S.SmallPhotoContainer>
              <S.SmallPhotoContainer>
                {photos[3] ? (
                  <S.AddPhotoButton onPress={() => handleOpenPhotoModal(3)}>
                    <Image source={{uri: photos[3]}} style={{width: '100%', height: '100%', borderRadius: 10}} />
                  </S.AddPhotoButton>
                ) : (
                  <S.AddPhotoButton onPress={() => handleOpenPhotoModal(3)}>
                    <S.AddPhotoText>3</S.AddPhotoText>
                  </S.AddPhotoButton>
                )}
              </S.SmallPhotoContainer>
            </S.PhotosRow>
          </S.PhotosContainer>
        </S.Card>
      </S.Container>

      <ModalAddPhoto
        isVisible={isPhotoModalVisible}
        onClose={() => setIsPhotoModalVisible(false)}
        openCamera={handleOpenCamera}
        openLibrary={handleOpenLibrary}
        addPlaceholderPhoto={handleAddPlaceholderPhoto}
      />
    </View>
  );
};

export default EventPlaceStep;
