import React, {FC, useState} from 'react';
import {View} from 'react-native';

//import components
import useStyles from 'screens/App/MyEvents/styles.ts';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard.tsx';

//import images
import FakeGirl1 from 'assets/images/app/fake-girl-1.png';
import FakeGirl2 from 'assets/images/app/fake-girl-2.png';

const MyEvents: FC = () => {
  const styles = useStyles();
  const [invitingPeople] = useState([
    {
      image: FakeGirl1,
      state: true,
    },
    {
      image: FakeGirl2,
      state: false,
    },
  ]);
  return (
    <View style={styles.container}>
      <MyEventsCard
        activeState={true}
        allPeople={10}
        date={'10.12.2024'}
        textCityName="Amazonico Dubai"
        estimeTime="2h"
        numberOfGirlsInvited=""
        invitingPeople={invitingPeople}
      />
    </View>
  );
};

export default MyEvents;
