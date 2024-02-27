import {FC} from 'react';
import {View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Badge} from '@rneui/themed';

//import components
import useStyles from 'components/Header/styles.ts';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {notificationsPath, notificationsStackPath} from 'constants/pathLocations';
import {screenHeight} from 'constants/common.ts';
import {lightGray5Color, whiteColor} from 'constants/colors.ts';

//import icons
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import NotificationIcon from 'assets/images/icons/notification.svg';
import AddIcon from 'assets/images/icons/add.svg';
import CalendarSearchIcon from 'assets/images/icons/calendar-search.svg';
import PeopleIcon from 'assets/images/icons/profile-2user.svg';

//import images
import EventBG from 'assets/images/app/card-event-bg.png';

interface HeaderTypeProps {
  headerType?: 'IO' | 'myEvents' | 'profile' | 'request' | 'chat';
  showHeaderTop?: boolean;
}

const Header: FC<HeaderTypeProps> = ({headerType, showHeaderTop = true}) => {
  const styles = useStyles();

  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const t = false;

  const goToNotifications = (): void => {
    // @ts-ignore
    navigation.navigate(notificationsStackPath, {screen: notificationsPath});
  };

  const headerInsets = {
    paddingTop: insets.top,
  };

  const handleCheckType = (type: 'IO' | 'myEvents' | 'profile' | 'request' | 'chat' | undefined) => {
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
      case 'chat':
        return (
          <View style={styles.wrapperHeaderButtonsChat}>
            <View style={styles.rowButtonsChat}>
              <TouchableOpacity style={styles.buttonMyEvents}>
                <Text style={styles.textMyEvents}>My events</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonEventsJoining}>
                <Text style={styles.textEventsJoining}>Events I'm Joining</Text>
                <View style={styles.rowTextCountEvents}>
                  <Text style={styles.textCountEvents}>21</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.rowButtonsChat, {marginTop: screenHeight / 34}]}>
              <ScrollView horizontal={true}>
                <TouchableOpacity style={styles.eventButton}>
                  <View style={[styles.eventView, {borderColor: t ? lightGray5Color : whiteColor}]}>
                    <Image source={EventBG} style={styles.imageEvent} />
                    <Badge value={22} badgeStyle={styles.badgeStyleEvent} textStyle={styles.badgeText} />
                  </View>
                  <Text style={styles.textButton}>Amazonico</Text>
                  <View style={styles.numberPeopleOnEvent}>
                    <PeopleIcon />
                    <Text style={styles.textNumberPeopleOnEvent}>2/4</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eventButton}>
                  <View style={[styles.eventView, {borderColor: lightGray5Color}]}>
                    <Image source={EventBG} style={styles.imageEvent} />
                  </View>
                  <Text style={styles.textButton}>Iris</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, headerInsets]}>
      {showHeaderTop && (
        <View style={styles.wrapperHeader}>
          <LogoPrimary width={157} height={32} />
          <TouchableOpacity onPress={goToNotifications}>
            <NotificationIcon width={32} height={32} />
            <Badge value={22} badgeStyle={styles.badgeStyle} textStyle={styles.badgeText} />
          </TouchableOpacity>
        </View>
      )}
      {handleCheckType(headerType)}
    </View>
  );
};

export default Header;
