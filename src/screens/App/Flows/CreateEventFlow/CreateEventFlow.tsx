import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import React from 'react';
import {Formik} from 'formik';
import useCreateEventFlowStep from './hooks/useCreateEventFlowStep';
import * as S from './CreateEvent.style';
import CreateEventFlowStepper from './Components/CreateEventFlowStepper/CreateEventFlowStepper';
import GuestInvitationStep from './Components/GuestInvitationStep/GuestInvitationStep';

export interface CreateEventFormValues {
  male: number;
  female: number;
}

const CreateEventFlow = () => {
  const {currentStep, nextStep, backStep} = useCreateEventFlowStep();

  return (
    <Formik<CreateEventFormValues>
      onSubmit={() => {}}
      initialValues={{
        female: 0,
        male: 0,
      }}>
      <DefaultBackground>
        <S.Container>
          <S.StepsContainer>
            <CreateEventFlowStepper currentStep={currentStep} />
            {currentStep === 1 && <GuestInvitationStep />}
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
