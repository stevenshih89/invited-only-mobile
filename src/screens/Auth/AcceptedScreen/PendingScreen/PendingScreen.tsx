import React, {FC} from 'react';
import {ImageBackground, SafeAreaView, View, Text, Image} from 'react-native';

//import components
import useStyles from 'screens/Auth/AcceptedScreen/ReusableStyles/styles.ts';
import Button from 'components/Button/Button.tsx';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';

//import images
import IconVerifyFilled from 'assets/images/icons/icons-verify-filled.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import Avatar from 'assets/images/auth/man.png';

const PendingScreen: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();

  return (
    <ImageBackground source={HalfBackground} resizeMode="cover" style={styles.imageBackground}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.logoSecondaryWrapper}>
          <LogoSecondary height={84} />
        </View>
        <View style={styles.container}>
          <LogoPrimary height={22} style={styles.logoPrimary} />
          <Image source={Avatar} />
          <IconVerifyFilled style={styles.iconVerifyFilled} />
          <Text style={styles.textInReview}>In review</Text>
          <Text style={styles.textYourAccount}>Your account in review</Text>
          <Button onPress={() => navigation.goBack()} title="Continue" buttonStyle={styles.buttonContinue} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PendingScreen;
