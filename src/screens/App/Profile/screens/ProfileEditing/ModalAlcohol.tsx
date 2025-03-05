import {FlatList} from 'react-native';
import Modal from 'react-native-modal';
import Champagne from 'assets/images/icons/champagne.svg';
import {
  grayColor,
  toggleColor,
} from 'constants/colors';
import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction} from 'react';
import Button from 'components/Button/Button';
import { useModalAlcohol } from 'hooks/useModalAlcohol';
import * as S from './ModalAlcohol.style';

interface ModalAlcoholProps {
  isVisible: boolean;
  onClose: () => void;
  showAlcohol: boolean;
  setShowAlcohol: Dispatch<SetStateAction<boolean>>;
  activeAlcoholItem: {title: string} | null;
  setActiveAlcoholItem: Dispatch<SetStateAction<{title: string} | null>>;
  listOfAlcohols: any[];
  saveUserInfo: any;
}

const ModalAlcohol: FC<ModalAlcoholProps> = ({
  isVisible,
  onClose,
  showAlcohol,
  setShowAlcohol,
  activeAlcoholItem,
  setActiveAlcoholItem,
  listOfAlcohols,
  saveUserInfo,
}) => {
  const {
    handleUpdateAlcohol,
    handleUpdateShowInMyProfile
  } = useModalAlcohol(setShowAlcohol, setActiveAlcoholItem)
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
      <S.ModalContainer>
        <S.HandleBar />
        <S.IconContainer>
          <Champagne width={32} height={32} />
        </S.IconContainer>
        <S.TitleText>Do you drink alcohol?</S.TitleText>
        <S.Row>
          <S.OptionText>Show in my profile</S.OptionText>
          <Switch
            trackColor={{false: grayColor, true: toggleColor}}
            checked={showAlcohol}
            onChange={(val: boolean) => handleUpdateShowInMyProfile(val)}
          />
        </S.Row>
        <FlatList
          data={listOfAlcohols}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            const isActive = activeAlcoholItem === item.title;
            return (
              <S.OptionContainer
                isActive={isActive}
                activeOpacity={0.8}
                onPress={() => handleUpdateAlcohol(item?.title)}>
                <S.OptionText>{item.title}</S.OptionText>
              </S.OptionContainer>
            );
          }}
        />
        <Button
          onPress={() => {
            saveUserInfo('Alcohol');
            onClose();
          }}
          title="Save"
          buttonStyle={{marginTop: 20}}
        />
      </S.ModalContainer>
    </Modal>
  );
};

export default ModalAlcohol;
