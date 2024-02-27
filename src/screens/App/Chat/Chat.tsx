import React, {FC} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';

//import components
import useStyles from 'screens/App/Chat/styles.ts';
import {Badge} from '@rneui/themed';

//import images
import FakeGirl1 from 'assets/images/app/fake-girl-1.png';
import FakeGirl2 from 'assets/images/app/fake-girl-2.png';
import FakeGirl3 from 'assets/images/app/fake-girl-3.png';

//import icons
import FlashField from 'assets/images/icons/flash.svg';
import ThreeDoths from 'assets/images/icons/more-white.svg';

type ItemProps = {
  title: string;
  message: string;
  image: any;
  online: boolean;
  story: boolean;
  inviteStatus: string;
};

const Chat: FC = () => {
  const styles = useStyles();

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Carla',
      message: 'Hello ! Nazrul How are you?',
      image: FakeGirl1,
      online: true,
      story: true,
      inviteStatus: 'pending',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Alexa',
      message: 'Hello ! Nazrul How are you?',
      image: FakeGirl2,
      online: false,
      story: true,
      inviteStatus: 'accepted',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Cina',
      message: 'Hello ! Nazrul How are you?',
      image: FakeGirl3,
      online: false,
      story: false,
      inviteStatus: 'newInvited',
    },
  ];

  const Item = ({title, message, image, online, story, inviteStatus}: ItemProps) => (
    <View style={styles.item}>
      <TouchableOpacity style={styles.wrapperItem}>
        <View>
          <Image resizeMode="cover" style={[styles.imageUser, story && styles.story]} source={image} />
          {online && <View style={styles.greenCircle} />}
        </View>
        <View style={styles.wrapperItemElements}>
          <View style={styles.rowTextNameAndStatus}>
            <Text style={styles.textName}>
              {title} <FlashField width={13} height={13} />
            </Text>
            <View style={[handleCheckTypeInvitedStyles(inviteStatus)]}>
              <Text style={styles.textStatusInvite}>{handleCheckTypeInvitedText(inviteStatus)}</Text>
            </View>
          </View>
          <Text style={styles.textMessage}>{message}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.wrapperThreeDotsAndBadge}>
        <TouchableOpacity>
          <ThreeDoths />
        </TouchableOpacity>
        <Badge value={22} badgeStyle={styles.badgeStyleEvent} textStyle={styles.badgeText} />
      </View>
    </View>
  );

  const handleCheckTypeInvitedText = (type: string) => {
    switch (type) {
      case 'pending':
        return 'Pending';
      case 'newInvited':
        return 'New Invite Match';
      case 'accepted':
        return 'Invitation Accepted';

      default:
        return null;
    }
  };

  const handleCheckTypeInvitedStyles = (type: string) => {
    switch (type) {
      case 'pending':
        return styles.textStatusPending;
      case 'newInvited':
        return styles.textStatusInviteMatch;
      case 'accepted':
        return styles.textStatusInvitationAccepted;

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <Item
            inviteStatus={item.inviteStatus}
            story={item.story}
            online={item.online}
            title={item.title}
            message={item.message}
            image={item.image}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Chat;
