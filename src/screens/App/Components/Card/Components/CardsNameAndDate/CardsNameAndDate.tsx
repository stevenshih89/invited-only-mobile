import * as S from './CardsNameAndDate.style';


interface Props {
    eventName: string;
    date?: Date | string;
    hour?: string;
}

const CardsNameAndDate = ({ eventName, date, hour }: Props) => {
    let formattedDate = '';
    let isValidDate = false;

    if (date) {
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) {
            isValidDate = true;
            formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
        }
    }

    return (
        <S.EventNameAndDate>
            <S.CardName>{eventName}</S.CardName>
            {isValidDate && (
                <S.CardGuestAge>
                    {formattedDate} {hour ? hour : ''}
                </S.CardGuestAge>
            )}
        </S.EventNameAndDate>
    );
}

export default CardsNameAndDate;