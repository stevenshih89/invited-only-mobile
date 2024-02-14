import React, {FC} from 'react';
import {Dimensions, SafeAreaView, Text, View, Image} from 'react-native';

//import components
import useStyles from 'screens/Auth/AcceptedScreen/AccountRejected/styles.ts';
import Button from 'components/Button/Button.tsx';
import {onboardPath} from 'constants/pathLocations.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';

//import images
import InfoCircle from 'assets/images/auth/info-circle.svg';
import Avatar from 'assets/images/auth/man.png';
import IoIcon from 'assets/images/auth/io-icon.svg';

const PendingScreen: FC = (): JSX.Element => {
  const styles = useStyles();
  const dimensionsHeight = Dimensions.get('window').height;
  const navigation = useAppNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarStyle}>
            <Image source={Avatar} style={styles.imageAvatar} />
          </View>
          <InfoCircle style={styles.infoCircleIcon} />
        </View>
        <Text style={styles.textYourAccount}>Your Account is Not Approved</Text>
        <Text style={[styles.textDescriptionNotApproved, {marginTop: dimensionsHeight / 25}]}>
          We're sorry, but it seems your account has not been approved for use at the moment. Our team is working diligently to review all accounts,
          and yours will be evaluated shortly.
        </Text>
        <Text style={styles.textDescriptionNotApproved}>
          If you believe this is an error or have any questions, please feel free to contact our support team.
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.textNeedAHelp}>Need a help?</Text>
          <View style={styles.wrapperSupportInfo}>
            <IoIcon />
            <Text style={styles.textSupport}>Support@invitedonly.com</Text>
          </View>
        </View>
        <Button onPress={() => navigation.navigate(onboardPath)} title="Logout" variant="transparent" buttonStyle={styles.buttonLogout} />
      </View>
    </SafeAreaView>
  );
};

export default PendingScreen;
