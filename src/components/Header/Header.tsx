import {View, TouchableOpacity, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//import components
import useStyles from 'components/Header/styles.ts';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import NotificationIcon from 'assets/images/icons/notification.svg';
import AddIcon from 'assets/images/icons/add.svg';
import CalendarSearchIcon from 'assets/images/icons/calendar-search.svg';

const Header = () => {
  const styles = useStyles();
  const insets = useSafeAreaInsets();

  const headerInsets = {
    paddingTop: insets.top,
  };

  return (
    <View style={[styles.container, headerInsets]}>
      <View style={styles.wrapperHeader}>
        <LogoPrimary width={157} height={32} />
        <TouchableOpacity>
          <NotificationIcon width={32} height={32} />
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
