import React from 'react';
import { useFormikContext } from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import { components } from '@invited-only/invited-only-api';
import * as S from './EventPlaceStep.style';
import ModalAddPhoto from './AddPhotoMoald/ModalAddPhoto';
import useAddModalPhotos from './AddPhotoMoald/useAddPhotoModal';
import EventDatePicker from './EventDatePicker/EventDatePicker';

const EventPlaceStep = () => {
  const { values, setFieldValue, errors, touched, setFieldTouched } = useFormikContext<Partial<components['schemas']['EventData']>>();

  const { handleAddPlaceholderPhoto, handleOpenCamera, handleOpenLibrary, handleOpenPhotoModal, isPhotoModalVisible, closeModal } =
    useAddModalPhotos();

  return (
    <S.Container>
      <LinearGradient
        colors={['black', 'transparent']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 20, zIndex: 1 }}
        pointerEvents="none"
      />

      {/* Bottom Fade (black) */}
      <LinearGradient
        colors={['transparent', 'black']}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 20, zIndex: 1 }}
        pointerEvents="none"
      />
      <S.ScrollContainer>
        <S.Card>
          <S.CardTitle>Overview</S.CardTitle>
          <S.FieldContainer>
            <S.FieldLabel>Event name</S.FieldLabel>
            <S.Input>
              <S.StyledTextInput
                name={'name'}
                placeholder="Enter event name"
                placeholderTextColor="#767676"
                value={values.name}
                onChangeText={(value: string) => setFieldValue('name', value)}
                onBlur={() => setFieldTouched('name', true)}
              />
            </S.Input>
            {touched.name && errors.name && <S.ErrorText>{errors.name}</S.ErrorText>}
          </S.FieldContainer>
          <EventDatePicker />

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
                onBlur={() => setFieldTouched('placeName', true)}
              />
            </S.Input>
            {touched.placeName && errors.placeName && <S.ErrorText>{errors.placeName}</S.ErrorText>}
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
                onBlur={() => setFieldTouched('address', true)}
              />
            </S.Input>
            {touched.address && errors.address && <S.ErrorText>{errors.address}</S.ErrorText>}
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
            <S.MainPhotoContainer>
              {values?.photos?.[0]?.image ? (
                <S.AddPhotoButton onPress={() => handleOpenPhotoModal(1)}>
                  <S.EventImage source={{ uri: values.photos[0].image }} />
                </S.AddPhotoButton>
              ) : (
                <S.AddPhotoButton onPress={() => handleOpenPhotoModal(1)}>
                  <S.AddPhotoText>Main</S.AddPhotoText>
                </S.AddPhotoButton>
              )}
            </S.MainPhotoContainer>
            {touched.photos && errors.photos?.[0] && !values.photos?.[0]?.image && (
              <S.ErrorText>Main photo is required</S.ErrorText>
            )}

            <S.PhotosRow>
              <S.SmallPhotoContainer>
                {values?.photos?.[1]?.image ? (
                  <S.AddPhotoButton onPress={() => handleOpenPhotoModal(2)}>
                    <FastImage source={{ uri: values.photos[1].image }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                  </S.AddPhotoButton>
                ) : (
                  <S.AddPhotoButton onPress={() => handleOpenPhotoModal(2)}>
                    <S.AddPhotoText>2</S.AddPhotoText>
                  </S.AddPhotoButton>
                )}
              </S.SmallPhotoContainer>
              <S.SmallPhotoContainer>
                {values?.photos?.[2]?.image ? (
                  <S.AddPhotoButton onPress={() => handleOpenPhotoModal(3)}>
                    <FastImage source={{ uri: values.photos[2].image }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
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
      </S.ScrollContainer>

      <ModalAddPhoto
        isVisible={isPhotoModalVisible}
        onClose={closeModal}
        openCamera={handleOpenCamera}
        openLibrary={handleOpenLibrary}
        addPlaceholderPhoto={handleAddPlaceholderPhoto}
      />
    </S.Container>
  );
};

export default EventPlaceStep;
