import {useFormikContext} from 'formik';
import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {components} from '@invited-only/invited-only-api';

const useAddModalPhotos = () => {
    const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(null);
    const [tempPhotosStorage, setTempPhotosStorage] = useState<string[]>([]);

    const {values, setFieldValue, setFieldTouched} = useFormikContext<Partial<components['schemas']['EventData']>>();

    const handlePhotoAdded = (index: number, photo: string) => {
        setFieldValue(`photos[${index}].image`, photo);
        setFieldTouched(`photos[${index}].image`, true);
        const photosList = [...tempPhotosStorage];
        photosList[index] = photo;

        setTempPhotosStorage(photosList);
    };

    const handleOpenPhotoModal = (index: number) => {
        setCurrentPhotoIndex(index);
        setIsPhotoModalVisible(true);
    };

    const handleOpenCropper = async (index: number) => {
        setCurrentPhotoIndex(index);
        const photoUrl = values.photos?.[index]?.image || '';
        if (!photoUrl) return;

        try {
            const image = await ImagePicker.openCropper({
                path: photoUrl,
                width: 600,
                height: 800,
                cropping: true,
                mediaType: 'photo',
            });

            if (image?.path) {
                handlePhotoAdded(index, image.path);
                setIsPhotoModalVisible(false);
            }
        } catch (error) {
            console.error('Error opening cropper:', error);
        }
    };

    const handleOpenCamera = async () => {
        try {
            const image = await ImagePicker.openCamera({
                width: 600,
                height: 800,
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
                width: 600,
                height: 800,
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
        handleOpenCropper,
        tempPhotosStorage,
        isPhotoModalVisible,
    };
};
export default useAddModalPhotos;
