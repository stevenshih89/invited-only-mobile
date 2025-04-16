import { TouchableOpacity, View } from "react-native";
import { components } from "src/api/v1";
import * as S from "./ChatWindowHeader.style";
import ArrowLeft from 'assets/images/icons/arrow-left.svg';

import { useAppNavigation } from "hooks/useAppNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ChatWindowHeaderProps {
    chat: components['schemas']['Chat'];
}

export const ChatWindowHeader = ({ chat }: ChatWindowHeaderProps) => {
    const { goBack } = useAppNavigation();
    const insets = useSafeAreaInsets();

    return (
        <S.HeaderContainer style={{ paddingTop: insets.top }}>
            <S.BackButton onPress={goBack}>
                <ArrowLeft />
            </S.BackButton>

            <S.ProfileContainer>
                <S.Avatar source={{ uri: chat.guestImageUrl }} />
                <S.NameContainer>
                    <S.NameText>{chat.guestName}</S.NameText>
                </S.NameContainer>
            </S.ProfileContainer>

            <S.MoreButton>
                <View />
            </S.MoreButton>
        </S.HeaderContainer>
    );
};
