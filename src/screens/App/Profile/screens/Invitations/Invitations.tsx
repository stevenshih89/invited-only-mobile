import {FC, useEffect, useState} from 'react';
import {Alert, Share, Text, TouchableOpacity, View} from 'react-native';
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

  const handleCopy = (val: string) => {
    Clipboard.setString(val);
    showToast('success', '', 'Invite code copied!');
  };

  const handleCheckInviteCode = async () => {
    try {
      const findInvitationСodes = await firestore().collection('userInfo').where('invitationСode', '==', userHost.codeForInvitingOtherUsers).get();
      const data = findInvitationСodes?.docs?.map(i => i?.data());
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
    handleCheckInviteCode();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You have {numberCodes} codes</Text>
      {/*<View style={styles.inviteContainer}>*/}
      {/*  <Text style={styles.label}>Invite code</Text>*/}
      {/*  <TouchableOpacity activeOpacity={0.7} style={styles.inviteButton}>*/}
      {/*    <Text style={styles.inviteText}>{invitationCode}</Text>*/}
      {/*    <Copy />*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
      <View style={styles.inviteContainer}>
        <Text style={styles.label}>Invite code</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => handleCopy(inviteLink)} style={styles.inviteButton}>
          <Text style={styles.inviteText}>{inviteLink}</Text>
          <Copy />
        </TouchableOpacity>
      </View>
      <Button title="Share" onPress={handleShare} buttonStyle={styles.shareButton} />
    </View>
  );
};

export default Invitations;
