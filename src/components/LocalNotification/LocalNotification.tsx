import React from 'react';
import {View, Text, Image} from 'react-native';
import Toast, {BaseToast, ToastConfig, ToastConfigParams} from 'react-native-toast-message';

//import components
import useStyles from 'components/LocalNotification/styles.ts';

//import icons
import TickCircleIcon from 'assets/images/icons/tick-circle.svg';
import PendingClockIcon from 'assets/images/icons/pending-clock.svg';
import InfoCircleOrange from 'assets/images/icons/info-circle-orange.svg';
import InfoCircleGrey from 'assets/images/icons/info-circle-gray.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import XIcon from 'assets/images/icons/X.svg';

//import images
import IconBackground from 'assets/images/app/bcon-background.png';
import { blackColor, whiteColor } from 'constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

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
    cancel: props => (
      <BaseToast
        {...props}
        style={styles.cancel}
        text1Style={styles.text1}
        text2Style={styles.text2}
        renderLeadingIcon={() => (
          <View style={styles.wrapperIcon}>
            <Image source={IconBackground} />
            <XIcon style={styles.iconCancel} />
          </View>
        )}
      />
    ),
    warning: props => (
      <BaseToast
        {...props}
        renderLeadingIcon={() => (
          <View style={styles.wrapperIcon}>
            <Image source={IconBackground} />
            <InfoCircleOrange style={styles.iconCancel} />
          </View>
        )}
        style={styles.warning}
        text1Style={styles.text1}
        text2Style={styles.text2}
      />
    ),
    warningGrey: props => (
      <BaseToast
        {...props}
        renderLeadingIcon={() => (
          <View style={styles.wrapperIcon}>
            <Image source={IconBackground} />
            <InfoCircleGrey style={styles.iconCancel} />
          </View>
        )}
        style={styles.warning}
        text1Style={styles.text1}
        text2Style={styles.text2}
      />
    ),
    customToast: ({text1, props}: ToastConfigParams<any>) => (
      <View style={styles.customToast}>
        <Text>{text1}</Text>
        <Text>
          {props} <ArrowRight />
        </Text>
      </View>
    ),
    changeProfile: ({text1,text2}) => (
      <View style={{paddingHorizontal: 24, width:'100%'}}>
        <View style={{backgroundColor: whiteColor, padding: 16, borderRadius: 10, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={{height: 60, width: 60}} source={IconBackground} />
          <View style={{marginLeft: 16, flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: blackColor, fontWeight: 'bold', fontSize: RFValue(16, 812), fontFamily: Satoshi400}}>{text1}</Text>
            <View style={{borderRadius: 100,backgroundColor: blackColor}}>
              <Text style={{fontSize: RFValue(12, 812), color: whiteColor, fontFamily: Satoshi500, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100}}>UPDATED</Text>
            </View>
            </View>
            <Text style={{color: blackColor, marginTop: 6, fontSize: RFValue(16, 812), fontFamily: Satoshi400}}>{text2}</Text>
          </View>
        </View>
      </View>
      </View>
    ),
  };

  return <Toast visibilityTime={5000} config={toastConfig} />;
};

export default LocalNotification;
