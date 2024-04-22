import React, {FC, useRef} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';

//import components
import Button from 'components/Button/Button.tsx';
import UserProfile, {IUser} from 'components/Modal/ModalRate/shared/UserProfile.tsx';
import Stars from 'components/Modal/ModalRate/shared/Stars.tsx';
import styles from 'components/Modal/ModalRate/styles.ts';

type ModalRateProps = {
  user: IUser;
  isShown: boolean;
  onClose: () => void;
};

const ModalRate: FC<ModalRateProps> = props => {
  const {user, isShown = false, onClose} = props;

  const userRate = useRef<number>();

  const rateGuest = () => {
    // DEVNOTE: Send api request for update.
    // api.rateUser(userRate.current)
  };
  const later = () => onClose;

  return (
    <Modal
      isVisible={isShown}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.94)'}
      testID={'bottom-half-modal-open-button'}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      style={styles.modalStyles}
      swipeDirection={['down']}>
      <View style={styles.wrapper}>
        <View style={styles.whiteLine} />
        <UserProfile user={user} />
        <Text style={styles.textAreYouSure}>Rate {user.name}</Text>
        <Stars onRate={rate => (userRate.current = rate)} readonly initialRate={5} />
        <Button onPress={rateGuest} title="Rate guest" buttonStyle={styles.button} />
        <Button variant="transparent" onPress={later} title="Later" buttonStyle={styles.transparentButton} />
      </View>
    </Modal>
  );
};

export default ModalRate;
