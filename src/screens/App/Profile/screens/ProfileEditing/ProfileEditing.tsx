import {lightGray6Color, transparentWhite16Color} from 'constants/colors';
import {FC, ReactElement, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import MyPhotos from './MyPhotos';
import MyInterests from './MyInterests';
import {screenHeight} from 'constants/common';
import MyBio from './MyBio';
import LanguagesKnow from './LanguagesKnow';
import Button from 'components/Button/Button';
import MyBasics from './MyBasics';
import ModalSmoke from './ModalSmoke';
import ModalGender from './ModalGender';
import ModalHeight from './ModalHeight';

const ProfileEditing: FC = (): ReactElement => {
  const [isVisibleSmokeModal, setIsVisibleSmokeModal] = useState<boolean>(false);
  const [isVisibleGenderModal, setIsVisibleGenderModal] = useState<boolean>(false);
  const [isVisibleHeightModal, setIsVisibleHeightModal] = useState<boolean>(false);

  return (
    <>
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
            <MyBasics
              setIsVisibleSmokeModal={setIsVisibleSmokeModal}
              setIsVisibleGenderModal={setIsVisibleGenderModal}
              setIsVisibleHeightModal={setIsVisibleHeightModal}
            />
            <LanguagesKnow />
            <Button title="Save" buttonStyle={{marginTop: 34}} />
          </ScrollView>
        </View>
      </SafeAreaView>
      <ModalSmoke isVisible={isVisibleSmokeModal} onClose={() => setIsVisibleSmokeModal(false)} />
      <ModalGender isVisible={isVisibleGenderModal} onClose={() => setIsVisibleGenderModal(false)} />
      <ModalHeight isVisible={isVisibleHeightModal} onClose={() => setIsVisibleHeightModal(false)} />
    </>
  );
};

export default ProfileEditing;
