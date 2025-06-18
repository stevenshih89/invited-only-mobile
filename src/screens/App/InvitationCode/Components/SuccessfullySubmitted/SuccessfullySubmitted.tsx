import * as S from './SuccessfullySubmitted.style';
import CheckIcon from 'assets/images/icons/check-star-white.svg';
import {joinEventsPath} from 'constants/pathLocations';
import {useAppNavigation} from 'hooks/useAppNavigation';
import useUser from 'hooks/user/useUser';
import {useFirstTimeShowStore} from 'src/store/firstTimeShowStore';

const SuccessfullySubmitted = () => {
    const {user: userData} = useUser();
    const navigation = useAppNavigation();
    const {setIsApprovedUserScreenShowed} = useFirstTimeShowStore();

    const handleContinue = () => {
        setIsApprovedUserScreenShowed(true);
        navigation.reset({
            index: 0,
            routes: [{name: '/bottom-tabs-stack', params: {screen: joinEventsPath}}],
        });
    };

    return (
        <S.Container>
            <S.Title>You Got Access</S.Title>
            <S.Subtitle>Congratulations and welcome aboard!</S.Subtitle>
            <S.ImageContainer>
                <S.UserImage testID="user-image" source={{uri: userData?.photos?.[0]?.image || ''}} />
                <S.BadgeContainer>
                    <S.BadgeContent>
                        <S.BadgeBlur blurType="dark" />
                        <S.BadgeText>{userData?.name}</S.BadgeText>
                        <CheckIcon />
                    </S.BadgeContent>
                </S.BadgeContainer>
            </S.ImageContainer>
            <S.StyledButton title="Continue" onPress={handleContinue} />
        </S.Container>
    );
};

export default SuccessfullySubmitted;
