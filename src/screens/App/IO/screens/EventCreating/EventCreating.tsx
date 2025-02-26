import React, { useEffect } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useStyles from 'screens/App/IO/screens/EventCreating/styles.ts';
import {blackColor, grayScale700, lightGray2Color, whiteColor} from 'constants/colors.ts';
import InvitedOnly from 'screens/App/IO/screens/EventCreating/components/InvitedOnly/InvitedOnly.tsx';
import TrashCanIcon from 'assets/images/icons/trash.svg'
import EventDetails from 'screens/App/IO/screens/EventCreating/components/EventDetails/EventDetails.tsx';
import ModalSaveEventChanges from 'screens/App/MyEvents/EventEditing/ModalSaveEventChanges';
import ModalCancelEvent from 'screens/App/MyEvents/EventEditing/ModalCancelEvent';
import {screenWidth} from 'constants/common';
import {Satoshi500} from 'constants/fonts';
import EventPreview from 'components/TouchingSlider/components/EventPreview';
import Check from 'src/assets/images/icons/Check-black.svg';
import {eventTypes} from 'src/mocks/eventTypes';
import HintCard from 'components/HintCard';
import {hostHintSteps} from 'constants/hints.ts';
import { useEventCreating } from 'hooks/useEventCreating';

const EventCreating = () => {

  const {
    isEditing,
        navigation,
        setIsVisibleCancelModal,
        isDemo,
        hintStep,
        currentCreateStep,
        handleSkipHints,
        setHintStep,
        handlePreviousStep,
        tabState,
        setMaleFriend,
        setFemaleFriend,
        female,
        femaleFriend,
        male,
        setMale,
        maleFriend,
        setFemale,
        setTabState,
        editingItems,
        setIsVisibleSaveModal,
        setCurrentCreateStap,
        isEditingItem,
        setMainImage,
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
        handleCreateEvent,
        loaderVisible,
        handleSaveChanges,
        isVisibleSaveModal,
        isVisibleCancelModal,
  } = useEventCreating()

  const styles = useStyles();

  useEffect(() => {
    if (isEditing) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setIsVisibleCancelModal(true)}>
            <TrashCanIcon style={{marginHorizontal: 20, marginVertical: 10}} />
          </TouchableOpacity>
        ),
      });
    }
        }, []);

  return (
    <>
      <View style={styles.container}>
        {isDemo && <View style={styles.overlayContainer} />}
        <View
          style={{
            ...styles.wrapperTabSelections,
            zIndex: isDemo && (hintStep === 1 || hintStep === 3) ? 1111 : 1,
          }}>
          <View style={{width: '100%', marginVertical: 24}}>
            <View style={{position: 'relative', alignItems: 'center', width: '100%'}}>
              <View
                style={{
                  height: 2,
                  width: screenWidth - 48 - 32,
                  backgroundColor: grayScale700,
                  position: 'absolute',
                  top: 16,
                }}
              />
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      height: 32,
                      width: 32,
                      backgroundColor: whiteColor,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {currentCreateStep === 1 ? (
                      <Text style={{fontSize: 16, fontFamily: Satoshi500, textAlign: 'center'}}>1</Text>
                    ) : (
                      <Check />
                    )}
                  </View>
                  <Text
                    style={{
                      color: currentCreateStep === 1 ? whiteColor : grayScale700,
                      fontFamily: Satoshi500,
                      fontSize: 12,
                      marginTop: 8,
                    }}>
                    Guests
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      height: 32,
                      width: 32,
                      backgroundColor: currentCreateStep === 2 || currentCreateStep > 2 ? whiteColor : lightGray2Color,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {currentCreateStep === 2 || currentCreateStep < 2 ? (
                      <Text
                        style={{
                          color: currentCreateStep === 2 ? blackColor : whiteColor,
                          fontSize: 16,
                          fontFamily: Satoshi500,
                          textAlign: 'center',
                        }}>
                        2
                      </Text>
                    ) : (
                      <Check />
                    )}
                  </View>
                  <Text
                    style={{
                      color: currentCreateStep === 2 ? whiteColor : grayScale700,
                      fontFamily: Satoshi500,
                      fontSize: 12,
                      marginTop: 8,
                    }}>
                    Place
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      height: 32,
                      width: 32,
                      backgroundColor: currentCreateStep === 3 ? whiteColor : lightGray2Color,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: currentCreateStep === 3 ? blackColor : whiteColor,
                        fontSize: 16,
                        fontFamily: Satoshi500,
                        textAlign: 'center',
                      }}>
                      3
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: currentCreateStep === 3 ? whiteColor : grayScale700,
                      fontFamily: Satoshi500,
                      fontSize: 12,
                      marginTop: 8,
                    }}>
                    Preview
                  </Text>
                </View>
              </View>
              {isDemo && (hintStep === 1 || hintStep === 3) && (
                <View style={styles.step1HintContainer}>
                  <HintCard
                    currentStep={hintStep}
                    description={hostHintSteps[hintStep - 1]?.description}
                    onSkipAction={handleSkipHints}
                    onStepChange={setHintStep}
                    onPreviousAction={handlePreviousStep}
                    totalSteps={hostHintSteps.length}
                    directionHorizontal={hintStep === 3 ? 'center' : 'start'}
                    title={hostHintSteps[hintStep - 1]?.title}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        {tabState === 'invitedOnly' && (
          <InvitedOnly
            setMaleFriend={setMaleFriend}
            setFemaleFriend={setFemaleFriend}
            female={female}
            femaleFriend={femaleFriend}
            male={male}
            maleFriend={maleFriend}
            setMale={setMale}
            setFemale={setFemale}
            setTabState={setTabState}
            isEditing={isEditing}
            {...editingItems}
            setIsVisibleSaveModal={setIsVisibleSaveModal}
            setCurrentCreateStap={setCurrentCreateStap}
          />
        )}
        {tabState === 'eventDetails' && (
          <EventDetails
            female={female}
            femaleFriend={femaleFriend}
            male={male}
            maleFriend={maleFriend}
            isEditing={isEditing}
            id={isEditingItem?.id}
            {...editingItems}
            setIsVisibleSaveModal={setIsVisibleSaveModal}
            setTabState={setTabState}
            setMainImage={setMainImage}
            setCurrentCreateStap={setCurrentCreateStap}
            photos={photos}
            setImages={setImages}
            activeType={activeType}
            setActiveType={setActiveType}
            placeName={placeName}
            setPlaceName={setPlaceName}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            datePicker={datePicker}
            setDatePicker={setDatePicker}
            hourPicker={hourPicker}
            setHourPicker={setHourPicker}
            date={date}
            setDate={setDate}
            hour={hour}
            setHour={setHour}
            address={address}
            setAddress={setAddress}
            meetingSpot={meetingSpot}
            setMeetingSpot={setMeetingSpot}
            loading={loading}
            setLoading={setLoading}
            open={open}
            setOpen={setOpen}
            openHour={openHour}
            setOpenHour={setOpenHour}
            userHost={userHost}
          />
        )}
        {tabState === 'eventPreview' && (
          <EventPreview
            isEditing={isEditing}
            id={isEditingItem?.id}
            eventTypes={eventTypes}
            description={description}
            hour={hour}
            address={address}
            meetingSpot={meetingSpot}
            photos={photos}
            date={date}
            girls={female}
            male={male}
            placeName={placeName}
            setCurrentCreateStap={setCurrentCreateStap}
            setTabState={setTabState}
            handleCreateEvent={handleCreateEvent}
            name={name}
            setIsVisibleSaveModal={setIsVisibleSaveModal}
            loaderVisible={loaderVisible}
            isReview={isEditingItem?.eventReviewed}
          />
        )}
      </View>
      <ModalSaveEventChanges
        handleSaveChanges={handleSaveChanges}
        isVisible={isVisibleSaveModal}
        onClose={() => setIsVisibleSaveModal(false)}
      />
      <ModalCancelEvent
        id={isEditingItem?.id}
        image={isEditingItem?.photos[0]?.image}
        isVisible={isVisibleCancelModal}
        onClose={() => setIsVisibleCancelModal(false)}
      />
    </>
  );
};

export default EventCreating;
