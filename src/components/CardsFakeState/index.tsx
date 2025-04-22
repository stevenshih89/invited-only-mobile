import { View} from 'react-native';
import React, {useRef} from 'react';

//import icons
import useStyles from 'screens/App/IO/styles.ts';
import {useUser} from 'src/store/userStore';

const CardsFakeState = ({handleSwipeFakeCard, OverlayRight, OverlayLeft, item}: any) => {
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const styles = useStyles();

  const {user} = useUser();

  const girlPhotos1 = [
    'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/user_photos%2FgMp0lX0rPcfFe6vkV9EhfTu5OU93_1735915281875?alt=media&token=4f280a0d-b6d0-4a64-b109-1b185edde764',
    'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/user_photos%2FgMp0lX0rPcfFe6vkV9EhfTu5OU93_1735915254641?alt=media&token=ac8a9b7e-0738-48f7-9cf0-ab8fd45b1a12',
    'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/user_photos%2FgMp0lX0rPcfFe6vkV9EhfTu5OU93_1735915309653?alt=media&token=a1664634-bcb9-47b3-ba21-1e6d38a07d87',
  ];

  const girlPhotos2 = [
    'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/user_photos%2FbjKkDs5nmgbN8Q4ArsFskwmJo5h2_1735913616179?alt=media&token=770e4927-77e9-4212-9750-caa7f97d6f24',
    'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/user_photos%2FbjKkDs5nmgbN8Q4ArsFskwmJo5h2_1735913624943?alt=media&token=9cf178e4-f9e7-4d55-80b7-0f269693cd91',
  ];

  const activeEvent = {
    photos: [
      {
        id: 0,
        image:
          'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/images%2FR0zqHQpcGOfcjLUAHL5tI251GZ92_1735923423588?alt=media&token=c13783a7-d89d-4ba5-b7fb-09aea3b24170',
      },
    ],
    female: 5,
    male: 4,
  };

  const handleSwipeCardRight = (ref: any) => {
    if (ref.current) {
      // @ts-ignore
      ref.current?.swipeCardRight();
      handleSwipeFakeCard();
    }
  };

  const handleSwipeCardLeft = (ref: any) => {
    if (ref.current) {
      // @ts-ignore
      ref.current?.swipeCardLeft();
      handleSwipeFakeCard();
    }
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: 10,
          height: '90%',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        pointerEvents="box-none"></View>
      <View
        style={{
          paddingHorizontal: 10,
          height: '90%',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        pointerEvents="box-none"
        key={'0'}></View>
    </>
  );
};

export default CardsFakeState;
