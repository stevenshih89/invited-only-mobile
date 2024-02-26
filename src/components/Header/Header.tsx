import {View, TouchableOpacity, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FC} from 'react';

//import components
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import NotificationIcon from 'assets/images/icons/notification.svg';
import AddIcon from 'assets/images/icons/add.svg';
import CalendarSearchIcon from 'assets/images/icons/calendar-search.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {notificationsPath, notificationsStackPath} from 'constants/pathLocations';
import {Badge} from '@rneui/themed';
import useStyles from 'components/Header/styles.ts';

interface HeaderTypeProps {
  headerType: 'IO' | 'myEvents' | 'profile' | 'request' | 'chat';
}

const Header: FC<HeaderTypeProps> = ({headerType}) => {
  const styles = useStyles();
  const insets = useSafeAreaInsets();

  const navigation = useAppNavigation();

  const goToNotifications = (): void => {
    // @ts-ignore
    navigation.navigate(notificationsStackPath, {screen: notificationsPath});
  };

  const headerInsets = {
    paddingTop: insets.top,
  };

  const handleCheckType = (type: string) => {
    switch (type) {
      case 'IO':
        return (
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
        );
      case 'myEvents':
        return (
          <View style={styles.wrapperHeaderButtonMyEvents}>
            <TouchableOpacity style={styles.buttonMyEvents}>
              <Text style={styles.textMyEvents}>My events</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonEventsJoining}>
              <Text style={styles.textEventsJoining}>Events I'm Joining</Text>
              <View style={styles.rowTextCountEvents}>
                <Text style={styles.textCountEvents}>21</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addEventButton}>
              <View style={styles.addEventView}>
                <AddIcon width={19} height={19} />
              </View>
            </TouchableOpacity>
          </View>
        );
      case 'profile':
        return null;
      case 'request':
        return null;
      case 'chat':
        return null;

      default:
        return null;
    }
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
      {handleCheckType(headerType)}
    </View>
  );
};

export default Header;
