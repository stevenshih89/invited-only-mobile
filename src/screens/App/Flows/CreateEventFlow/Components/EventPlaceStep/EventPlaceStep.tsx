import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {useFormikContext} from 'formik';
import * as S from './EventPlaceStep.style';
import {CreateEventFormValues} from '../../CreateEventFlow';
import LinearGradient from 'react-native-linear-gradient';
import ModalAddPhoto from './AddPhotoMoald/ModalAddPhoto';

import useAddModalPhotos from './AddPhotoMoald/useAddPhotoModal';
import FastImage from 'react-native-fast-image';

const EventPlaceStep = () => {
  const {values, setFieldValue} = useFormikContext<CreateEventFormValues>();
  console.log('values are: ', values);

  const {handleAddPlaceholderPhoto, handleOpenCamera, handleOpenLibrary, handleOpenPhotoModal, isPhotoModalVisible, closeModal} =
    useAddModalPhotos();

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

        <S.Card>
          <S.CardTitle>Event Photos</S.CardTitle>
          <S.PhotosContainer>
            {/* Main Photo */}
            <S.MainPhotoContainer>
              {values?.photos?.main ? (
                <S.AddPhotoButton onPress={() => handleOpenPhotoModal(1)}>
                  <S.EventImage source={{uri: values.photos.main}} />
                </S.AddPhotoButton>
              ) : (
                <S.AddPhotoButton onPress={() => handleOpenPhotoModal(1)}>
                  <S.AddPhotoText>Main</S.AddPhotoText>
                </S.AddPhotoButton>
              )}
            </S.MainPhotoContainer>

            <S.PhotosRow>
              <S.SmallPhotoContainer>
                {values?.photos?.photo2 ? (
                  <S.AddPhotoButton onPress={() => handleOpenPhotoModal(2)}>
                    <FastImage source={{uri: values.photos.photo2}} style={{width: '100%', height: '100%', borderRadius: 10}} />
                  </S.AddPhotoButton>
                ) : (
                  <S.AddPhotoButton onPress={() => handleOpenPhotoModal(2)}>
                    <S.AddPhotoText>2</S.AddPhotoText>
                  </S.AddPhotoButton>
                )}
              </S.SmallPhotoContainer>
              <S.SmallPhotoContainer>
                {values?.photos?.photo3 ? (
                  <S.AddPhotoButton onPress={() => handleOpenPhotoModal(3)}>
                    <FastImage source={{uri: values.photos.photo3}} style={{width: '100%', height: '100%', borderRadius: 10}} />
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
        onClose={closeModal}
        openCamera={handleOpenCamera}
        openLibrary={handleOpenLibrary}
        addPlaceholderPhoto={handleAddPlaceholderPhoto}
      />
    </View>
  );
};

export default EventPlaceStep;
