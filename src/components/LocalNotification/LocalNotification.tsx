import React from 'react';
import {View, Text, Image} from 'react-native';
import Toast, {BaseToast, ToastConfig, ToastConfigParams} from 'react-native-toast-message';

//import components
import useStyles from 'components/LocalNotification/styles.ts';

//import icons
import TickCircleIcon from 'assets/images/icons/tick-circle.svg';
import PendingClockIcon from 'assets/images/icons/pending-clock.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';

//import images
import IconBackground from 'assets/images/app/bcon-background.png';

const LocalNotification = () => {
  const styles = useStyles();
  const toastConfig: ToastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={styles.success}
        text1Style={styles.text1}
        text2Style={styles.text2}
        renderLeadingIcon={() => (
          <View style={styles.wrapperIcon}>
            <Image source={IconBackground} />
            <TickCircleIcon style={styles.icon} />
          </View>
        )}
      />
    ),
    pending: props => (
      <BaseToast
        {...props}
        style={styles.pending}
        text1Style={styles.text1}
        text2Style={styles.text2}
        renderLeadingIcon={() => (
          <View style={styles.wrapperIcon}>
            <Image source={IconBackground} />
            <PendingClockIcon style={styles.iconPending} />
          </View>
        )}
      />
    ),
    warning: props => <BaseToast {...props} style={styles.warning} text1Style={styles.text1} text2Style={styles.text2} />,
    customToast: ({text1, props}: ToastConfigParams<any>) => (
      <View style={styles.customToast}>
        <Text>{text1}</Text>
        <Text>
          {props} <ArrowRight />
        </Text>
      </View>
    ),
  };

  return <Toast visibilityTime={5000} config={toastConfig} />;
};

export default LocalNotification;
