import React from 'react';
import {View} from 'react-native';
import {useFormikContext} from 'formik';
import * as S from './EventPlaceStep.style';
import {CreateEventFormValues} from '../../CreateEventFlow';
import {ScrollView} from 'react-native-gesture-handler';

const EventPlaceStep = () => {
  const {values, handleChange, setFieldValue} = useFormikContext<CreateEventFormValues>();

  return (
    <S.Container>
      <S.Card>
        <S.CardTitle>Overview</S.CardTitle>
        <S.FieldContainer>
          <S.FieldLabel>Event name</S.FieldLabel>
          <S.Input>
            <S.StyledTextInput
              placeholder="Enter event name"
              placeholderTextColor="#767676"
              value={values.eventName}
              onChangeText={handleChange('eventName')}
            />
          </S.Input>
        </S.FieldContainer>

        {/* Date and Hour Row */}
        <S.RowContainer>
          {/* Date Field */}
          <S.HalfFieldContainer>
            <S.FieldLabel>Date *</S.FieldLabel>
            <S.Input>
              <S.StyledTextInput
                placeholder="MM/DD/YY"
                placeholderTextColor="#767676"
                value={values.date}
                onChangeText={handleChange('date')}
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
                onChangeText={handleChange('hour')}
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
              onChangeText={handleChange('description')}
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
              onChangeText={handleChange('placeName')}
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
              onChangeText={handleChange('address')}
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
              onChangeText={handleChange('meetingSpot')}
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
            <S.AddPhotoButton onPress={() => console.log('Add main photo')}>
              <S.AddPhotoText>Main</S.AddPhotoText>
            </S.AddPhotoButton>
          </S.MainPhotoContainer>

          {/* Additional Photos Row */}
          <S.PhotosRow>
            <S.SmallPhotoContainer>
              <S.AddPhotoButton onPress={() => console.log('Add photo 2')}>
                <S.AddPhotoText>2</S.AddPhotoText>
              </S.AddPhotoButton>
            </S.SmallPhotoContainer>
            <S.SmallPhotoContainer>
              <S.AddPhotoButton onPress={() => console.log('Add photo 3')}>
                <S.AddPhotoText>3</S.AddPhotoText>
              </S.AddPhotoButton>
            </S.SmallPhotoContainer>
          </S.PhotosRow>
        </S.PhotosContainer>
      </S.Card>
    </S.Container>
  );
};

export default EventPlaceStep;
