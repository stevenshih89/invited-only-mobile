import React from 'react';
import {Formik} from 'formik';
import useCreateEventFlowStep from './hooks/useCreateEventFlowStep';
import * as S from './CreateEvent.style';
import CreateEventFlowStepper from './Components/CreateEventFlowStepper/CreateEventFlowStepper';
import GuestInvitationStep from './Components/GuestInvitationStep/GuestInvitationStep';
import EventPlaceStep from './Components/EventPlaceStep/EventPlaceStep';
import PreviewEventStep from './Components/PreviewEventStep/PreviewEventStep';

import {handleNextStep, initialValues, validationSchema} from './CreateEvent.form';
import useCreateEvent from './hooks/useCreateEvent';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import {useAppNavigation, useNavigationState} from 'hooks/useAppNavigation';

export interface CreateEventFormValues {
  male: number;
  female: number;
  eventName: string;
  date: Date;
  hour: string;
  description: string;
  placeName: string;
  address: string;
  meetingSpot: string;
  photos: {
    main: string;
    photo2: string;
    photo3: string;
  };
}

const CreateEventFlow = () => {
  const {currentStep, nextStep, backStep} = useCreateEventFlowStep();
  const {createEvent, isLoading} = useCreateEvent();
  const {navigate} = useAppNavigation();
  const screens = useNavigationState(state => state.routes);
  console.log('screens', screens);
  return (
    <Formik<CreateEventFormValues>
      validationSchema={validationSchema}
      onSubmit={values => {
        createEvent(values);
      }}
      initialValues={initialValues}>
      {({submitForm, isSubmitting, values, validateForm}) => (
        <DefaultBackground>
          {isLoading || isSubmitting ? (
            <DefaultBackground>
              <S.CreatingEventText>Creating event...</S.CreatingEventText>
              <AppLoader />
            </DefaultBackground>
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
                  onPress={async () => {
                    handleNextStep({
                      currentStep,
                      nextStep,
                      submitForm,
                      validateForm,
                      values,
                    });
                  }}>
                  <S.ContinueButtonText>{currentStep === 3 ? 'Create Event' : 'Continue'}</S.ContinueButtonText>
                </S.ContinueButton>
              </S.ButtonsContainer>
            </S.Container>
          )}
        </DefaultBackground>
      )}
    </Formik>
  );
};

export default CreateEventFlow;
