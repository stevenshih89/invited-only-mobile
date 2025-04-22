import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction} from 'react';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import * as S from './ModalHeight.style';
import Button from 'components/Button/Button';
import Height from 'assets/images/icons/arrow-3.svg';
import { grayColor, toggleColor, whiteColor} from 'constants/colors';

interface ModalHeightProps {
  isVisible: boolean;
  onClose: () => void;
  showHeight: boolean;
  setShowHeight: Dispatch<SetStateAction<boolean>>;
  height: string | null;
  setHeight: Dispatch<SetStateAction<string | null>>;
  heightsList: {id: number; value: number; label: string}[];
  saveUserInfo: any;
}

const ModalHeight: FC<ModalHeightProps> = ({
  isVisible,
  onClose,
  showHeight,
  setShowHeight,
  height,
  setHeight,
  heightsList,
  saveUserInfo,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}>
      <S.Container>
        <S.HandleBar />
        <S.IconContainer>
          <Height height={32} width={32} />
        </S.IconContainer>
        <S.TitleText>What is your height?</S.TitleText>
        <S.Row>
          <S.OptionText>Show in my profile</S.OptionText>
          <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showHeight} onChange={val => setShowHeight(val)} />
        </S.Row>
        <S.HeightDisplay>
          <S.HeightText>{height} cm</S.HeightText>
        </S.HeightDisplay>
        <Picker selectedValue={height} onValueChange={val => setHeight(val)}>
          {heightsList.map(({id, value, label}) => (
            <Picker.Item value={value} key={id} label={label} color={whiteColor} />
          ))}
        </Picker>
        <Button
          onPress={() => {
            saveUserInfo('Height');
            onClose();
          }}
          title="Save"
          buttonStyle={{marginTop: 20}}
        />
      </S.Container>
    </Modal>
  );
};

export default ModalHeight;
