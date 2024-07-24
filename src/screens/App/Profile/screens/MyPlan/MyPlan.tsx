import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FC, useState} from 'react';
import {Tooltip, TooltipProps} from '@rneui/themed';
import {RFValue} from 'react-native-responsive-fontsize';

//import components
import useStyles from './styles';
import {useUser} from '../../../../../store/userStore';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import Button from 'components/Button/Button';
import {blackColor, lightGray5Color, whiteColor} from 'constants/colors';
import {paymentPath} from 'constants/pathLocations';  

//import images
import CheckIcon from 'assets/images/icons/check.svg';
import InfoCircleIcon from 'assets/images/icons/info-circle.svg';
import CloseIcon from 'assets/images/icons/close-circle.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import Unlimited from 'assets/images/icons/unlimited.svg';
import IO from 'assets/images/icons/io.svg';
import Flash from 'assets/images/icons/flash.svg';
import Eye from 'assets/images/icons/eye.svg';
import { useAppNavigation } from 'hooks/useAppNavigation';
import Loader from '../../../../../components/Modal/ModalLoader/Loader';
import HostPremium from 'components/Modal/ModalHostPremium/HostPremium';

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

  const [loaderVisible, setLoaderVisible] = useState(false)

  const navigation = useAppNavigation();

  const loaderVisibleFun = () => {
    setLoaderVisible(true)
    setTimeout(() => setLoaderVisible(false), 1000)
  }

  const goToMyProfileView = () => {
    // @ts-ignore
    loaderVisibleFun()
    navigation.navigate(paymentPath);
  };
  
  const styles = useStyles();
  const isPremium = useUser((i: any) => i?.premium);

  return (
    <View>
      <Loader isVisible={loaderVisible} successfulPay={false} textLoader={'Checking for available spots...'}/>
      <LinearGradient colors={['#977B4A', '#E5D291', '#A28453']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.linearGradient}>
        {isPremium ? (
          <Text style={{color: blackColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}>Premium</Text>
        ) : (
          <>
            <Text style={styles.textHostPremium}>Host Premium</Text>
            <Text style={styles.textGetAccess}>Get Access & Unlock all of our features. Secure your spot. Host Access is limited.</Text>
            <View style={styles.buttonWrapper}>
              <Button title="Get Access" onPress={goToMyProfileView} buttonTitleStyle={styles.textButtonTitleStyle} buttonStyle={styles.buttonUpgrade} />
            </View>
            {/* <Text style={styles.textYearlySpot}>Yearly Spot*</Text> */}
            {/* <Text style={styles.textYearlySpot}>Yearly Spot*</Text> */}
          </>
        )}
      </LinearGradient>
      {/* {!isPremium && <Text style={styles.textYearlySpot}>Yearly Spot*</Text>} */}
      <View style={styles.listColumnWrapper}>
        <Text style={styles.textWhatYouGet}>What you {isPremium ? 'have' : 'get'}:</Text>
        {!isPremium && <Text style={styles.textPremium}>Premium</Text>}
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
            <IO/>
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
            <Flash width={20} height={20}/>
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
            <Unlimited/>
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
            <Eye/>
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
