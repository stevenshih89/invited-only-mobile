import * as S from './EventRequestEmptyFallback.style';
import EventRequestEmptyFallbackImage from 'src/assets/images/app/empty-fallback-io-screen.png';


export const EventRequestEmptyFallback = () => {
    return <S.Container>
        <S.ImageContainer>
            <S.Image source={EventRequestEmptyFallbackImage} />
        </S.ImageContainer>
        <S.TextContainer>
            <S.Text>More Swiping,</S.Text>
        </S.TextContainer>
        <S.TextContainer>
            <S.Text>More Requests</S.Text>
        </S.TextContainer>
        <S.TextContainer>
            <S.TextSmall>Swipe to get requests!</S.TextSmall>
        </S.TextContainer>
    </S.Container>;
};
