import {FC, JSX} from 'react';
import {Keyboard, View} from 'react-native';
import {useAddPhotos} from './hooks/useAddPhotos';
import {
  GradientBackground,
  AvoidingContainer,
  TouchableDismiss,
  SafeArea,
  Wrapper,
  Header,
  TopRow,
  BackButton,
  TitleContainer,
  Title,
  Subtitle,
  PhotosRow,
  MainPhotoContainer,
  SmallPhotoColumn,
  SmallPhotoTop,
  SmallPhotoBottom,
  ImageWrapper,
  PhotoBackground,
  CloseButton,
  AddPhotoButtonMain,
  AddPhotoButtonSmall,
  LabelContainer,
  LabelText,
  ContinueButtonContainer,
} from './AddPhotos.style';
import {useAppNavigation} from 'hooks/useAppNavigation';
import Button from 'components/Button/Button';
import AuthProgress from 'components/AuthProgress';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Close from 'assets/images/icons/close.svg';
import Plus from 'assets/images/icons/plus.svg';

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
                  <BackButton onPress={() => navigation.goBack()}>
                    <ArrowLeft />
                  </BackButton>
                  <LogoPrimary2 />
                  <AuthProgress startPercentage={30} endPercentage={40} animationDuration={1000} />
                </TopRow>
                <TitleContainer>
                  <Title>My photos</Title>
                  <Subtitle>Add your first photos. You can change these and add more later.</Subtitle>
                </TitleContainer>
                <PhotosRow>
                  <MainPhotoContainer>
                    {photos[0].image ? (
                      <ImageWrapper>
                        <PhotoBackground source={{uri: photos[0].image}}>
                          <CloseButton onPress={() => deleteImage(photos[0].id)}>
                            <Close />
                          </CloseButton>
                          <LabelContainer>
                            <LabelText>Main</LabelText>
                          </LabelContainer>
                        </PhotoBackground>
                      </ImageWrapper>
                    ) : (
                      <AddPhotoButtonMain testID="add-photo-button-0" onPress={() => openLibrary(photos[0].id)}>
                        <View />
                        <Plus />
                        <LabelContainer>
                          <LabelText>Main</LabelText>
                        </LabelContainer>
                      </AddPhotoButtonMain>
                    )}
                  </MainPhotoContainer>
                  <SmallPhotoColumn>
                    <SmallPhotoTop>
                      {photos[1].image ? (
                        <ImageWrapper>
                          <PhotoBackground source={{uri: photos[1].image}}>
                            <CloseButton onPress={() => deleteImage(photos[1].id)}>
                              <Close />
                            </CloseButton>
                          </PhotoBackground>
                        </ImageWrapper>
                      ) : (
                        <AddPhotoButtonSmall testID="add-photo-button-1" onPress={() => openLibrary(photos[1].id)}>
                          <Plus />
                        </AddPhotoButtonSmall>
                      )}
                    </SmallPhotoTop>
                    <SmallPhotoBottom>
                      {photos[2].image ? (
                        <ImageWrapper>
                          <PhotoBackground source={{uri: photos[2].image}}>
                            <CloseButton onPress={() => deleteImage(photos[2].id)}>
                              <Close />
                            </CloseButton>
                          </PhotoBackground>
                        </ImageWrapper>
                      ) : (
                        <AddPhotoButtonSmall testID="add-photo-button-2" onPress={() => openLibrary(photos[2].id)}>
                          <Plus />
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
