import {Text, View, Image} from 'react-native';
import React from 'react';

//import components
import CreateEventImage from 'assets/images/auth/tutorial-start-1.png';
import useStyles from 'screens/Auth/TutorialsFlow/components/CreateEvent/styles.ts';

const CreateEvent = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} resizeMode="stretch" source={CreateEventImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textCreateEvent}>Create event</Text>
        <Text style={styles.textAddYourEvent}>
          Add your event or table details, select who you want to invite, and specify the number of invites
        </Text>
      </View>
    </View>
  );
};

export default CreateEvent;
