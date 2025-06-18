import { FC, JSX } from 'react';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { useAddPhotos } from './hooks/useAddPhotos';
import {
  PhotosRow,
  MainPhotoContainer,
  SmallPhotoColumn,
  SmallPhotoTop,
  SmallPhotoBottom,
  AddPhotoButtonMain,
  AddPhotoButtonSmall,
} from './AddPhotos.style';
import * as S from './AddPhotos.style';
import Close from 'assets/images/icons/close.svg';
import Plus from 'assets/images/icons/plus.svg';
import PencilWhiteIcon from 'assets/images/icons/pencil-white.svg';
import ModalDefault from 'components/Modal/ModalDefault/ModalDefault';

const AddPhotos: FC = (): JSX.Element => {
  const { photos, isLoading, handleNext, deleteImage, openLibrary, isModalVisible, handleOpenModal, handleCloseModal, selectedImageId } =
    useAddPhotos();

  return (
    <CommonAuthLayout
      title="Your photos"
      subtitle="Add your first photos. You can change these and add more later."
      startPercentage={30}
      endPercentage={40}
      continueButtonTitle="Continue"
      continueButtonTestID="continue-button"
      onContinuePress={handleNext}
      continueButtonDisabled={!photos[0].image}
      continueButtonLoading={isLoading}
      withKeyboard={false}>
      <PhotosRow>
        <MainPhotoContainer>
          {photos[0].image ? (
            <S.ImageContainer>
              <S.StyledImageBackground resizeMode="cover" source={{ uri: photos[0].image || '' }}>
                <S.ButtonsContainer>
                  <S.ButtonWrapper>
                    <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                    <S.Button activeOpacity={0.7} hitSlop={{ left: 15, bottom: 10 }} onPress={() => openLibrary(photos[0].id)}>
                      <PencilWhiteIcon />
                    </S.Button>
                  </S.ButtonWrapper>
                  <S.ButtonWrapper>
                    <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                    <S.Button activeOpacity={0.7} hitSlop={{ left: 15, bottom: 10 }} onPress={() => handleOpenModal(photos[0].id)}>
                      <Close />
                    </S.Button>
                  </S.ButtonWrapper>
                </S.ButtonsContainer>
                <S.LabelContainer>
                  <S.LabelText>Main</S.LabelText>
                </S.LabelContainer>
              </S.StyledImageBackground>
            </S.ImageContainer>
          ) : (
            <AddPhotoButtonMain testID="add-photo-button-0" onPress={() => openLibrary(photos[0].id)}>
              <Plus />
              <S.LabelContainer>
                <S.LabelText>Main</S.LabelText>
              </S.LabelContainer>
            </AddPhotoButtonMain>
          )}
        </MainPhotoContainer>
        <SmallPhotoColumn>
          <SmallPhotoTop>
            {photos[1].image ? (
              <S.ImageContainer>
                <S.StyledImageBackground resizeMode="cover" source={{ uri: photos[1].image || '' }}>
                  <S.ButtonsContainer>
                    <S.ButtonWrapper>
                      <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                      <S.Button activeOpacity={0.7} hitSlop={{ left: 15, bottom: 10 }} onPress={() => openLibrary(photos[1].id)}>
                        <PencilWhiteIcon />
                      </S.Button>
                    </S.ButtonWrapper>
                    <S.ButtonWrapper>
                      <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                      <S.Button activeOpacity={0.7} hitSlop={{ left: 15, bottom: 10 }} onPress={() => handleOpenModal(photos[1].id)}>
                        <Close />
                      </S.Button>
                    </S.ButtonWrapper>
                  </S.ButtonsContainer>
                  <S.LabelContainer>
                    <S.LabelText>2</S.LabelText>
                  </S.LabelContainer>
                </S.StyledImageBackground>
              </S.ImageContainer>
            ) : (
              <AddPhotoButtonSmall testID="add-photo-button-1" onPress={() => openLibrary(photos[1].id)}>
                <Plus />
                <S.LabelContainer>
                  <S.LabelText>2</S.LabelText>
                </S.LabelContainer>
              </AddPhotoButtonSmall>
            )}
          </SmallPhotoTop>
          <SmallPhotoBottom>
            {photos[2].image ? (
              <S.ImageContainer>
                <S.StyledImageBackground resizeMode="cover" source={{ uri: photos[2].image || '' }}>
                  <S.ButtonsContainer>
                    <S.ButtonWrapper>
                      <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                      <S.Button activeOpacity={0.7} hitSlop={{ left: 15, bottom: 10 }} onPress={() => openLibrary(photos[2].id)}>
                        <PencilWhiteIcon />
                      </S.Button>
                    </S.ButtonWrapper>
                    <S.ButtonWrapper>
                      <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                      <S.Button activeOpacity={0.7} hitSlop={{ left: 15, bottom: 10 }} onPress={() => handleOpenModal(photos[2].id)}>
                        <Close />
                      </S.Button>
                    </S.ButtonWrapper>
                  </S.ButtonsContainer>
                  <S.LabelContainer>
                    <S.LabelText>3</S.LabelText>
                  </S.LabelContainer>
                </S.StyledImageBackground>
              </S.ImageContainer>
            ) : (
              <AddPhotoButtonSmall testID="add-photo-button-2" onPress={() => openLibrary(photos[2].id)}>
                <Plus />
                <S.LabelContainer>
                  <S.LabelText>3</S.LabelText>
                </S.LabelContainer>
              </AddPhotoButtonSmall>
            )}
          </SmallPhotoBottom>
        </SmallPhotoColumn>
      </PhotosRow>
      <ModalDefault
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onConfirm={() => deleteImage(selectedImageId)}
        title="Delete photo"
        description="Are you sure? This can’t be undone."
        cancelText="Cancel"
        confirmText="Delete"
      />
    </CommonAuthLayout>
  );
};

export default AddPhotos;
