import {Text, TouchableOpacity, View} from 'react-native';
import {useFormikContext} from 'formik';

import {components} from '@invited-only/invited-only-api';
import {FC, useContext, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import useAddModalPhotos from '../EventPlaceStep/AddPhotoMoald/hooks/useAddPhotoModal';
import ModalAddPhoto from '../EventPlaceStep/AddPhotoMoald/ModalAddPhoto';
import * as S from './PreviewEventStep.style';
import {CardActionsButtons} from 'screens/App/Components/Card/Components/CardActionButtons/CardActionsButtons';
import CardsNameAndDate from 'screens/App/Components/Card/Components/CardsNameAndDate/CardsNameAndDate';
import {useAuthStore} from 'src/store/authStore';
import {BackendApiContext} from 'contexts/BackendApiContex';
import Close from 'assets/images/icons/close.svg';
import PencilWhiteIcon from 'assets/images/icons/pencil-white.svg';
import AddImage from 'assets/images/icons/add-image.svg';
import CouponFill from 'assets/images/icons/coupon-fill.svg';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {blackColor, whiteColor} from 'constants/colors';
import ModalDefault from 'components/Modal/ModalDefault/ModalDefault';
import {screenHeight} from 'constants/common';

interface PreviewEventStepProps {
    handleNextStep: () => void;
    handleBackStep: () => void;
    isEditing: boolean;
}
const placeholderPhoto =
    'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2Fevent_placeholder_with_text.png?alt=media&token=0552818b-400e-4930-aaf2-98a2811ca24e';
const PreviewEventStep: FC<PreviewEventStepProps> = ({handleNextStep, handleBackStep, isEditing}) => {
    const {values, setFieldValue} = useFormikContext<Partial<components['schemas']['EventData']>>();
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const {userMetadata} = useAuthStore();
    const {data: user} = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
        enabled: !!userMetadata.uid,
        params: {
            path: {
                id: userMetadata.uid,
            },
        },
    });

    const {
        handleAddPlaceholderPhoto,
        handleOpenCamera,
        handleOpenLibrary,
        handleOpenPhotoModal,
        isPhotoModalVisible,
        closeModal,
        tempPhotosStorage,
        handleOpenCropper,
    } = useAddModalPhotos();

    const [usePlaceholderPhoto, setUsePlaceholderPhoto] = useState(false);
    const [deleteImageModal, setDeleteImageModal] = useState(false);
    const [deleteImageIndex, setDeleteImageIndex] = useState<number | null>(null);

    const handelTogglePlaceholderPhoto = (value: boolean) => {
        setUsePlaceholderPhoto(value);
        if (value) {
            setFieldValue('photos', [{image: placeholderPhoto}, {image: placeholderPhoto}, {image: placeholderPhoto}]);
        } else {
            setFieldValue('photos', [{image: tempPhotosStorage[0]}, {image: tempPhotosStorage[1]}, {image: tempPhotosStorage[2]}]);
        }
    };

    const handleDeleteImage = () => {
        if (deleteImageIndex) {
            setFieldValue(`photos.${deleteImageIndex - 1}`, null);
        }
        setDeleteImageIndex(null);
        setDeleteImageModal(false);
    };

    const totalGuests = (values.maleFriend ?? 0) + (values.femaleFriend ?? 0);

    return (
        <S.Wrapper>
            <S.ScrollContainer>
                <S.Content>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleOpenPhotoModal(0)}
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            borderRadius: 10,
                        }}>
                        <S.Container source={{uri: values.photos?.[0]?.image ?? ''}} resizeMode="cover" imageStyle={{borderRadius: 10}}>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <S.BadgeContainer>
                                    <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                    <FastImage
                                        source={{uri: user?.photos?.[0]?.image ?? ''}}
                                        style={{width: screenHeight / 40, height: screenHeight / 40, borderRadius: 20}}
                                    />
                                    <Text
                                        style={{
                                            color: whiteColor,
                                            fontSize: RFValue(14, 932),
                                            fontFamily: Satoshi500,
                                        }}>
                                        {user?.name}
                                    </Text>
                                </S.BadgeContainer>
                            </View>
                            {values.photos?.[0]?.image && (
                                <S.ButtonsContainer
                                    style={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 10,
                                    }}>
                                    <S.ButtonWrapper>
                                        <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                        <S.Button activeOpacity={0.7} hitSlop={{left: 15, bottom: 10}} onPress={() => handleOpenCropper(0)}>
                                            <PencilWhiteIcon />
                                        </S.Button>
                                    </S.ButtonWrapper>
                                    <S.ButtonWrapper>
                                        <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                        <S.Button
                                            activeOpacity={0.7}
                                            hitSlop={{left: 15, bottom: 10}}
                                            onPress={() => {
                                                setDeleteImageModal(true);
                                                setDeleteImageIndex(0);
                                            }}>
                                            <Close />
                                        </S.Button>
                                    </S.ButtonWrapper>
                                </S.ButtonsContainer>
                            )}
                            {!values.photos?.[0]?.image && (
                                <View
                                    style={{
                                        alignItems: 'center',
                                        gap: 12,
                                    }}>
                                    <AddImage />
                                    <Text
                                        style={{
                                            color: 'rgba(143, 143, 143, 1)',
                                            fontFamily: Satoshi500,
                                            fontSize: RFValue(16, 932),
                                        }}>
                                        Add photo here
                                    </Text>
                                </View>
                            )}
                            <View>
                                <S.CardContent>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 8,
                                            paddingHorizontal: 10,
                                            paddingVertical: 6,
                                            backgroundColor: '#232323',
                                            borderRadius: 100,
                                        }}>
                                        <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                        <CouponFill width={16} height={16} />
                                        <Text
                                            style={{
                                                color: whiteColor,
                                                fontFamily: Satoshi500,
                                                fontSize: RFValue(14, 932),
                                            }}>
                                            {totalGuests}
                                        </Text>
                                    </View>
                                    <CardsNameAndDate eventName={values.name ?? ''} date={values.date ?? ''} hour={values.hour ?? ''} />
                                    <CardActionsButtons disabled={true} />
                                </S.CardContent>
                            </View>
                            <LinearGradient
                                colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 1)']}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: screenHeight / 4,
                                    zIndex: 1,
                                }}
                            />
                        </S.Container>
                    </TouchableOpacity>
                </S.Content>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 24, marginBottom: 20}}>
                    <CheckBox
                        value={usePlaceholderPhoto}
                        onValueChange={handelTogglePlaceholderPhoto}
                        style={{
                            transform: [{scaleX: 0.75}, {scaleY: 0.75}],
                        }}
                        boxType="square"
                        tintColor={whiteColor}
                        onFillColor={whiteColor}
                        onTintColor={whiteColor}
                        onCheckColor={blackColor}
                    />
                    <Text
                        style={{
                            color: 'rgba(255, 255, 255, 0.64)',
                            fontFamily: Satoshi400,
                            fontSize: RFValue(16, 932),
                            marginBottom: 5,
                        }}>
                        Use Placeholder
                    </Text>
                </View>
                <S.MainPhotoContainer>
                    {values?.photos?.[1]?.image ? (
                        <S.ImageContainer>
                            <S.StyledImageBackground resizeMode="cover" source={{uri: values?.photos?.[1]?.image || ''}}>
                                <S.ButtonsContainer>
                                    <S.ButtonWrapper>
                                        <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                        <S.Button activeOpacity={0.7} hitSlop={{left: 15, bottom: 10}} onPress={() => handleOpenCropper(1)}>
                                            <PencilWhiteIcon />
                                        </S.Button>
                                    </S.ButtonWrapper>
                                    <S.ButtonWrapper>
                                        <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                        <S.Button
                                            activeOpacity={0.7}
                                            hitSlop={{left: 15, bottom: 10}}
                                            onPress={() => {
                                                setDeleteImageModal(true);
                                                setDeleteImageIndex(1);
                                            }}>
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
                        <S.AddPhotoButtonMain testID="add-photo-button-0" onPress={() => handleOpenPhotoModal(1)}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    gap: 12,
                                }}>
                                <AddImage />
                                <Text
                                    style={{
                                        color: 'rgba(143, 143, 143, 1)',
                                        fontFamily: Satoshi500,
                                        fontSize: RFValue(16, 932),
                                    }}>
                                    Add photo here
                                </Text>
                            </View>
                            <S.LabelContainer>
                                <S.LabelText>2</S.LabelText>
                            </S.LabelContainer>
                        </S.AddPhotoButtonMain>
                    )}
                </S.MainPhotoContainer>
                <S.MainPhotoContainer>
                    {values?.photos?.[2]?.image ? (
                        <S.ImageContainer>
                            <S.StyledImageBackground resizeMode="cover" source={{uri: values?.photos?.[2]?.image || ''}}>
                                <S.ButtonsContainer>
                                    <S.ButtonWrapper>
                                        <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                        <S.Button activeOpacity={0.7} hitSlop={{left: 15, bottom: 10}} onPress={() => handleOpenCropper(2)}>
                                            <PencilWhiteIcon />
                                        </S.Button>
                                    </S.ButtonWrapper>
                                    <S.ButtonWrapper>
                                        <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                                        <S.Button
                                            activeOpacity={0.7}
                                            hitSlop={{left: 15, bottom: 10}}
                                            onPress={() => {
                                                setDeleteImageModal(true);
                                                setDeleteImageIndex(2);
                                            }}>
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
                        <S.AddPhotoButtonMain testID="add-photo-button-0" onPress={() => handleOpenPhotoModal(2)}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    gap: 12,
                                }}>
                                <AddImage />
                                <Text
                                    style={{
                                        color: 'rgba(143, 143, 143, 1)',
                                        fontFamily: Satoshi500,
                                        fontSize: RFValue(16, 932),
                                    }}>
                                    Add photo here
                                </Text>
                            </View>
                            <S.LabelContainer>
                                <S.LabelText>3</S.LabelText>
                            </S.LabelContainer>
                        </S.AddPhotoButtonMain>
                    )}
                </S.MainPhotoContainer>
                <S.ButtonsContainer>
                    <S.CancelButton onPress={handleBackStep}>
                        <S.CancelButtonText>Cancel</S.CancelButtonText>
                    </S.CancelButton>
                    <S.ContinueButton onPress={handleNextStep}>
                        <S.ContinueButtonText>{isEditing ? 'Update Event' : 'Share Event/Table'}</S.ContinueButtonText>
                    </S.ContinueButton>
                </S.ButtonsContainer>
            </S.ScrollContainer>
            <ModalAddPhoto
                isVisible={isPhotoModalVisible}
                onClose={closeModal}
                openCamera={handleOpenCamera}
                openLibrary={handleOpenLibrary}
                addPlaceholderPhoto={handleAddPlaceholderPhoto}
            />
            <ModalDefault
                isVisible={deleteImageModal}
                onClose={() => setDeleteImageModal(false)}
                onConfirm={() => {
                    handleDeleteImage();
                }}
                confirmText="Delete"
                title="Delete photo"
                description="Are you sure? This can’t be undone."
                cancelText="Cancel"
            />
        </S.Wrapper>
    );
};
export default PreviewEventStep;
