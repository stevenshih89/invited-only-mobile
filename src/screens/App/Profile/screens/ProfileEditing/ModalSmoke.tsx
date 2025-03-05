import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Smoke from 'assets/images/icons/smoke.svg';
import {
  blackColor,
  grayColor,
  lightGray15Color,
  toggleColor,
  transparentGray90Color,
  transparentWhite16Color,
  whiteColor,
} from 'constants/colors';
import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400} from 'constants/fonts';
import Button from 'components/Button/Button';
import * as S from './ModalSmoke.style';

interface ModalSmokeProps {
  isVisible: boolean;
  onClose: () => void;
  showSmoke: boolean;
  setShowSmoke: Dispatch<SetStateAction<boolean>>;
  activeSmokeItem: {id: number; title: string} | null;
  setActiveSmokeItem: Dispatch<SetStateAction<{id: number; title: string} | null>>;
  listOfSmokes: {id: number; title: string}[];
  saveUserInfo: any;
}

const ModalSmoke: FC<ModalSmokeProps> = ({
  isVisible,
  onClose,
  showSmoke,
  setShowSmoke,
  activeSmokeItem,
  setActiveSmokeItem,
  listOfSmokes,
  saveUserInfo,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <S.Container>
        <S.HandleBar />
        <S.IconContainer>
          <Smoke width={32} height={32} />
        </S.IconContainer>
        <S.TitleText>Do you smoke?</S.TitleText>
        <S.Row>
          <S.OptionText>Show in my profile</S.OptionText>
          <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showSmoke} onChange={val => setShowSmoke(val)} />
        </S.Row>
        <FlatList
          data={listOfSmokes}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          renderItem={({item}) => {
            const isActive = activeSmokeItem?.id === item.id;
            return (
              <S.OptionContainer isActive={isActive} activeOpacity={0.8} onPress={() => setActiveSmokeItem(item)}>
                <S.OptionText>{item.title}</S.OptionText>
              </S.OptionContainer>
            );
          }}
        />
        <Button
          onPress={() => {
            saveUserInfo('Smoke');
            onClose();
          }}
          title="Save"
          buttonStyle={{marginTop: 20}}
        />
      </S.Container>
    </Modal>
  );
};

export default ModalSmoke;
