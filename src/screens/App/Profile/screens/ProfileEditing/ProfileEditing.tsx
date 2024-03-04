import {lightGray6Color, transparentWhite16Color} from 'constants/colors';
import {FC, ReactElement} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import MyPhotos from './MyPhotos';
import MyInterests from './MyInterests';
import {screenHeight} from 'constants/common';
import MyBio from './MyBio';
import LanguagesKnow from './LanguagesKnow';
import Button from 'components/Button/Button';
import MyBasics from './MyBasics';

const ProfileEditing: FC = (): ReactElement => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: lightGray6Color}}>
      <View style={{flex: 1, paddingTop: screenHeight / 48, paddingHorizontal: 20}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 20, paddingBottom: 80}}
          style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
          <MyPhotos />
          <MyInterests />
          <MyBio />
          <MyBasics />
          <LanguagesKnow />
          <Button title="Save" buttonStyle={{marginTop: 34}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEditing;
