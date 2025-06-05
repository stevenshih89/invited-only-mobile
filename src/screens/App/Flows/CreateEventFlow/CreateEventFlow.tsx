import React, {useContext} from 'react';
import {Formik} from 'formik';
import {components} from '@invited-only/invited-only-api';
import * as S from './CreateEvent.style';

import {handleNextStep, initialValues, validationSchema} from './CreateEvent.form';
import useCreateEvent from './hooks/useCreateEvent';
import DeleteEventModal from './Components/DeleteEventModal/DeleteEventModal';
import {CreateEventFlowNavigator} from './navigation/CreateEventFlowNavigator';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import {DeleteModalContext} from 'navigator/AppStackScreens/AppStackScreens';

const CreateEventFlow = ({route}: {route: any}) => {
  const {createEvent, isLoading, updateEvent} = useCreateEvent();
  const isEditing = route.params?.isEditing;
  const event = route.params?.event;
  const [isDeleteEventModalVisible, setDeleteEventModalVisible] = useContext(DeleteModalContext) || [false, () => {}];

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
      {({submitForm, isSubmitting, values, validateForm}) => (
        <DefaultBackground>
          {isLoading || isSubmitting ? (
            <S.Container>
              <AppLoader />
            </S.Container>
          ) : (
            <CreateEventFlowNavigator
              handleNextStep={({currentStep, nextStep}) =>
                handleNextStep({
                  currentStep,
                  nextStep,
                  submitForm,
                  validateForm,
                  values,
                })
              }
              isEditing={isEditing}
            />
          )}
          {isDeleteEventModalVisible && (
            <DeleteEventModal
              isVisible={isDeleteEventModalVisible}
              onClose={() => setDeleteEventModalVisible(false)}
              eventId={event?.uid}
            />
          )}
        </DefaultBackground>
      )}
    </Formik>
  );
};

export default CreateEventFlow;
