import {Image, Text, View} from 'react-native';
import React from 'react';

//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/ApproveGuest/styles.ts';
import ApproveGuestImage from 'assets/images/auth/tutorial-start-4.png';

const ApproveGuest = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={ApproveGuestImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textApproveGuest}>Approve Guest</Text>
        <Text style={styles.textSelectAndApprove}>Select and approve guests for your event to finalize the guest list</Text>
      </View>
    </View>
  );
};

export default ApproveGuest;
