import {FC} from 'react';
import Modal from 'react-native-modal';
import * as S from './ModalSuperJoin.style';
import Logo from 'assets/images/icons/logo.svg';
import SuperJoinBackground from 'assets/images/app/super-join-background.png';
import CheckIcon from 'assets/images/icons/check-star-white.svg';

interface ModalSuperJoinProps {
  isVisible: boolean;
  onClose: () => void;
  userImage: string;
  userName: string;
  eventImage: string;
}

const ModalSuperJoin: FC<ModalSuperJoinProps> = ({isVisible, onClose, userImage, userName, eventImage}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      backdropOpacity={1}
      style={{margin: 0, padding: 0}}
      useNativeDriver={true}>
      <S.ModalContent>
        <S.LogoWrapper>
          <Logo />
        </S.LogoWrapper>
        <S.BackgroundWrapper>
          <S.BackgroundImage source={SuperJoinBackground} resizeMode="contain">
            <S.Container>
              <S.ImageContainer>
                <S.UserImage
                  testID="user-image"
                  source={{
                    uri: eventImage || 'https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?w=537&ssl=1',
                  }}
                />
                <S.OverlayContainer>
                  <S.TagRow>
                    <S.UserTag>
                      <S.TagUserAvatar
                        source={{
                          uri: userImage || 'https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?w=537&ssl=1',
                        }}
                      />
                      <S.UserNameText>{userName || 'Name'}</S.UserNameText>
                    </S.UserTag>
                    <S.CheckTag>
                      <CheckIcon />
                    </S.CheckTag>
                  </S.TagRow>
                </S.OverlayContainer>
              </S.ImageContainer>
            </S.Container>
          </S.BackgroundImage>
        </S.BackgroundWrapper>
      </S.ModalContent>
    </Modal>
  );
};

export default ModalSuperJoin;
