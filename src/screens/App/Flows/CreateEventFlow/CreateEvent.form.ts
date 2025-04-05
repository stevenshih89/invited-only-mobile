import * as Yup from 'yup';
import {CreateEventFormValues} from './CreateEventFlow';
import {FormikErrors} from 'formik';
import {showToast} from 'helpers/showToast';

// Define step-specific schemas
export const guestStepSchema = Yup.object()
  .shape({
    female: Yup.number().min(0).required(),
    male: Yup.number().min(0).required(),
  })
  .test('at-least-one-guest', 'At least one guest (male or female) is required', function (values) {
    return values.male > 0 || values.female > 0;
  });

export const placeStepSchema = Yup.object().shape({
  eventName: Yup.string().required('Event name is required'),
  date: Yup.string().required('Date is required'),
  hour: Yup.string().required('Hour is required'),
  placeName: Yup.string().required('Place name is required'),
  address: Yup.string().required('Address is required'),
});

export const photoStepSchema = Yup.object().shape({
  photos: Yup.object().shape({
    main: Yup.string().required('Main photo is required'),
  }),
});

export const validationSchema = Yup.object().concat(guestStepSchema).concat(placeStepSchema).concat(photoStepSchema);

export const initialValues = {
  female: 0,
  male: 0,
  eventName: '',
  date: new Date(),
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
};

export const handleNextStep = async ({
  currentStep,
  validateForm,
  submitForm,
  values,
  nextStep,
}: {
  currentStep: number;
  validateForm: (values?: any) => Promise<FormikErrors<CreateEventFormValues>>;
  submitForm: any;
  values: CreateEventFormValues;
  nextStep: () => void;
}) => {
  if (currentStep === 3) {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      submitForm();
    } else {
      showToast('cancel', 'Please fix all errors before creating the event');
    }
  } else if (currentStep === 1) {
    // Validate guest step
    try {
      await guestStepSchema.validate(values, {abortEarly: false});
      nextStep();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        showToast('cancel', error.errors[0]);
      }
    }
  } else if (currentStep === 2) {
    // Validate place step
    try {
      await placeStepSchema.validate(values, {abortEarly: false});
      await photoStepSchema.validate(values, {abortEarly: false});
      nextStep();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        showToast('cancel', error.errors[0]);
      }
    }
  }
};
