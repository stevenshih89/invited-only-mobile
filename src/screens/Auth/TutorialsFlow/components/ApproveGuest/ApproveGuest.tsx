import {Image, Text, View} from 'react-native';
import React, {useContext} from 'react';

//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/ApproveGuest/styles.ts';
import ApproveGuestImage from 'assets/images/auth/tutorial-start-4.png';
import {AuthContext} from 'contexts/AuthContext.tsx';

const ApproveGuest = () => {
  const {onBoarding} = useContext(AuthContext);
  const accountType = onBoarding[0]?.accountType === 'guest';
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image resizeMode="stretch" style={styles.image} source={ApproveGuestImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textApproveGuest}>{accountType ? 'Approve invitation' : 'Approve Guest'}</Text>
        <Text style={styles.textSelectAndApprove}>
          {accountType
            ? 'Do you like the invitation? Accept it and have fun together!'
            : 'Select and approve guests for your event to finalize the guest list'}
        </Text>
      </View>
    </View>
  );
};

export default ApproveGuest;
