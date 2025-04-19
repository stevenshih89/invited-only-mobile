import * as S from './CardsNameAndDate.style';

export const getDateString = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
};

interface Props {
    eventName: string;
    date?: Date;
    hour?: string;
}

const CardsNameAndDate = ({ eventName, date, hour }: Props) => {
    return (
        <S.EventNameAndDate>
            <S.CardName>{eventName}</S.CardName>
            <S.CardGuestAge>
                {date ? getDateString(date) : ''} {hour ? hour : ''}
            </S.CardGuestAge>
        </S.EventNameAndDate>)
}

export default CardsNameAndDate;