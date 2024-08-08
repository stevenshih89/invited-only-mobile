import {FC, useEffect, useState} from 'react';
import {Alert, FlatList, ScrollView, Share, Text, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import firestore from '@react-native-firebase/firestore';

//import components
import {useUser} from '../../../../../store/userStore';
import {showToast} from 'helpers/showToast.ts';
import useStyles from './styles';
import Button from 'components/Button/Button';
import Copy from 'assets/images/icons/copy.svg';

const Invitations: FC = () => {
  const [numberCodes, setNumberCodes] = useState<number>();
  const styles = useStyles();

  const userHost = useUser((i: any) => i?.user);
  
  const inviteLink = userHost?.codeForInvitingOtherUsers;

  console.log('inviteLink', inviteLink);
  

  const handleCopy = (val: string) => {
    Clipboard.setString(val);
    showToast('success', '', 'Invite code copied!');
  };

  const handleCheckInviteCode = async () => {
    try {
      const findInvitationCodes = await firestore()
        .collection('userInfo')
        .where('invitationCode', '==', userHost.codeForInvitingOtherUsers)
        .get();
      const data = findInvitationCodes?.docs?.map(i => i?.data());
      setNumberCodes(5 - data?.length);
    } catch (e) {
      console.log(e);
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: userHost?.codeForInvitingOtherUsers,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) { 
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    setNumberCodes(inviteLink.length)
    // handleCheckInviteCode();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You have {numberCodes} App invitations codes</Text>
      <Text style={styles.label}>IO Invitations</Text>
      <ScrollView>
        {inviteLink.map(item => (
          <View style={styles.inviteContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleCopy(item.inviteCode)} style={styles.inviteButton}>
            <Text style={styles.inviteText}>{item.inviteCode}</Text>
            <Copy />
          </TouchableOpacity>
        </View>
        ))}
      </ScrollView>
      {/* <FlatList
        data={inviteLink}
        renderItem={({item}) => 
        <View style={styles.inviteContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => handleCopy(item.inviteCode)} style={styles.inviteButton}>
          <Text style={styles.inviteText}>{item.inviteCode}</Text>
          <Copy />
        </TouchableOpacity>
      </View>
      }
        keyExtractor={item => item.id}
      /> */}
      {/* <Button title="Share" onPress={handleShare} buttonStyle={styles.shareButton} /> */}
    </View>
  );
};

export default Invitations;
