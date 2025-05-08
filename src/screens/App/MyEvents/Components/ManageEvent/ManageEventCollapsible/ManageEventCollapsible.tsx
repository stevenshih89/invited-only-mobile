import React from 'react';
import Collapsible from 'react-native-collapsible';
import {ScrollView, TouchableOpacity} from 'react-native';
import {components} from 'src/api/v1';
import * as S from './ManageEventCollapsible.styled';
import {ManageEventGuestInfo} from './ManageEventGuestInfo/ManageEventGuestInfo';
import InfoIcon from 'assets/images/icons/info-circle.svg';

interface ManageEventCollapsibleProps {
  eventRequests?: components['schemas']['ConnectionRequest'][];
  title: string;
  isOpen: boolean;
  toggle: () => void;
  onPressTooltip: () => void;
}

export const ManageEventCollapsible = ({title, eventRequests, isOpen, toggle, onPressTooltip}: ManageEventCollapsibleProps) => {
  return (
    <S.CardContainer>
      <S.ContentWrapper>
        <S.TitleRow disabled={eventRequests?.length === 0} onPress={toggle}>
          <S.StyledArrow isOpen={isOpen} />
          <S.LabelContainer>
            <S.LabelText disabled={eventRequests?.length === 0}>{title}</S.LabelText>
          </S.LabelContainer>
          <TouchableOpacity
            onPress={onPressTooltip}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}>
            <InfoIcon />
          </TouchableOpacity>
        </S.TitleRow>

        <S.NumberBadge>
          <S.NumberText>{eventRequests?.length ?? 0}</S.NumberText>
        </S.NumberBadge>
      </S.ContentWrapper>
      <Collapsible collapsed={!isOpen}>
        <S.CardContainer>
          <ScrollView style={{maxHeight: 250}}>
            {eventRequests?.map((request, index) => {
              return <ManageEventGuestInfo key={index} request={request} title={title} />;
            })}
          </ScrollView>
        </S.CardContainer>
      </Collapsible>
    </S.CardContainer>
  );
};

export default ManageEventCollapsible;
