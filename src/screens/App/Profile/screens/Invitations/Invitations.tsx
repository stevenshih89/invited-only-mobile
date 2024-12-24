import {FC, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

//import components
import {useUser} from '../../../../../store/userStore';
import {showToast} from 'helpers/showToast.ts';
import useStyles from './styles';
import Copy from 'assets/images/icons/copy.svg';
import {grayColor, whiteColor} from 'constants/colors';

const Invitations: FC = () => {
  const [numberCodes, setNumberCodes] = useState<number>();
  const styles = useStyles();

  const userHost = useUser((i: any) => i?.user);

  const inviteLink = userHost?.codeForInvitingOtherUsers;

  const handleCopy = (val: string) => {
    Clipboard.setString(val);
    showToast('inviteMatch', '', 'Invite code copied!');
  };

  useEffect(() => {
    setNumberCodes(inviteLink.length);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You have {numberCodes} App invitations codes</Text>
      <Text style={styles.label}>IO Invitations</Text>
      <ScrollView>
        {inviteLink.map(item => (
          <View style={styles.inviteContainer}>
            <TouchableOpacity
              disabled={!item.isActive}
              activeOpacity={0.7}
              onPress={() => handleCopy(item.inviteCode)}
              style={styles.inviteButton}>
              <Text style={[styles.inviteText, {color: !item.isActive ? grayColor : whiteColor}]}>{item.inviteCode}</Text>
              {item.isActive && <Copy />}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Invitations;
