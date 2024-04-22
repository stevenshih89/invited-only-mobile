import React, {FC} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';

//import components
import Button from 'components/Button/Button.tsx';
import UserProfile, {IUser} from 'components/Modal/ModalRate/shared/UserProfile.tsx';
import Stars, {StarRange} from 'components/Modal/ModalRate/shared/Stars.tsx';
import styles from 'components/Modal/ModalRate/styles.ts';

type ModalRateProps = {
  user: IUser;
  rate: StarRange;
  isShown: boolean;
  onClose: () => void;
};

const ModalRatedYou: FC<ModalRateProps> = props => {
  const {user, isShown = false, onClose} = props;

  const thanksHandler = () => {
    // DEVNOTE: React for rating, or remove handler.
  };

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
        <Text style={styles.textAreYouSure}>{user.name.toLocaleUpperCase()} Rated you</Text>
        <Stars readonly initialRate={5} />
        <Button onPress={thanksHandler} title="Thanks, Got it" buttonStyle={styles.button} />
        <Button variant="transparent" onPress={onClose} title="close" buttonStyle={styles.transparentButton} />
      </View>
    </Modal>
  );
};

export default ModalRatedYou;
