import React, {FC, useState} from 'react';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import * as S from './ProfileSlider.style';
import CheckIcon from 'assets/images/icons/check-star-white.svg';
import {screenHeight} from 'constants/common';

interface ProfileSliderProps {
    photos: string[];
    userName: string;
    userAge: string;
    isConfirmed: boolean;
}

const ProfileSlider: FC<ProfileSliderProps> = ({photos, userName, userAge, isConfirmed}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < photos.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <S.Container>
            <S.ImageContainer>
                <FastImage
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                    }}
                    source={{
                        uri: photos[currentIndex],
                    }}
                    resizeMode={'cover'}
                />
                {photos.length > 1 && (
                    <>
                        <S.LeftTouchArea testID="left-touch-area" onPress={handlePrevious} />
                        <S.RightTouchArea testID="right-touch-area" onPress={handleNext} />
                    </>
                )}
                <S.ContentContainer>
                    {photos.length > 1 && (
                        <S.DotsContainer>
                            {photos.map((_, index) => (
                                <S.Dot testID="slider-dot" key={index} isActive={index === currentIndex} />
                            ))}
                        </S.DotsContainer>
                    )}
                    <S.UserInfoContainer>
                        {isConfirmed && (
                            <CheckIcon
                                testID="check-icon"
                                width={24}
                                height={24}
                                style={{
                                    marginRight: 12,
                                }}
                            />
                        )}
                        <S.UserName>
                            {userName}
                            {userAge ? ',' : ''}
                        </S.UserName>
                        {userAge && <S.UserAge>{userAge}</S.UserAge>}
                    </S.UserInfoContainer>
                </S.ContentContainer>
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
            </S.ImageContainer>
        </S.Container>
    );
};

export default ProfileSlider;
