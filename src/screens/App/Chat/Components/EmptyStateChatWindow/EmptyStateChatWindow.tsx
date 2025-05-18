import * as S from './EmptyStateChatWindow.style';

interface EmptyStateChatWindowProps {
    guestImage: string;
    hostImage: string;
}

const EmptyStateChatWindow = ({ guestImage, hostImage }: EmptyStateChatWindowProps) => {
    return (
        <S.Container>
            <S.ImagesContainer>
                <S.BottomImage source={{ uri: guestImage }} />
                <S.TopImage source={{ uri: hostImage }} />
            </S.ImagesContainer>
            <S.TextContainer>
                <S.TextPrimary>It&apos;s a connection!</S.TextPrimary>
                <S.TextSecondary>Send them a message</S.TextSecondary>
            </S.TextContainer>
        </S.Container>
    );
};

export default EmptyStateChatWindow;