import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import React from 'react';
import {Formik} from 'formik';
import useCreateEventFlowStep from './hooks/useCreateEventFlowStep';
import * as S from './CreateEvent.style';
import CreateEventFlowStepper from './Components/CreateEventFlowStepper/CreateEventFlowStepper';
import GuestInvitationStep from './Components/GuestInvitationStep/GuestInvitationStep';
import EventPlaceStep from './Components/EventPlaceStep/EventPlaceStep';

export interface CreateEventFormValues {
  male: number;
  female: number;
  eventName: string;
  date: string;
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

  return (
    <Formik<CreateEventFormValues>
      onSubmit={() => {}}
      initialValues={{
        female: 0,
        male: 0,
        eventName: '',
        date: '',
        hour: '',
        description: '',
        placeName: '',
        address: '',
        meetingSpot: '',
        photos: {
          main: '',
          photo2: '',
          photo3: '',
        },
      }}>
      <DefaultBackground>
        <S.Container>
          <S.StepsContainer>
            <CreateEventFlowStepper currentStep={currentStep} />
            {currentStep === 1 && <GuestInvitationStep />}
            {currentStep === 2 && <EventPlaceStep />}
          </S.StepsContainer>
          <S.ButtonsContainer>
            {currentStep !== 1 && (
              <S.CancelButton onPress={backStep}>
                <S.CancelButtonText>Cancel</S.CancelButtonText>
              </S.CancelButton>
            )}
            <S.ContinueButton onPress={nextStep}>
              <S.ContinueButtonText>Continue</S.ContinueButtonText>
            </S.ContinueButton>
          </S.ButtonsContainer>
        </S.Container>
      </DefaultBackground>
    </Formik>
  );
};

export default CreateEventFlow;
