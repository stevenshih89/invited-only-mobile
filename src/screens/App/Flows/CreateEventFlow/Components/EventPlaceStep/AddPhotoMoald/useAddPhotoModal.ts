import {useFormikContext} from 'formik';
import {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CreateEventFormValues} from '../../../CreateEventFlow';

const useAddModalPhotos = () => {
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(null);

  const {setFieldValue} = useFormikContext<CreateEventFormValues>();

  const handlePhotoAdded = (index: number, photo: string) => {
    if (index === 1) {
      setFieldValue('photos.main', photo);
    }
    if (index === 2) {
      setFieldValue('photos.photo2', photo);
    }
    if (index === 3) {
      setFieldValue('photos.photo3', photo);
    }
  };

  const handleOpenPhotoModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsPhotoModalVisible(true);
  };

  const handleOpenCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets.length > 0 && currentPhotoIndex !== null) {
      const photoUri = result.assets[0].uri;
      if (photoUri) {
        handlePhotoAdded(currentPhotoIndex, photoUri);

        setIsPhotoModalVisible(false);
      }
    }
  };
  const handleOpenLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets.length > 0 && currentPhotoIndex !== null) {
      const photoUri = result.assets[0].uri;
      console.log(photoUri, currentPhotoIndex);

      if (photoUri) {
        handlePhotoAdded(currentPhotoIndex, photoUri);

        setIsPhotoModalVisible(false);
      }
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
