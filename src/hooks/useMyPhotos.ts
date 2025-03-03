import {isIos} from 'constants/common';
import {useEffect, useRef, useState} from 'react';
import {Alert, Animated} from 'react-native';
import Config from 'react-native-config';
import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';
import {check, Permission, PERMISSIONS, PermissionStatus, request, RESULTS} from 'react-native-permissions';
import {useUser} from 'src/store/userStore';
import firestore from '@react-native-firebase/firestore';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {showToast} from 'helpers/showToast';
import {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';

export const useMyPhotos = ({images, setImages}: {images: any; setImages: any}) => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const userHost = useUser((i: any) => i?.user);
  const isConfirmed = userHost?.accountConfirmed;
  const [visibleModalReplace, setVisibleModalReplace] = useState(false);

  const makePermissionsRequest = async (permission: Permission): Promise<PermissionStatus> => {
    const result = await check(permission);
    switch (result) {
      case RESULTS.DENIED:
        const requestResult = await request(permission);
        if (requestResult === RESULTS.BLOCKED) {
          Alert.alert('Permission not granted');
        }
        return requestResult;
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

    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.9,
      },
      (response: ImagePickerResponse) => {
        if (!response.assets) {
          return;
        }
        if (response.assets[0].uri) {
          const image = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };

          const newImages = images.map(img => {
            if (img.id === imageId) {
              return {...img, image: image.uri};
            }
            return img;
          });
          setImages(newImages);
        }
      },
    );
  };

  const deleteImage = (imageId: number): void => {
    const newImages = images.map(img => {
      if (img.id === imageId) {
        return {...img, image: null};
      }
      return img;
    });
    setImages(newImages);
  };

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection(apiUserInfoCollection)
        .doc(userHost.uid)
        .onSnapshot(docSnapshot => {
          const data = docSnapshot.data();
          const updatedPhotos = data?.photos || [];
          setImages(updatedPhotos);
        });
      return () => unsubscribe();
    } catch (error) {
      logErrorToSentry(error);
    }
  }, []);

  const replaceImage = async () => {
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
        await firestore().collection(apiUserInfoCollection).doc(userHost.uid).update({
          photos,
        });
        setVisibleModalReplace(false);
        setActiveImage(0);
        setSelectImage(0);
        showToast('inviteMatch', 'Image successfully replaced', 'Success');
      } catch (error) {
        console.log('error replace photo', error);
        logErrorToSentry(error);
        setVisibleModalReplace(false);
        setActiveImage(0);
        setSelectImage(0);
      }
    }
  };

  const mainImage = images[images.findIndex(item => item.id === 0)];
  const secondImage = images[images.findIndex(item => item.id === 1)];
  const thirdImage = images[images.findIndex(item => item.id === 2)];
  const fourthImage = images[images.findIndex(item => item.id === 3)];
  const fifthImage = images[images.findIndex(item => item.id === 4)];
  const sixthImage = images[images.findIndex(item => item.id === 5)];

  const viewRef1 = useRef(null);
  const viewRef2 = useRef(null);
  const viewRef3 = useRef(null);
  const viewRef4 = useRef(null);
  const viewRef5 = useRef(null);
  const viewRef6 = useRef(null);

  const [layout, setLayout] = useState([]);

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
    const activeItem = layout.find(item => item.imageId === imageId);

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

    layout.forEach(item => {
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

  const createAnimatedStyle = (offsetX, offsetY, id) =>
    useAnimatedStyle(() => ({
      transform: [
        {translateX: offsetX.value},
        {translateY: offsetY.value},
        {
          scale: withSpring(activeImage === 0 || activeImage === id ? 1 : selectImage === id ? 1 : 0.8, {damping: 15, stiffness: 100}),
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

    const ref = viewRefs[imageId - 1];

    if (ref && ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        setLayout(prev => [...prev, {imageId, x: pageX, y: pageY, width, height}]);
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
