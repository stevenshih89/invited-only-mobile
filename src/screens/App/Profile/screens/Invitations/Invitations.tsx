import {Text, TouchableOpacity, View} from 'react-native';
import Copy from 'assets/images/icons/copy.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import Button from 'components/Button/Button';
import useStyles from './styles';

const Invitations = () => {
  const handleCopy = (val: string) => {
    Clipboard.setString(val);
  };

  const styles = useStyles();

  const inviteCode = 'asd2ghla';
  const inviteLink = 'ioinvitlenk/1s1';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You have 5 codes/links</Text>
      <View style={styles.inviteContainer}>
        <Text style={styles.label}>Invite code</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => handleCopy(inviteCode)} style={styles.inviteButton}>
          <Text style={styles.inviteText}>{inviteCode}</Text>
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
      <Button title="Share" buttonStyle={styles.shareButton} />
    </View>
  );
};

export default Invitations;
