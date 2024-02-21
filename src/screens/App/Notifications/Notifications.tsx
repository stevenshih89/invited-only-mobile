import {ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import Man from 'assets/images/auth/man.png';
import ClockOrange from 'assets/images/icons/clock-orange.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, invitationCodePath} from 'constants/pathLocations';
import useStyles from './styles';
import {FC, ReactElement} from 'react';

const Notifications: FC = (): ReactElement => {
  const navigation = useAppNavigation();

  const styles = useStyles();

  const goToCodeVerification = (): void => {
    navigation.navigate(commonStackPath, {screen: invitationCodePath});
  };

  const NotificationItem = () => {
    return (
      <View style={styles.notificationItem}>
        <View style={styles.notificationImageContainer}>
          <ImageBackground resizeMode="cover" source={Man} width={40} height={40} style={styles.notificationImageBackground}>
            <ClockOrange width={14} height={14} />
          </ImageBackground>
        </View>
        <View>
          <Text style={styles.notificationTitle}>Your User in review</Text>
          <View style={styles.notificationSubtitleWr}>
            <Text style={styles.notificationSubtitleText}>Have a code?</Text>
            <TouchableOpacity style={styles.notificationSubtitlePressableWr} onPress={goToCodeVerification}>
              <Text style={styles.notificationPressableText}>Click here</Text>
              <ArrowRight style={styles.notificationArrowRight} width={14} height={14} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 20}}
        style={styles.containerScroll}>
        <NotificationItem />
      </ScrollView>
    </View>
  );
};

export default Notifications;
