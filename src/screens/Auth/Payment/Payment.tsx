import React, {FC, useState} from 'react';
import {View, Text, ImageBackground, SafeAreaView, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Tooltip, TooltipProps} from '@rneui/themed';

//import components
import useStyles from 'screens/Auth/Payment/styles.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import Button from 'components/Button/Button.tsx';
import {tutorialFlowPath} from 'constants/pathLocations.ts';
import {lightGray5Color} from 'constants/colors.ts';

//import images
import HalfBackground from 'assets/images/auth/half-background.png';

//import icons
import CheckIcon from 'assets/images/icons/check.svg';
import InfoCircleIcon from 'assets/images/icons/info-circle.svg';
import CloseIcon from 'assets/images/icons/close-circle.svg';

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

const Payment: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();

  return (
    <ImageBackground resizeMode="cover" source={HalfBackground} style={styles.imageBackground}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.textGetASpot}>Get A Spot</Text>
            <Text style={styles.textHostAccess}>Host access is limited. Get premium to start inviting.</Text>
            <LinearGradient colors={['#977B4A', '#E5D291', '#A28453']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.linearGradient}>
              <Text style={styles.textHostPremium}>Host Premium</Text>
              <Text style={styles.textGetAccess}>Get Access & Unlock all of our features. Secure your spot. Host Access is limited.</Text>
              <View style={styles.buttonWrapper}>
                <Button
                  onPress={() => navigation.navigate(tutorialFlowPath)}
                  title="Upgrade $99/m"
                  buttonTitleStyle={styles.textButtonTitleStyle}
                  buttonStyle={styles.buttonUpgrade}
                />
              </View>
            </LinearGradient>
            <Text style={styles.textYearlySpot}>Yearly Spot*</Text>
            <View style={styles.listColumnWrapper}>
              <Text style={styles.textWhatYouGet}>What you get:</Text>
              <Text style={styles.textPremium}>Premium</Text>
            </View>
            <View style={styles.itemInTheList}>
              <View style={styles.rowTextAndCheckCircleIcon}>
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
            <Button onPress={() => navigation.goBack()} title="Skip" variant="transparent" buttonStyle={styles.buttonSkip} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Payment;
