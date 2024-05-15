import {Text, View, Image} from 'react-native';
import React, {useContext} from 'react';

//import components
import CreateEventImage from 'assets/images/auth/tutorial-start-1.png';
import SelectEventImage from 'assets/images/auth/tutorial-start-1-guest.png';
import useStyles from 'screens/Auth/TutorialsFlow/components/CreateEvent/styles.ts';
import {AuthContext} from 'contexts/AuthContext.tsx';

const CreateEvent = () => {
  const {onBoarding} = useContext(AuthContext);
  const accountType = onBoarding[0]?.accountType === 'guest';
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} resizeMode="contain" source={accountType ? SelectEventImage : CreateEventImage} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textCreateEvent}>{accountType ? 'Select event' : 'Create event'}</Text>
        <Text style={styles.textAddYourEvent}>
          {accountType
            ? 'Explore and join events happening around you, and get invited to exciting experiences'
            : 'Add your event or table details, select who you want to invite, and specify the number of invites'}
        </Text>
      </View>
    </View>
  );
};

export default CreateEvent;
