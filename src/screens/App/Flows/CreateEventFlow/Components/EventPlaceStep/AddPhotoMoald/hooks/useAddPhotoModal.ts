import { useFormikContext } from 'formik';
import { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { components } from '@invited-only/invited-only-api';


const useAddModalPhotos = () => {
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(null);

  const { setFieldValue, setFieldTouched } = useFormikContext<Partial<components['schemas']['EventData']>>();

  const handlePhotoAdded = (index: number, photo: string) => {
    if (index === 1) {
      setFieldValue('photos[0].image', photo);
      setFieldTouched('photos[0].image', true);
    }
    if (index === 2) {
      setFieldValue('photos[1].image', photo);
      setFieldTouched('photos[1].image', true);
    }
    if (index === 3) {
      setFieldValue('photos[2].image', photo);
      setFieldTouched('photos[2].image', true);
    }
  };

  const handleOpenPhotoModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsPhotoModalVisible(true);
  };

  const handleOpenCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
      });

      if (image?.path && currentPhotoIndex !== null) {
        const photoUri = image.path;
        if (photoUri) {
          handlePhotoAdded(currentPhotoIndex, photoUri);
          setIsPhotoModalVisible(false);
        }
      }
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  };

  const handleOpenLibrary = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
        multiple: false,
      });

      if (image?.path && currentPhotoIndex !== null) {
        const photoUri = image.path;
        if (photoUri) {
          handlePhotoAdded(currentPhotoIndex, photoUri);
          setIsPhotoModalVisible(false);
        }
      }
    } catch (error) {
      console.error('Error opening library:', error);
    }
  };

  const handleAddPlaceholderPhoto = () => {
    if (currentPhotoIndex !== null) {
      // Use a placeholder image URL or local asset
      const placeholderUri = 'https://via.placeholder.com/300';
      handlePhotoAdded(currentPhotoIndex, placeholderUri);

      setIsPhotoModalVisible(false);
    }
  };

  return {
    closeModal: () => {
      setIsPhotoModalVisible(false);
    },
    handleAddPlaceholderPhoto,
    handleOpenLibrary,
    handleOpenCamera,
    handleOpenPhotoModal,
    isPhotoModalVisible,
  };
};
export default useAddModalPhotos;
