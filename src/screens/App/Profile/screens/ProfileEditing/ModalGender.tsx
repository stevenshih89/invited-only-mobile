import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Gender from 'assets/images/icons/tabler_gender-bigender.svg';
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
import {useModalGender} from 'hooks/useModalGender';
import * as S from './ModalGender.style';

interface ModalGenderProps {
  isVisible: boolean;
  onClose: () => void;
  showGender: boolean;
  setShowGender: Dispatch<SetStateAction<boolean>>;
  activeGenderItem: {title: string} | null;
  setActiveGenderItem: Dispatch<SetStateAction<{title: string} | null>>;
  listOfGenders: any[];
  saveUserInfo: any;
}

const ModalGender: FC<ModalGenderProps> = ({
  isVisible,
  onClose,
  showGender,
  setShowGender,
  activeGenderItem,
  setActiveGenderItem,
  saveUserInfo,
  listOfGenders,
}) => {
  const {handleUpdateShowInMyProfile, handleUpdateGender} = useModalGender({setShowGender, setActiveGenderItem});

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
          <Gender width={32} height={32} />
        </S.IconContainer>
        <S.TitleText>What is your gender?</S.TitleText>
        <S.Row>
          <S.OptionText>Show in my profile</S.OptionText>
          <Switch
            trackColor={{false: grayColor, true: toggleColor}}
            checked={showGender}
            onChange={val => {
              handleUpdateShowInMyProfile(val);
            }}
          />
        </S.Row>
        <FlatList
          data={listOfGenders}
          scrollEnabled={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            const isActive = activeGenderItem === item.title;
            return (
              <S.OptionContainer isActive={isActive} activeOpacity={0.8} onPress={() => handleUpdateGender(item?.title)}>
                <S.OptionText>{item?.title}</S.OptionText>
              </S.OptionContainer>
            );
          }}
        />
        <Button
          onPress={() => {
            saveUserInfo('Gender');
            onClose();
          }}
          title="Save"
          buttonStyle={{marginTop: 20}}
        />
      </S.Container>
    </Modal>
  );
};

export default ModalGender;
