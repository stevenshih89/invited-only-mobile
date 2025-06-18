import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as S from './ModalWelcomeAboard.style';
import Button from 'components/Button/Button';
import WelcomeAboard from 'assets/images/app/welcome-aboard.png';
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import { whiteColor } from 'constants/colors';
import useUser from 'hooks/user/useUser';
import { selectIsWelcomeAboardModalShowed, useFirstTimeShowStore } from 'src/store/firstTimeShowStore';

const ModalWelcomeAboard: FC = () => {
    const isWelcomeAboardModalShowed = useFirstTimeShowStore(selectIsWelcomeAboardModalShowed);

    const { user: userData } = useUser();
    const { setIsWelcomeAboardModalShowed } = useFirstTimeShowStore();

    const handleCloseModal = () => {
        setIsWelcomeAboardModalShowed(true);
    };

    if (!isWelcomeAboardModalShowed && userData?.accountConfirmed && userData?.accountReviewed) {
        return (
            <S.Container>
                <S.ModalWrapper>
                    <S.ContentWrapper>
                        <S.BlurBackground />
                        <S.Title>Welcome aboard!</S.Title>
                        <S.Description>Discover exciting events and connect with amazing people around you.</S.Description>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 24,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image source={WelcomeAboard} style={{ flex: 1, marginLeft: -20 }} resizeMode="contain" />
                            </View>
                            <View
                                style={{
                                    gap: 16,
                                }}>
                                <View>
                                    <Text
                                        style={{
                                            fontFamily: Satoshi500,
                                            fontSize: RFValue(14, 932),
                                            color: whiteColor,
                                        }}>
                                        Discover Events to Join
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: Satoshi400,
                                            fontSize: RFValue(12, 932),
                                            color: whiteColor,
                                            opacity: 0.5,
                                        }}>
                                        Explore and join exciting events near you
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontFamily: Satoshi500,
                                            fontSize: RFValue(14, 932),
                                            color: whiteColor,
                                        }}>
                                        Join a Table or Event
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: Satoshi400,
                                            fontSize: RFValue(12, 932),
                                            color: whiteColor,
                                            opacity: 0.5,
                                        }}>
                                        Meet people by joining tables or events
                                    </Text>
                                </View>
                                <View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 6,
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: Satoshi500,
                                                fontSize: RFValue(14, 932),
                                                color: whiteColor,
                                            }}>
                                            Find Connections
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            fontFamily: Satoshi400,
                                            fontSize: RFValue(12, 932),
                                            color: whiteColor,
                                            opacity: 0.5,
                                        }}>
                                        Meet people by joining tables or events
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <Button
                            buttonStyle={{
                                width: '100%',
                                marginTop: 24,
                            }}
                            variant="default"
                            onPress={handleCloseModal}
                            title="Start Explore"
                        />
                    </S.ContentWrapper>
                </S.ModalWrapper>
            </S.Container>
        );
    }

    return null;
};

export default ModalWelcomeAboard;
