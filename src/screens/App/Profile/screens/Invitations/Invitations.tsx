import {FC} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

//import components
import useStyles from './styles';
import Copy from 'assets/images/icons/copy.svg';
import {grayColor, whiteColor} from 'constants/colors';
import { useInvitations } from 'hooks/useInvitations';

const Invitations: FC = () => {
  const {
    handleCopy,
    inviteLink,
    numberCodes
  } = useInvitations();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You have {numberCodes} App invitations codes</Text>
      <Text style={styles.label}>IO Invitations</Text>
      <ScrollView>
        {inviteLink.map((item: any) => (
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
