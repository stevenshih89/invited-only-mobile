import {FC} from 'react';
import {View, TouchableOpacity, Text, Image, FlatList} from 'react-native';
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
import Logo from 'assets/images/icons/logo.svg';
import NotificationIcon from 'assets/images/icons/notification.svg';
import AddIcon from 'assets/images/icons/add.svg';
import CalendarSearchIcon from 'assets/images/icons/calendar-search.svg';
import PeopleIcon from 'assets/images/icons/profile-2user.svg';

//import images
import EventBG from 'assets/images/app/card-event-bg.png';

interface HeaderTypeProps {
  headerType?: 'IO' | 'myEvents' | 'profile' | 'request' | 'chat';
  showHeaderTop?: boolean;
  logoType?: string;
  badge?: boolean;
}

type ItemProps = {
  title: string;
  allPeople: number;
  filledTo: number;
  image: any;
  numberBadge: number;
};

const Header: FC<HeaderTypeProps> = ({badge, logoType, headerType, showHeaderTop = true}) => {
  const styles = useStyles();

  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Amazonico',
      allPeople: 4,
      filledTo: 3,
      image: EventBG,
      numberBadge: 22,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Amazonico',
      allPeople: 0,
      filledTo: 0,
      image: EventBG,
      numberBadge: 12,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Iris',
      allPeople: 4,
      filledTo: 2,
      image: EventBG,
      numberBadge: 0,
    },
  ];

  const Item = ({title, filledTo, numberBadge, image, allPeople}: ItemProps) => (
    <TouchableOpacity style={styles.eventButton}>
      <View style={[styles.eventViewFlatList, {borderColor: numberBadge !== 0 ? whiteColor : lightGray5Color}]}>
        <Image source={image} style={styles.imageEvent} />
        {numberBadge > 0 && <Badge value={numberBadge} badgeStyle={styles.badgeStyleEvent} textStyle={styles.badgeText} />}
      </View>
      <Text style={styles.textButton}>{title}</Text>
      {allPeople > 0 && (
        <View style={styles.numberPeopleOnEvent}>
          <PeopleIcon />
          <Text style={styles.textNumberPeopleOnEvent}>
            {filledTo}/{allPeople}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

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
              <FlatList
                data={DATA}
                horizontal={true}
                renderItem={({item}) => (
                  <Item filledTo={item.filledTo} allPeople={item.allPeople} image={item.image} numberBadge={item.numberBadge} title={item.title} />
                )}
                keyExtractor={item => item.id}
              />
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
          {logoType === 'logo' ? <Logo width={157} height={32} /> : <LogoPrimary width={157} height={32} />}
          {badge && (
            <TouchableOpacity onPress={goToNotifications}>
              <NotificationIcon width={32} height={32} />
              <Badge value={22} badgeStyle={styles.badgeStyle} textStyle={styles.badgeText} />
            </TouchableOpacity>
          )}
        </View>
      )}
      {handleCheckType(headerType)}
    </View>
  );
};

export default Header;
