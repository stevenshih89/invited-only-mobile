import { useRef, useState } from 'react';
import { Alert, Animated } from 'react-native';
import Config from 'react-native-config';
import { check, Permission, PERMISSIONS, PermissionStatus, request, RESULTS } from 'react-native-permissions';
import firestore from '@react-native-firebase/firestore';
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { components } from 'src/api/v1';
import useUser from 'src/hooks/user/useUser';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import { showToast } from 'helpers/showToast';
import { isIos } from 'constants/common';

// Define a type for the layout objects
interface ImageLayout {
  imageId: number;
  x: number;
  y: number;
}

export const useMyPhotos = ({ images, setImages }: { images: any; setImages: any }) => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const { user: userHost } = useUser();
  const isConfirmed = userHost?.accountConfirmed;
  const [visibleModalReplace, setVisibleModalReplace] = useState(false);
  const makePermissionsRequest = async (permission: Permission): Promise<PermissionStatus> => {
    const result = await check(permission);
    switch (result) {
      case RESULTS.DENIED: {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.BLOCKED) {
          Alert.alert('Permission not granted');
        }
        return requestResult;
      }
      case RESULTS.BLOCKED:
        Alert.alert('Permission not granted');
        break;
    }

    return result;
  };

  const openLibrary = async (imageId: number): Promise<void> => {
    const photoLibraryPermission = await makePermissionsRequest(
      isIos ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    );

    if (photoLibraryPermission !== RESULTS.GRANTED && photoLibraryPermission !== RESULTS.LIMITED) {
      return;
    }

    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
      });

      const newImages = [...images, { id: imageId, image: image.path }];
      setImages(newImages);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const deleteImage = (imageId: number): void => {
    const newImages = images.filter((img: components['schemas']['UserPhoto']) => img.id !== imageId);
    setImages(newImages);
  };

  const replaceImage = async () => {
    if (!userHost?.uid) return;
    if (selectImage && activeImage) {
      try {
        const getDoc = await firestore().collection(apiUserInfoCollection).doc(userHost.uid).get();
        const data = getDoc.data();
        const photos = data?.photos;
        if ((activeImage === 1 && !photos[selectImage - 1].image) || (selectImage === 1 && !photos[activeImage - 1].image)) {
          showToast('inviteMatch', 'You cannot change the main image to an empty one', 'Error');
          setVisibleModalReplace(false);
          setActiveImage(0);
          setSelectImage(0);
          return;
        }
        const temp = photos[activeImage - 1].image;
        photos[activeImage - 1].image = photos[selectImage - 1].image;
        photos[selectImage - 1].image = temp;

        setVisibleModalReplace(false);
        setActiveImage(0);
        setSelectImage(0);
        showToast('inviteMatch', 'Image successfully replaced', 'Success');
      } catch (error) {
        logErrorToSentry(error);
        setVisibleModalReplace(false);
        setActiveImage(0);
        setSelectImage(0);
      }
    }
  };

  const mainImage = images[images.findIndex((item: components['schemas']['UserPhoto']) => item.id === 1)];

  const secondImage = images[images.findIndex((item: components['schemas']['UserPhoto']) => item.id === 2)];

  const thirdImage = images[images.findIndex((item: components['schemas']['UserPhoto']) => item.id === 3)];

  const fourthImage = images[images.findIndex((item: components['schemas']['UserPhoto']) => item.id === 4)];

  const fifthImage = images[images.findIndex((item: components['schemas']['UserPhoto']) => item.id === 5)];

  const sixthImage = images[images.findIndex((item: components['schemas']['UserPhoto']) => item.id === 6)];

  const viewRef1 = useRef(null);
  const viewRef2 = useRef(null);
  const viewRef3 = useRef(null);
  const viewRef4 = useRef(null);
  const viewRef5 = useRef(null);
  const viewRef6 = useRef(null);

  // Apply the type to the layout state
  const [layout, setLayout] = useState<ImageLayout[]>([]);

  const [activeImage, setActiveImage] = useState(0);

  const [selectImage, setSelectImage] = useState<number>(0);

  const offsetX1 = useSharedValue<number>(0);
  const offsetY1 = useSharedValue<number>(0);

  const offsetX2 = useSharedValue<number>(0);
  const offsetY2 = useSharedValue<number>(0);

  const offsetX3 = useSharedValue<number>(0);
  const offsetY3 = useSharedValue<number>(0);

  const offsetX4 = useSharedValue<number>(0);
  const offsetY4 = useSharedValue<number>(0);

  const offsetX5 = useSharedValue<number>(0);
  const offsetY5 = useSharedValue<number>(0);

  const offsetX6 = useSharedValue<number>(0);
  const offsetY6 = useSharedValue<number>(0);

  const MIN_DISTANCE_THRESHOLD = 50;

  const handleChange = (offsetX: number, offsetY: number, imageId: number) => {
    // Use the defined type here
    const activeItem = layout.find((item: ImageLayout) => item.imageId === imageId);

    if (!activeItem) {
      return;
    }

    const activeItemPositionX = activeItem.x + offsetX;
    const activeItemPositionY = activeItem.y + offsetY;

    const initialDistance = Math.sqrt(Math.pow(activeItem.x - activeItemPositionX, 2) + Math.pow(activeItem.y - activeItemPositionY, 2));

    if (initialDistance < MIN_DISTANCE_THRESHOLD) {
      setSelectImage(0);
      return;
    }

    let closestImageId = imageId;
    let minDistance = Infinity;

    // Use the defined type here
    layout.forEach((item: ImageLayout) => {
      if (item.imageId !== imageId) {
        const distance = Math.sqrt(Math.pow(item.x - activeItemPositionX, 2) + Math.pow(item.y - activeItemPositionY, 2));

        if (distance < minDistance) {
          minDistance = distance;
          closestImageId = item.imageId;
        }
      }
    });
    setSelectImage(closestImageId);
  };

  const createTapGesture = (imageId: number, offsetX: Animated.SharedValue<number>, offsetY: Animated.SharedValue<number>) => {
    return Gesture.Pan()
      .onBegin(() => {
        runOnJS(setActiveImage)(imageId);
      })
      .onChange(event => {
        offsetX.value = event.translationX;
        offsetY.value = event.translationY;
        runOnJS(handleChange)(offsetX.value, offsetY.value, imageId);
      })
      .onFinalize(() => {
        offsetX.value = withSpring(0);
        offsetY.value = withSpring(0);
        // runOnJS(replaceImage)();
        if (selectImage) {
          runOnJS(setVisibleModalReplace)(true);
        } else {
          runOnJS(setActiveImage)(0);
          runOnJS(setSelectImage)(0);
        }
      });
  };

  const createAnimatedStyle = (offsetX: Animated.SharedValue<number>, offsetY: Animated.SharedValue<number>, id: number) =>
    useAnimatedStyle(() => ({
      transform: [
        { translateX: offsetX.value },
        { translateY: offsetY.value },
        {
          scale: withSpring(activeImage === 0 || activeImage === id ? 1 : selectImage === id ? 1 : 0.8, { damping: 15, stiffness: 100 }),
        },
      ],
    }));

  const animatedStyles1 = createAnimatedStyle(offsetX1, offsetY1, 1);
  const animatedStyles2 = createAnimatedStyle(offsetX2, offsetY2, 2);
  const animatedStyles3 = createAnimatedStyle(offsetX3, offsetY3, 3);
  const animatedStyles4 = createAnimatedStyle(offsetX4, offsetY4, 4);
  const animatedStyles5 = createAnimatedStyle(offsetX5, offsetY5, 5);
  const animatedStyles6 = createAnimatedStyle(offsetX6, offsetY6, 6);

  const handleLayout = (imageId: number) => {
    const viewRefs = [viewRef1, viewRef2, viewRef3, viewRef4, viewRef5, viewRef6];

    const ref = viewRefs[imageId - 1] as any;

    if (ref && ref.current) {
      ref.current.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        setLayout(prev => [...prev, { imageId, x: pageX, y: pageY, width, height }]);
      });
    }
  };

  return {
    visibleModalReplace,
    setVisibleModalReplace,
    replaceImage,
    isConfirmed,
    createTapGesture,
    offsetX1,
    offsetY1,
    viewRef1,
    animatedStyles1,
    animatedStyles2,
    animatedStyles3,
    animatedStyles4,
    animatedStyles5,
    animatedStyles6,
    handleLayout,
    mainImage,
    deleteImage,
    openLibrary,
    offsetX2,
    offsetY2,
    offsetX3,
    offsetY3,
    offsetX4,
    offsetY4,
    offsetX5,
    offsetY5,
    offsetX6,
    offsetY6,
    viewRef2,
    viewRef3,
    viewRef4,
    viewRef5,
    viewRef6,
    secondImage,
    thirdImage,
    fourthImage,
    fifthImage,
    sixthImage,
  };
};
