import * as S from './CardsNameAndDate.style';

// getDateString seems unused now, can be removed if not used elsewhere
// export const getDateString = (date: Date) => {
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const year = String(date.getFullYear()).slice(-2);
//     return `${month}/${day}/${year}`;
// };

interface Props {
    eventName: string;
    date?: Date | string; // Allow string for flexibility if ISO strings are passed
    hour?: string;
}

const CardsNameAndDate = ({ eventName, date, hour }: Props) => {
    let formattedDate = '';
    let isValidDate = false;

    if (date) {
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) { // Check if the date is valid
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