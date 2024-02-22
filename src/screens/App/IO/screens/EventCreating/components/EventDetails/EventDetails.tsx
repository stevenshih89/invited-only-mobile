import React, {FC} from 'react';
import {View, Text} from 'react-native';

//import components
import useStyles from 'screens/App/IO/screens/EventCreating/components/EventDetails/styles.ts';

const EventDetails: FC = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>EventDetails</Text>
    </View>
  );
};

export default EventDetails;
