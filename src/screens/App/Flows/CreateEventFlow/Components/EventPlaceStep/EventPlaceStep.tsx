import {View} from 'react-native';
import * as S from './GuestInvitationStep.style';
import {useFormikContext} from 'formik';
import {CreateEventFormValues} from '../../CreateEventFlow';

const GuestInvitationStep = () => {
  const {values, setFieldValue} = useFormikContext<CreateEventFormValues>();
  const {female, male} = values;

  const incrementFemale = () => setFieldValue('female', female + 1);
  const decrementFemale = () => female > 0 && setFieldValue('female', female - 1);

  const incrementMale = () => setFieldValue('male', male + 1);
  const decrementMale = () => male > 0 && setFieldValue('male', male - 1);

  return (
    <S.WrapperSelectYourDesiredCompany>
      <S.TextSelectYourDesiredCompany>How many Guests would you like to invite?</S.TextSelectYourDesiredCompany>
      <View>
        <View>
          <S.TextPersonGender>Woman</S.TextPersonGender>
          <S.RowButtons>
            <S.ButtonPress onPress={decrementFemale}>
              <S.TextButton>-</S.TextButton>
            </S.ButtonPress>
            <S.WrapperTextCount>
              <S.TextCount>{female}</S.TextCount>
            </S.WrapperTextCount>
            <S.ButtonPress onPress={incrementFemale}>
              <S.TextButton>+</S.TextButton>
            </S.ButtonPress>
          </S.RowButtons>
        </View>

        <S.RowMale>
          <S.TextPersonGender>Male</S.TextPersonGender>
          <S.RowButtons>
            <S.ButtonPress onPress={decrementMale}>
              <S.TextButton>-</S.TextButton>
            </S.ButtonPress>
            <S.WrapperTextCount>
              <S.TextCount>{male}</S.TextCount>
            </S.WrapperTextCount>

            <S.ButtonPress onPress={incrementMale}>
              <S.TextButton>+</S.TextButton>
            </S.ButtonPress>
          </S.RowButtons>
        </S.RowMale>
      </View>
    </S.WrapperSelectYourDesiredCompany>
  );
};
export default GuestInvitationStep;
import React from 'react';
import {TextInput, View} from 'react-native';
import {useFormikContext} from 'formik';
import * as S from './EventPlaceStep.style';
import {CreateEventFormValues} from '../../CreateEventFlow';

const EventPlaceStep = () => {
  const {values, handleChange, setFieldValue} = useFormikContext<CreateEventFormValues>();

  return (
    <S.Container>
      {/* Overview Card */}
      <S.Card>
        <S.CardTitle>Overview</S.CardTitle>

        {/* Event Name Field */}
        <S.FieldContainer>
          <S.FieldLabel>Event name</S.FieldLabel>
          <S.Input>
            <TextInput
              placeholder="Enter event name"
              placeholderTextColor="#767676"
              style={{color: '#FFFFFF', width: '100%', fontFamily: 'Satoshi'}}
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
              <TextInput
                placeholder="MM/DD/YY"
                placeholderTextColor="#767676"
                style={{color: '#FFFFFF', width: '100%', fontFamily: 'Satoshi'}}
                value={values.date}
                onChangeText={handleChange('date')}
              />
            </S.Input>
          </S.HalfFieldContainer>

          {/* Hour Field */}
          <S.HalfFieldContainer>
            <S.FieldLabel>Hour *</S.FieldLabel>
            <S.Input>
              <TextInput
                placeholder="00:00"
                placeholderTextColor="#767676"
                style={{color: '#FFFFFF', width: '100%', fontFamily: 'Satoshi'}}
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
            <TextInput
              placeholder="Enter description"
              placeholderTextColor="#767676"
              style={{color: '#FFFFFF', width: '100%', fontFamily: 'Satoshi'}}
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
            <TextInput
              placeholder="Enter place name"
              placeholderTextColor="#767676"
              style={{color: '#FFFFFF', width: '100%', fontFamily: 'Satoshi'}}
              value={values.placeName}
              onChangeText={handleChange('placeName')}
            />
          </S.Input>
        </S.FieldContainer>

        {/* Address Field */}
        <S.FieldContainer>
          <S.FieldLabel>Address *</S.FieldLabel>
          <S.Input>
            <TextInput
              placeholder="Enter address"
              placeholderTextColor="#767676"
              style={{color: '#FFFFFF', width: '100%', fontFamily: 'Satoshi'}}
              value={values.address}
              onChangeText={handleChange('address')}
            />
          </S.Input>
        </S.FieldContainer>

        {/* Meeting Spot Field */}
        <S.FieldContainer>
          <S.FieldLabel>Meeting spot</S.FieldLabel>
          <S.Input>
            <TextInput
              placeholder="Enter meeting spot"
              placeholderTextColor="#767676"
              style={{color: '#FFFFFF', width: '100%', fontFamily: 'Satoshi'}}
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
