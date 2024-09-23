import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FC, useEffect, useState} from 'react';
import {Tooltip, TooltipProps} from '@rneui/themed';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//import components
import useStyles from './styles';
import {useUser} from '../../../../../store/userStore';
import ArrowRight from '../../../../../assets/images/icons/arrow-right-balck.svg';
import {Satoshi400, Satoshi500, Satoshi700, Satoshi700Italic} from 'constants/fonts';
import Button from 'components/Button/Button';
import {black2Color90, blackColor, lightGray5Color, transparentGray90Color, whiteColor} from 'constants/colors';
import {manageSubscriptionPath, paymentPath, superInvitePayPath} from 'constants/pathLocations';

//import images
import CheckIcon from 'assets/images/icons/check.svg';
import ArrowRightIcon from 'assets/images/icons/arrow-right-balck.svg';
import ArrowRightWhiteIcon from 'assets/images/icons/arrow-right.svg';
import InfoCircleIcon from 'assets/images/icons/info-circle.svg';
import FlashIcon from 'assets/images/icons/flash-filled.svg';
import CloseIcon from 'assets/images/icons/close-circle.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import Unlimited from 'assets/images/icons/unlimited.svg';
import IO from 'assets/images/icons/io.svg';
import Flash from 'assets/images/icons/flash.svg';
import Eye from 'assets/images/icons/eye.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import Loader from '../../../../../components/Modal/ModalLoader/Loader';
import HostPremium from 'components/Modal/ModalHostPremium/HostPremium';
import { useSubscriptions } from 'src/store/subscriptionsStore';

const ControlledTooltip: FC<TooltipProps | any> = props => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    />
  );
};

