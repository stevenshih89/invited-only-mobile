import { Timestamp } from 'firebase/firestore';


interface FirebaseTimestamp {
    _seconds: number;
    _nanoseconds: number;
}

export const formatDate = (dateInput: string | Timestamp | undefined | null): string => {

    if (!dateInput) {
        return 'Invalid Date';
    }

    try {
        let date: Date;

        // Handle Firebase Timestamp
        if (typeof dateInput === 'object' && dateInput !== null && '_seconds' in dateInput) {
            const timestamp = dateInput as unknown as FirebaseTimestamp;
            date = new Date(timestamp._seconds * 1000);
        }
        // Handle string date
        else if (typeof dateInput === 'string') {
            date = new Date(dateInput);
        }
        // Handle Date object
        else if (typeof dateInput === 'object' && dateInput !== null && 'getTime' in dateInput) {
            date = dateInput as unknown as Date;
        } else {
            return 'Invalid Date';
        }

        // Validate the date
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        // Format the date
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC'  // Important for ISO strings with 'Z'
        }).format(date);
    } catch (error) {
        console.error('Date parsing error:', error);
        return 'Invalid Date';
    }
};

/**
 * Parses a string into a Date object, supporting various formats
 * @param dateString - String representation of a date
 * @returns A Date object or null if parsing fails
 */
export const parseStringToDate = (dateString: string | null | undefined): Date | null => {
    if (!dateString) return null;

    try {
        // Try standard ISO format first (most reliable)
        let date = new Date(dateString);

        // If valid, return it
        if (!isNaN(date.getTime())) {
            return date;
        }

        // Try to handle various date formats

        // DD/MM/YYYY or DD-MM-YYYY
        const dmyRegex = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/;
        const dmyMatch = dateString.match(dmyRegex);
        if (dmyMatch) {
            const [, day, month, year] = dmyMatch;
            date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
            if (!isNaN(date.getTime())) return date;
        }

        // MM/DD/YYYY or MM-DD-YYYY (US format)
        const mdyRegex = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/;
        const mdyMatch = dateString.match(mdyRegex);
        if (mdyMatch) {
            const [, month, day, year] = mdyMatch;
            date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
            if (!isNaN(date.getTime())) return date;
        }

        // DD Month YYYY (e.g., "25 Dec 2021")
        const textMonthRegex = /^(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})$/;
        const textMonthMatch = dateString.match(textMonthRegex);
        if (textMonthMatch) {
            const [, day, monthText, year] = textMonthMatch;
            const months = ['january', 'february', 'march', 'april', 'may', 'june',
                'july', 'august', 'september', 'october', 'november', 'december'];
            const monthIndex = months.findIndex(m =>
                m.toLowerCase().startsWith(monthText.toLowerCase()));

            if (monthIndex !== -1) {
                date = new Date(parseInt(year), monthIndex, parseInt(day));
                if (!isNaN(date.getTime())) return date;
            }
        }

        // Unix timestamp (seconds)
        if (/^\d{10}$/.test(dateString)) {
            date = new Date(parseInt(dateString) * 1000);
            if (!isNaN(date.getTime())) return date;
        }

        // Unix timestamp (milliseconds)
        if (/^\d{13}$/.test(dateString)) {
            date = new Date(parseInt(dateString));
            if (!isNaN(date.getTime())) return date;
        }

        // Try using Date.parse as a last resort
        const timestamp = Date.parse(dateString);
        if (!isNaN(timestamp)) {
            return new Date(timestamp);
        }

        return null;
    } catch (error) {
        console.error('Error parsing date string:', error);
        return null;
    }
};