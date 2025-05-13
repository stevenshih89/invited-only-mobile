import * as Yup from 'yup';
import { FormikErrors } from 'formik';
import { components } from '@invited-only/invited-only-api';
import { showToast } from 'helpers/showToast';

// Define step-specific schema

export const initialValues: Partial<components['schemas']['EventData']> = {
  femaleFriend: 0,
  maleFriend: 0,
  name: '',
  date: '',
  hour: '',
  description: '',
  placeName: '',
  address: '',
  meetingSpot: '',
  photos: [],
};

export const guestStepSchema = Yup.object<Partial<components['schemas']['EventData']>>()
  .shape({
    femaleFriend: Yup.number().min(0).required(),
    maleFriend: Yup.number().min(0).required(),
  })
  .test('at-least-one-guest', 'At least one guest (male or female) is required', function (values) {
    return values.maleFriend > 0 || values.femaleFriend > 0;
  });

export const placeStepSchema = Yup.object<Partial<components['schemas']['EventData']>>().shape({
  name: Yup.string().required('Event name is required'),
  date: Yup.string().required('Date is required'),
  description: Yup.string().required('Description is required'),
  hour: Yup.string().required('Hour is required'),
  placeName: Yup.string().required('Place name is required'),
  address: Yup.string().required('Address is required'),
});

export const photoStepSchema = Yup.object<Partial<components['schemas']['EventData']>>().shape({
  photos: Yup.array().of(Yup.object().shape({
    image: Yup.string().required('Main photo is required'),
  })).required('Main photo is required'),
});

export const validationSchema = Yup.object<Partial<components['schemas']['EventData']>>().concat(guestStepSchema).concat(placeStepSchema).concat(photoStepSchema);


export const handleNextStep = async ({
  currentStep,
  validateForm,
  submitForm,
  values,
  nextStep,
}: {
  currentStep: number;
  validateForm: (values?: any) => Promise<FormikErrors<Partial<components['schemas']['EventData']>>>;
  submitForm: any;
  values: Partial<components['schemas']['EventData']>;
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
      await guestStepSchema.validate(values, { abortEarly: false });
      nextStep();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        showToast('cancel', error.errors[0]);
      }
    }
  } else if (currentStep === 2) {
    // Validate place step
    try {
      await placeStepSchema.validate(values, { abortEarly: false });
      await photoStepSchema.validate(values, { abortEarly: false });
      nextStep();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        showToast('cancel', error.errors[0]);
      }
    }
  }
};
