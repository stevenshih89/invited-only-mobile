import React, { useState, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./ChatWindowHeader.style";
import { ToggleInvitationStatusDropdown } from "./ToggleInvitationStatusDropdown/ToggleInvitationStatusDropdown";
import { ApproveActionButton } from "./ApproveActionButton/ApproveActionButton";
import { components } from "src/api/v1";
import ArrowLeft from 'assets/images/icons/arrow-left.svg';

import { useAppNavigation } from "hooks/useAppNavigation";

interface ChatWindowHeaderProps {
    chat: components['schemas']['Chat'];
}

export const ChatWindowHeader = ({ chat }: ChatWindowHeaderProps) => {
    const { goBack } = useAppNavigation();
    const insets = useSafeAreaInsets();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const invitationStatusRef = useRef<View>(null);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };


    return (
        <S.HeaderContainer style={{ paddingTop: insets.top }}>
            <S.HeaderRow>
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
            </S.HeaderRow>
            <S.HeaderRow>

                <View ref={invitationStatusRef}>
                    <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.7}>
                        <S.InvitationStatusContainer>
                            <S.InvitationLeftContainer>
                                <S.StyledArrow isOpen={isDropdownVisible} />
                                <S.InvitationStatusTextContainer>
                                    <S.InvitationStatusText>Invitation Status</S.InvitationStatusText>
                                    <S.InvitationStatusDescription>Track status from invitation to approval</S.InvitationStatusDescription>
                                </S.InvitationStatusTextContainer>
                            </S.InvitationLeftContainer>
                            <S.InvitationRightContainer>
                                <ApproveActionButton chat={chat} />
                            </S.InvitationRightContainer>
                        </S.InvitationStatusContainer>
                    </TouchableOpacity>
                </View>

            </S.HeaderRow>
            <ToggleInvitationStatusDropdown
                isVisible={isDropdownVisible}
                anchorElementRef={invitationStatusRef}
                onClose={() => setIsDropdownVisible(false)}
                currentStatus={1}
            />
        </S.HeaderContainer>
    );
};
