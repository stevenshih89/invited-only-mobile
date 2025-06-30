import React, {FC, useState} from 'react';
import {useFormikContext} from 'formik';
import LinearGradient from 'react-native-linear-gradient';

import {components} from '@invited-only/invited-only-api';
import {FlatList, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {RFValue} from 'react-native-responsive-fontsize';
import * as S from './EventPlaceStep.style';
import EventDatePicker from './EventDatePicker/EventDatePicker';
import {useEventType} from './hooks/useEventType';
import Check from 'src/assets/images/icons/Check-black.svg';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';

interface EventPlaceStepProps {
    handleNextStep: () => void;
    handleBackStep: () => void;
}

const EventPlaceStep: FC<EventPlaceStepProps> = ({handleNextStep, handleBackStep}) => {
    const {values, setFieldValue, errors, touched, setFieldTouched} = useFormikContext<Partial<components['schemas']['EventData']>>();
    const [confirmRealEvent, setConfirmRealEvent] = useState(false);

    const {listOfEventTypes} = useEventType();

    return (
        <S.Container>
            <LinearGradient
                colors={['black', 'transparent']}
                style={{position: 'absolute', top: 0, left: 0, right: 0, height: 20, zIndex: 1}}
                pointerEvents="none"
            />
            <LinearGradient
                colors={['transparent', 'black']}
                style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 20, zIndex: 1}}
                pointerEvents="none"
            />
            <S.ScrollContainer>
                <S.FieldContainer>
                    <View
                        style={{
                            paddingLeft: 28,
                        }}>
                        <S.FieldLabel>Event type</S.FieldLabel>
                    </View>
                    <FlatList
                        data={listOfEventTypes}
                        horizontal
                        contentContainerStyle={{paddingHorizontal: 28}}
                        ItemSeparatorComponent={() => <View style={{width: 8}} />}
                        renderItem={({item, index}) => (
                            <S.RoundedTextViewContainer
                                key={index}
                                onPress={() => {
                                    setFieldValue('eventType', item.id);
                                    setFieldTouched('eventType', true);
                                }}
                                isActive={values?.eventType === item.id}>
                                <S.EventTypeImageRoundSmall source={item.image} />
                                <S.WhiteTextInfo>{item.title}</S.WhiteTextInfo>
                                {values?.eventType === item.id && (
                                    <View
                                        style={{
                                            borderRadius: 100,
                                            backgroundColor: whiteColor,
                                            width: 16,
                                            height: 16,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Check width={10} height={10} />
                                    </View>
                                )}
                            </S.RoundedTextViewContainer>
                        )}
                    />
                </S.FieldContainer>
                <View style={{paddingHorizontal: 28, gap: 32, marginTop: 32, flex: 1}}>
                    <S.FieldContainer>
                        <S.FieldLabel>Place name *</S.FieldLabel>
                        <S.Input>
                            <S.StyledTextInput
                                placeholder="Enter place name"
                                placeholderTextColor="#767676"
                                value={values.placeName}
                                onChangeText={(value: string) => {
                                    setFieldValue('placeName', value);
                                    setFieldValue('name', value);
                                }}
                                onBlur={() => setFieldTouched('placeName', true)}
                            />
                        </S.Input>
                        {touched.placeName && errors.placeName && <S.ErrorText>{errors.placeName}</S.ErrorText>}
                    </S.FieldContainer>
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
                    <EventDatePicker />
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

                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                        <CheckBox
                            value={confirmRealEvent}
                            onValueChange={() => setConfirmRealEvent(!confirmRealEvent)}
                            style={{
                                transform: [{scaleX: 0.75}, {scaleY: 0.75}],
                            }}
                            boxType="square"
                            tintColor={whiteColor}
                            onFillColor={whiteColor}
                            onTintColor={whiteColor}
                            onCheckColor={blackColor}
                        />
                        <Text
                            style={{
                                color: 'rgba(255, 255, 255, 0.64)',
                                fontFamily: Satoshi400,
                                fontSize: RFValue(16, 932),
                                width: '85%',
                            }}>
                            I confirm this event is real, accurate, and genuine. I understand the risk of removal if info is false.
                        </Text>
                    </View>
                    <S.ButtonsContainer>
                        <S.CancelButton onPress={handleBackStep}>
                            <S.CancelButtonText>Back</S.CancelButtonText>
                        </S.CancelButton>
                        <S.ContinueButton disabled={!confirmRealEvent} onPress={handleNextStep}>
                            <S.ContinueButtonText>{'Continue'}</S.ContinueButtonText>
                        </S.ContinueButton>
                    </S.ButtonsContainer>
                </View>
            </S.ScrollContainer>
        </S.Container>
    );
};

export default EventPlaceStep;
