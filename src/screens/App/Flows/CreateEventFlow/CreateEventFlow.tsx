import React, { useContext } from 'react';
import { Formik } from 'formik';
import { components } from '@invited-only/invited-only-api';
import useCreateEventFlowStep from './hooks/useCreateEventFlowStep';
import * as S from './CreateEvent.style';
import CreateEventFlowStepper from './Components/CreateEventFlowStepper/CreateEventFlowStepper';
import GuestInvitationStep from './Components/GuestInvitationStep/GuestInvitationStep';
import EventPlaceStep from './Components/EventPlaceStep/EventPlaceStep';
import PreviewEventStep from './Components/PreviewEventStep/PreviewEventStep';

import { handleNextStep, initialValues, validationSchema } from './CreateEvent.form';
import useCreateEvent from './hooks/useCreateEvent';
import DeleteEventModal from './Components/DeleteEventModal/DeleteEventModal';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import { DeleteModalContext } from 'navigator/AppStackScreens/AppStackScreens';


const CreateEventFlow = ({ route }: { route: any }) => {
  const { currentStep, nextStep, backStep } = useCreateEventFlowStep();
  const { createEvent, isLoading, updateEvent } = useCreateEvent();
  const isEditing = route.params?.isEditing;
  const event = route.params?.event;
  const [isDeleteEventModalVisible, setDeleteEventModalVisible] = useContext(DeleteModalContext) || [false, () => { }];

  return (
    <Formik<Partial<components['schemas']['EventData']>>
      validationSchema={validationSchema}
      onSubmit={values => {
        if (isEditing) {
          updateEvent(values);
        } else {
          createEvent(values);
        }
      }}
      initialValues={isEditing ? route.params.event : initialValues}>
      {({ submitForm, isSubmitting, values, validateForm }) => (
        <DefaultBackground>
          {isLoading || isSubmitting ? (
            <S.Container>
              <AppLoader />
            </S.Container>
          ) : (
            <S.Container>
              <S.StepsContainer>
                <CreateEventFlowStepper currentStep={currentStep} />
                {currentStep === 1 && <GuestInvitationStep />}
                {currentStep === 2 && <EventPlaceStep />}
                {currentStep === 3 && <PreviewEventStep />}
              </S.StepsContainer>
              <S.ButtonsContainer>
                {currentStep !== 1 && (
                  <S.CancelButton onPress={backStep}>
                    <S.CancelButtonText>Cancel</S.CancelButtonText>
                  </S.CancelButton>
                )}
                <S.ContinueButton
                  disabled={isSubmitting}
                  onPress={async () => {
                    handleNextStep({
                      currentStep,
                      nextStep,
                      submitForm,
                      validateForm,
                      values,
                    });
                  }}>
                  <S.ContinueButtonText>{currentStep === 3 ? isEditing ? 'Update Event' : 'Create Event' : 'Continue'}</S.ContinueButtonText>
                </S.ContinueButton>
              </S.ButtonsContainer>
            </S.Container>
          )}
          {isDeleteEventModalVisible && <DeleteEventModal isVisible={isDeleteEventModalVisible} onClose={() => setDeleteEventModalVisible(false)} eventId={event?.uid} />}
        </DefaultBackground>
      )}
    </Formik>
  );
};

export default CreateEventFlow;
