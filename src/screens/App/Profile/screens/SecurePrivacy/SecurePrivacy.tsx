import React, {FC} from 'react';
import {Text, View} from 'react-native';

//import components
import useStyles from 'screens/App/Profile/screens/SecurePrivacy/styles.ts';

const SecurePrivacy: FC = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.textSecurity}>Security</Text>
        <Text style={styles.textDescription}>
          Your security and privacy are our utmost concern. Our mobile app is designed with advanced measures to ensure the protection of your
          personal information. Rest easy knowing that your data is handled with the highest level of security and confidentiality, providing you with
          a safe and private experience
        </Text>
      </View>
    </View>
  );
};

export default SecurePrivacy;
