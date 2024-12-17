import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {FC} from 'react';
import Lock from 'assets/images/icons/clock-white.svg';
import Bing from 'assets/images/icons/notification-bing.svg';
import useStyles from './styles';
import {transparent60Color} from 'constants/colors';

const ModalEventLocked: FC<{
  wrapperStyle?: StyleProp<ViewStyle>;
  haveCode?: boolean;
  eventStatus: boolean;
  eventReviewed: boolean;
}> = ({wrapperStyle, eventReviewed, eventStatus}) => {
  const styles = useStyles();

  if (!eventReviewed) {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: transparent60Color,
          zIndex: 1000,
        }}>
        <View style={[styles.lockedWrapper, wrapperStyle]}>
          <View style={styles.lockIconWr}>
            <Lock width={24} height={24} />
          </View>
          <View style={styles.lockDescWr}>
            <Text style={styles.lockedTitle}>Event Under Review</Text>
            <Text style={styles.lockedSubtitle}>
              Your event is under review. Thank you for your patience. You will be notified if your event is accepted
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (eventReviewed && !eventStatus) {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: transparent60Color,
          zIndex: 1000,
        }}>
        <View style={[styles.lockedWrapper, wrapperStyle]}>
          <View style={styles.lockIconWr}>
            <Bing width={24} height={24} />
          </View>
          <View style={styles.lockDescWr}>
            <Text style={styles.lockedTitle}>Event Rejected By Admin</Text>
            <Text style={styles.lockedSubtitle}>{'Your event has been reejected'}</Text>
            <Text style={styles.lockedSubtitle}>{'You can create new event'}</Text>
          </View>
        </View>
      </View>
    );
  }

  return null;
};

export default ModalEventLocked;
