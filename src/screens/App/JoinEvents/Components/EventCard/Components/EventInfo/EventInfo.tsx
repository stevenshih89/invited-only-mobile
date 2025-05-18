import { FC } from 'react';
import { components } from '@invited-only/invited-only-api';
import * as S from './EventInfo.style';

interface EventInfoProps {
  event: components['schemas']['EventData'];
}

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  if (!isNaN(dateObj.getTime())) {
    return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
  }
  return date;
}
const EventInfo: FC<EventInfoProps> = ({ event }) => {
  const { name, date, hour, female, male, placeName, location } = event;
  return (
    <S.Container>
      <S.StyledRadialGradient
        colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
        stops={[0, 0.695, 1]}
        center={[220, -386]}
        radius={400}>
        <S.SectionTitle>Name</S.SectionTitle>
        <S.SubText>{name}</S.SubText>
        <S.RowGap>
          <S.Column>
            <S.SectionTitle>Date</S.SectionTitle>
            <S.SubText>{formatDate(date || '')}</S.SubText>
          </S.Column>
          <S.Column>
            <S.SectionTitle>Time</S.SectionTitle>
            <S.SubText>{hour}</S.SubText>
          </S.Column>
        </S.RowGap>
      </S.StyledRadialGradient>
      <S.StyledRadialGradient
        colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
        stops={[0, 0.695, 1]}
        center={[220, -386]}
        radius={400}>
        <S.Row>
          <S.ColumnStart>
            <S.SectionTitle>Invitations</S.SectionTitle>
            <S.CountBadge>
              <S.SubText>{`${female || 0 + (male || 0)}`}</S.SubText>
            </S.CountBadge>
          </S.ColumnStart>
        </S.Row>
      </S.StyledRadialGradient>
      {(location || placeName) && (
        <S.StyledRadialGap
          colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
          stops={[0, 0.695, 1]}
          center={[220, -386]}
          radius={400}>
          {location && (
            <S.Column>
              <S.SectionTitle>Location</S.SectionTitle>
              <S.SubText>{location}</S.SubText>
            </S.Column>
          )}
          {placeName && (
            <S.Column>
              <S.SectionTitle>Address</S.SectionTitle>
              <S.SubText>{placeName}</S.SubText>
            </S.Column>
          )}
        </S.StyledRadialGap>
      )}
    </S.Container>
  );
};

export default EventInfo;
