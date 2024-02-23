import {View, TouchableOpacity, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//import components
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import NotificationIcon from 'assets/images/icons/notification.svg';
import AddIcon from 'assets/images/icons/add.svg';
import CalendarSearchIcon from 'assets/images/icons/calendar-search.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {notificationsPath, notificationsStackPath} from 'constants/pathLocations';
import {Badge} from '@rneui/themed';
import useStyles from 'components/Header/styles.ts';

const Header = () => {
  const styles = useStyles();
  const insets = useSafeAreaInsets();

  const navigation = useAppNavigation();

  const goToNotifications = (): void => {
    navigation.navigate(notificationsStackPath, {screen: notificationsPath});
  };

  const headerInsets = {
    paddingTop: insets.top,
  };

  return (
    <View style={[styles.container, headerInsets]}>
      <View style={styles.wrapperHeader}>
        <LogoPrimary width={157} height={32} />
        <TouchableOpacity onPress={goToNotifications}>
          <NotificationIcon width={32} height={32} />
          <Badge value={22} badgeStyle={styles.badgeStyle} textStyle={styles.badgeText} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperHeaderButton}>
        <TouchableOpacity style={styles.eventButton}>
          <View style={styles.eventView}>
            <AddIcon width={26} height={26} />
          </View>
          <Text style={styles.textButton}>Create event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventButton}>
          <View style={styles.eventView}>
            <CalendarSearchIcon width={26} height={26} />
          </View>
          <Text style={styles.textButton}>Join events</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
