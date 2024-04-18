import {Alert, Share, Text, TouchableOpacity, View} from 'react-native';
import Copy from 'assets/images/icons/copy.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import Button from 'components/Button/Button';
import useStyles from './styles';
import {FC} from 'react';
import {showToast} from 'helpers/showToast.ts';
import {useUser} from '../../../../../store/userStore';

const Invitations: FC<any> = ({invitationCode}) => {
  const styles = useStyles();

  const userHost = useUser((i: any) => i?.user);
  const inviteLink = userHost?.codeForInvitingOtherUsers;

  const handleCopy = (val: string) => {
    Clipboard.setString(val);
    showToast('success', '', 'Invite code copied!');
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You have 5 codes/links</Text>
      <View style={styles.inviteContainer}>
        <Text style={styles.label}>Invite code</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.inviteButton}>
          <Text style={styles.inviteText}>{invitationCode}</Text>
          <Copy />
        </TouchableOpacity>
      </View>
      <View style={styles.inviteContainer}>
        <Text style={styles.label}>Invite link</Text>
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
