import {Image, Text, View} from 'react-native';

//import components
import useStyles from 'screens/Auth/TutorialsFlow/components/GetInviteMatch/styles.ts';
import GetInviteMatchGuestImage from 'assets/images/auth/tutorial-guest-2.png';

const GetInviteMatch = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image resizeMode="contain" style={styles.image} source={GetInviteMatchGuestImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textGetInviteMatch}>Build your event list</Text>
        <Text style={styles.textExploreAndGetInviteMatch}>Build your list of unforgettable experiences from attending events.</Text>
      </View>
    </View>
  );
};

export default GetInviteMatch;
