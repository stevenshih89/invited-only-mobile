import React, {FC} from 'react';
import {ImageBackground, SafeAreaView, View, Text, Image} from 'react-native';

//import components
import useStyles from 'screens/Auth/AcceptedScreen/ReusableStyles/styles.ts';
import Button from 'components/Button/Button.tsx';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {paymentPath} from 'constants/pathLocations.ts';

//import images
import IconVerifyFilledAccepted from 'assets/images/icons/check-star.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import Avatar from 'assets/images/auth/man.png';

const CodeVerified: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();

  return (
    <ImageBackground source={HalfBackground} resizeMode="cover" style={styles.imageBackground}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.logoSecondaryWrapper}>
          <LogoSecondary height={84} />
        </View>
        <View style={styles.wrapperContainerVerified}>
          <View style={styles.container}>
            <LogoPrimary height={22} style={styles.logoPrimary} />
            <Image source={Avatar} />
            <View style={styles.wrapperIconVerifyFilledAccepted}>
              <IconVerifyFilledAccepted />
            </View>
            <Text style={styles.textInReview}>Verified</Text>
            <Text style={styles.textYourAccount}>Join Invitation Accepted!</Text>
            <Button onPress={() => navigation.navigate(paymentPath)} title="Continue" buttonStyle={styles.buttonContinue} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CodeVerified;
