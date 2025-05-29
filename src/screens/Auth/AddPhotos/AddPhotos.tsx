import {FC, JSX} from 'react';
import {Keyboard} from 'react-native';
import {useAddPhotos} from './hooks/useAddPhotos';
import {
  GradientBackground,
  AvoidingContainer,
  TouchableDismiss,
  SafeArea,
  Wrapper,
  Header,
  TopRow,
  TitleContainer,
  Title,
  Subtitle,
  PhotosRow,
  MainPhotoContainer,
  SmallPhotoColumn,
  SmallPhotoTop,
  SmallPhotoBottom,
  AddPhotoButtonMain,
  AddPhotoButtonSmall,
  LabelContainer,
  LabelText,
  ContinueButtonContainer,
} from './AddPhotos.style';
import * as S from './AddPhotos.style';
import {useAppNavigation} from 'hooks/useAppNavigation';
import Button from 'components/Button/Button';
import AuthProgress from 'components/AuthProgress';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import Close from 'assets/images/icons/close.svg';
import Plus from 'assets/images/icons/plus.svg';
import PencilWhiteIcon from 'assets/images/icons/pencil-white.svg';
import BackButton from 'src/sharedComponents/BackButton/BackButton';

const AddPhotos: FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const {photos, isLoading, handleNext, deleteImage, openLibrary} = useAddPhotos();

  return (
    <GradientBackground>
      <AvoidingContainer>
        <TouchableDismiss onPress={Keyboard.dismiss}>
          <SafeArea>
            <Wrapper>
              <Header>
                <TopRow>
                  <BackButton onPress={() => navigation.goBack()} />
                  <LogoPrimary2 />
                  <AuthProgress startPercentage={30} endPercentage={40} animationDuration={1000} />
                </TopRow>
                <TitleContainer>
                  <Title>Your photos</Title>
                  <Subtitle>Add your first photos. You can change these and add more later.</Subtitle>
                </TitleContainer>
                <PhotosRow>
                  <MainPhotoContainer>
                    {photos[0].image ? (
                      <S.ImageContainer>
                        <S.StyledImageBackground resizeMode="cover" source={{uri: photos[0].image || ''}}>
                          <S.ButtonsContainer>
                            <S.ButtonWrapper>
                              <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                              <S.Button activeOpacity={0.7} hitSlop={{left: 15, bottom: 10}} onPress={() => openLibrary(photos[0].id)}>
                                <PencilWhiteIcon />
                              </S.Button>
                            </S.ButtonWrapper>
                            <S.ButtonWrapper>
                              <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                              <S.Button activeOpacity={0.7} hitSlop={{left: 15, bottom: 10}} onPress={() => deleteImage(photos[0].id)}>
                                <Close />
                              </S.Button>
                            </S.ButtonWrapper>
                          </S.ButtonsContainer>
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
                          <S.StyledImageBackground resizeMode="cover" source={{uri: photos[1].image || ''}}>
                            <S.ButtonsContainer>
                              <S.ButtonWrapper>
                                <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                <S.Button activeOpacity={0.7} hitSlop={{left: 15, bottom: 10}} onPress={() => openLibrary(photos[1].id)}>
                                  <PencilWhiteIcon />
                                </S.Button>
                              </S.ButtonWrapper>
                              <S.ButtonWrapper>
                                <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                <S.Button activeOpacity={0.7} hitSlop={{left: 15, bottom: 10}} onPress={() => deleteImage(photos[1].id)}>
                                  <Close />
                                </S.Button>
                              </S.ButtonWrapper>
                            </S.ButtonsContainer>
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
                          <S.StyledImageBackground resizeMode="cover" source={{uri: photos[2].image || ''}}>
                            <S.ButtonsContainer>
                              <S.ButtonWrapper>
                                <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                <S.Button activeOpacity={0.7} hitSlop={{left: 15, bottom: 10}} onPress={() => openLibrary(photos[2].id)}>
                                  <PencilWhiteIcon />
                                </S.Button>
                              </S.ButtonWrapper>
                              <S.ButtonWrapper>
                                <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                <S.Button activeOpacity={0.7} hitSlop={{left: 15, bottom: 10}} onPress={() => deleteImage(photos[2].id)}>
                                  <Close />
                                </S.Button>
                              </S.ButtonWrapper>
                            </S.ButtonsContainer>
                          </S.StyledImageBackground>
                        </S.ImageContainer>
                      ) : (
                        <AddPhotoButtonSmall testID="add-photo-button-2" onPress={() => openLibrary(photos[2].id)}>
                          <Plus />
                          <LabelContainer>
                            <LabelText>3</LabelText>
                          </LabelContainer>
                        </AddPhotoButtonSmall>
                      )}
                    </SmallPhotoBottom>
                  </SmallPhotoColumn>
                </PhotosRow>
              </Header>
              <ContinueButtonContainer>
                <Button onPress={handleNext} loading={isLoading} title="Continue" disabled={!photos[0].image} />
              </ContinueButtonContainer>
            </Wrapper>
          </SafeArea>
        </TouchableDismiss>
      </AvoidingContainer>
    </GradientBackground>
  );
};

export default AddPhotos;