const MyPlan = () => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});

  const currentSubscriptions = useSubscriptions((i: any) => i?.currentSubscriptions)  
  
  const fetchUserInfo = async () => {
    // setLoaderVisible(true)
    const user = auth().currentUser;

    if (user) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();
        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
      } catch (error: any) {}
    }
    // setLoaderVisible(false)
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const navigation = useAppNavigation();

  const loaderVisibleFun = () => {
    setLoaderVisible(true);
    setTimeout(() => setLoaderVisible(false), 1000);
  };

  const goToManagePath = () => {
    navigation.navigate(manageSubscriptionPath as never);
  }
  
  const goToPaymentPath = () => {
    navigation.navigate(paymentPath as never);
  };

  const styles = useStyles();

  const goToSuperInvitePay = () => {
    // @ts-ignore
    navigation.navigate(superInvitePayPath);
  };

  const getCurrentPlan = () => {
    const item = currentSubscriptions.activeSubscriptions.at(-1);
    let text = '';

    switch (item) {
      case 'io_59_1w':
        text = '1 week access';
        break;
      case 'io_29_3m':
        text = '3 month access';
        break;
      case 'io_25_wk':
        text = '1 year access';
        break;
      default:
        text = 'Basic';
        break;
    }

    return (
      <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi400}}>
        {text}
      </Text>
    );
}


  return (
    <View>
      <Loader isVisible={loaderVisible} successfulPay={false} textLoader={'Checking for available spots...'} />
      <View>
        <View
          style={{
            alignItems: 'center',
            padding: 24,
            backgroundColor: transparentGray90Color,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <FlashIcon width={18} height={18} />
            <Text style={{fontSize: RFValue(18, 812), marginLeft: 8, color: whiteColor, fontFamily: Satoshi700Italic}}>
              Super {userInfo.accountType === 'host'? 'Invite': 'Join'} <Text style={{fontFamily: Satoshi400}}>({userInfo?.superInvites + userInfo?.weeklySuperInvites})</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={goToSuperInvitePay}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: whiteColor,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: RFValue(16, 812), marginRight: 4, fontFamily: Satoshi500, color: blackColor}}>Add more</Text>
            <ArrowRightIcon width={16} height={16} />
          </TouchableOpacity>
        </View>
        {userInfo?.accountType === 'host' && (
          <>
            <TouchableOpacity
            disabled={!currentSubscriptions.activeSubscriptions.length}
            onPress={goToManagePath}
              style={{padding: 24, borderRadius: 18, backgroundColor: black2Color90, marginTop: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <View style={{width: '100%'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi700}}>Current plan: </Text>
                  {currentSubscriptions.activeSubscriptions.length ? (
                    getCurrentPlan()
                  ) : (
                    <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi400}}>Basic</Text>
                  )}
                </View>
              {!currentSubscriptions.activeSubscriptions.length ? (
                <TouchableOpacity onPress={goToPaymentPath} style={{marginTop: 24, width: '100%'}}>
                  <LinearGradient
                    colors={['#977B4A', '#E5D291', '#A28453']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{paddingVertical: 9, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Text style={{fontSize: RFValue(18, 812), fontFamily: Satoshi500, marginRight: 4}}>Upgrade</Text>
                    <ArrowRightIcon width={16} height={16} />
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi500, marginTop: 8}}>
                  Manage subscription
                </Text>
              )}
                </View>
                {currentSubscriptions.activeSubscriptions.length > 0 && <ArrowRightWhiteIcon />}
            </TouchableOpacity>
            {currentSubscriptions.activeSubscriptions.length > 0 && currentSubscriptions.activeSubscriptions.length < 3 && <TouchableOpacity onPress={goToPaymentPath} style={{marginTop: 24}}>
              <LinearGradient
                colors={['#977B4A', '#E5D291', '#A28453']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{paddingVertical: 16, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: RFValue(18, 812), fontFamily: Satoshi500, marginRight: 4}}>Upgrade</Text>
                <ArrowRightIcon width={16} height={16} />
              </LinearGradient>
            </TouchableOpacity>}
          </>
        )}
      </View>
      <View style={styles.listColumnWrapper}>
        <Text style={styles.textWhatYouGet}>What you {userInfo?.accountPremium ? 'have' : 'get'}:</Text>
        {!userInfo?.accountPremium && <Text style={styles.textPremium}>Premium</Text>}
      </View>
      <View style={styles.itemInTheList}>
        <View style={styles.rowTextAndCheckCircleIcon}>
          <View style={styles.wrapperIcon}>
            <Calendar />
          </View>
          <Text style={styles.textFromTheList}>Unlimited Events Creation</Text>
          <ControlledTooltip
            width={300}
            height={100}
            backgroundColor={lightGray5Color}
            withOverlay={false}
            popover={
              <View style={styles.tooltipWrapper}>
                <View style={styles.rowTitleTooltip}>
                  <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                  <CloseIcon />
                </View>
                <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
              </View>
            }>
            <InfoCircleIcon />
          </ControlledTooltip>
        </View>
        <CheckIcon />
      </View>
      <View style={styles.itemInTheList}>
        <View style={styles.rowTextAndCheckCircleIcon}>
          <View style={styles.wrapperIcon}>
            <Unlimited />
          </View>
          <Text style={styles.textFromTheList}>Unlimited Invitations</Text>
          <ControlledTooltip
            width={300}
            height={100}
            backgroundColor={lightGray5Color}
            withOverlay={false}
            popover={
              <View style={styles.tooltipWrapper}>
                <View style={styles.rowTitleTooltip}>
                  <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                  <CloseIcon />
                </View>
                <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
              </View>
            }>
            <InfoCircleIcon />
          </ControlledTooltip>
        </View>
        <CheckIcon />
      </View>
      <View style={styles.itemInTheList}>
        <View style={styles.rowTextAndCheckCircleIcon}>
          <View style={styles.wrapperIcon}>
            <IO />
          </View>
          <Text style={styles.textFromTheList}>Unlimited Likes</Text>
          <ControlledTooltip
            width={300}
            height={100}
            backgroundColor={lightGray5Color}
            withOverlay={false}
            popover={
              <View style={styles.tooltipWrapper}>
                <View style={styles.rowTitleTooltip}>
                  <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                  <CloseIcon />
                </View>
                <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
              </View>
            }>
            <InfoCircleIcon />
          </ControlledTooltip>
        </View>
        <CheckIcon />
      </View>
      <View style={styles.itemInTheList}>
        <View style={styles.rowTextAndCheckCircleIcon}>
          <View style={styles.wrapperIcon}>
            <Flash width={20} height={20} />
          </View>
          <Text style={styles.textFromTheList}>5 Super invites a week</Text>
          <ControlledTooltip
            width={300}
            height={100}
            backgroundColor={lightGray5Color}
            withOverlay={false}
            popover={
              <View style={styles.tooltipWrapper}>
                <View style={styles.rowTitleTooltip}>
                  <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                  <CloseIcon />
                </View>
                <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
              </View>
            }>
            <InfoCircleIcon />
          </ControlledTooltip>
        </View>
        <CheckIcon />
      </View>
      <View style={styles.itemInTheList}>
        <View style={styles.rowTextAndCheckCircleIcon}>
          <View style={styles.wrapperIcon}>
            <Unlimited />
          </View>
          <Text style={styles.textFromTheList}>Join events</Text>
          <ControlledTooltip
            width={300}
            height={100}
            backgroundColor={lightGray5Color}
            withOverlay={false}
            popover={
              <View style={styles.tooltipWrapper}>
                <View style={styles.rowTitleTooltip}>
                  <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                  <CloseIcon />
                </View>
                <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
              </View>
            }>
            <InfoCircleIcon />
          </ControlledTooltip>
        </View>
        <CheckIcon />
      </View>
      <View style={styles.itemInTheList}>
        <View style={styles.rowTextAndCheckCircleIcon}>
          <View style={styles.wrapperIcon}>
            <Eye />
          </View>
          <Text style={styles.textFromTheList}>See who wants to join you</Text>
          <ControlledTooltip
            width={300}
            height={100}
            backgroundColor={lightGray5Color}
            withOverlay={false}
            popover={
              <View style={styles.tooltipWrapper}>
                <View style={styles.rowTitleTooltip}>
                  <Text style={styles.textUnlimitedEventsCreation}>Unlimited Events Creation</Text>
                  <CloseIcon />
                </View>
                <Text style={styles.textHostAccessIsLimited}>Host access is limited. Get premium to start inviting.</Text>
              </View>
            }>
            <InfoCircleIcon />
          </ControlledTooltip>
        </View>
        <CheckIcon />
      </View>
    </View>
  );
};

export default MyPlan;


