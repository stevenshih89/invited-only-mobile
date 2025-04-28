import React from 'react';
import Collapsible from 'react-native-collapsible';
import * as S from './ManageEventCollapsible.styled';
import { ManageEventGuestInfo } from './ManageEventGuestInfo/ManageEventGuestInfo';
import { components } from 'src/api/v1';

interface ManageEventCollapsibleProps {
    eventRequests?: components['schemas']['ConnectionRequest'][];
    title: string;
    isOpen: boolean;
    toggle: () => void;
}

interface UserDetails {
    id: string;
    name: string;
    age: number;
    profileImageUrl?: string;
    title: string;
}

export const ManageEventCollapsible = ({ title, eventRequests, isOpen, toggle }: ManageEventCollapsibleProps) => {

    return (
        <S.CardContainer>
            <S.ContentWrapper>
                <S.TitleRow onPress={toggle}>
                    <S.StyledArrow isOpen={isOpen} />
                    <S.LabelContainer>
                        <S.LabelText>{title}</S.LabelText>
                    </S.LabelContainer>
                    <S.InfoIconContainer />
                </S.TitleRow>
                <S.NumberBadge>
                    <S.NumberText>{eventRequests?.length ?? 0}</S.NumberText>
                </S.NumberBadge>
            </S.ContentWrapper>
            <Collapsible collapsed={!isOpen} >
                <S.CardContainer>
                    {
                        eventRequests?.map((request, index) => {
                            return (
                                <ManageEventGuestInfo key={index} request={request} title={title} />
                            );
                        })
                    }
                </S.CardContainer>
            </Collapsible>
        </S.CardContainer>
    );
}

export default ManageEventCollapsible;